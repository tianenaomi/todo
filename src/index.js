import "./style.css";
import { projectController } from "./project";
import { toDoController } from "./todo";

let screenController = (function(){
    let _addProject = document.createElement('button');
    // let _addTask = document.createElement('button');
    let _closeBtnProj = document.getElementById('closeBtnProj');
    let _closeBtnTask = document.getElementById('closeBtnToDo');
    let _content = document.getElementById('content');
    let _contentHeader = document.createElement('h2');
    let _contentList = document.querySelector('#content > ul');
    let _header = document.getElementById('header');
    let _modalProj = document.getElementById('modalProj');
    let _modalTask = document.getElementById('modalToDo');
    let _projNewTitle = document.getElementById('projNewTitle');
    let _projNewSave = document.getElementById('saveProj');
    let _sidebar = document.getElementById('sidebar');
    let _sidebarList = document.querySelector('#sidebar > ul');
    let _sideHeader = document.createElement('h2');
    let _taskNewTitle = document.getElementById('toDoTitle');
    let _taskNewDesc = document.getElementById('toDoDesc');
    let _taskNewDue = document.getElementById('toDoDue');
    let _taskNewPriority = document.getElementById('toDoPriority');
    let _taskNewSave = document.getElementById('saveToDo');
    
    _addProject.textContent = "Add Project";
    // _addTask.textContent = "Add Task";
    _contentHeader.textContent = "Task List";
    _sideHeader.textContent = "Projects";

    _content.insertBefore(_contentHeader, _contentList);
    // _contentHeader.appendChild(_addTask);
    _sidebar.insertBefore(_sideHeader, _sidebarList);
    _sidebar.appendChild(_addProject);

    //EVENT Listeners
    _addProject.addEventListener('click', () => {
        _modalProj.style.display = 'block';
    });
    // _addTask.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     createProjDropList();
    //     _modalTask.style.display = 'block';
    // });
    _closeBtnProj.addEventListener('click', () => {
        _modalProj.style.display = 'none';
    });
    _closeBtnTask.addEventListener('click', () => {
        _modalTask.style.display = 'none';
        let select = document.getElementById('projects');
        select.remove();
    });
    _projNewSave.addEventListener('click', (event) => {
        event.preventDefault(); 
        let newProject = projectController.newProject(_projNewTitle.value);
        projectController.addMethodsToProject(newProject);
        projectController.updateProjectList(newProject);
        updateProjListDisp();
        _projNewTitle.value = '';
        _modalProj.style.display = 'none';
    });
    _taskNewSave.addEventListener('click', (event) => {
        event.preventDefault();
        let projName = document.getElementById('projects').value;
        let projList = projectController.getProjectList();
        projList[projName].addTaskToList(_taskNewTitle.value, _taskNewDesc.value, _taskNewDue.value, _taskNewPriority.value);
        projectController.updateProjectList(projList[projName]);
        displayTaskList(projList[projName]);
        _modalTask.style.display = 'none';
        _taskNewTitle.value = '';
        _taskNewDesc.value = '';
        _taskNewDue.value = '';
        _taskNewPriority.value = '';
    });
    window.addEventListener('load', () => displayDefaultProj());
    //END event Listeners

    function createProjDropList() {
        // FOR prepopulating project list in addTask modal
        let selectExists = document.getElementById('projects');
        if(selectExists) selectExists.remove();
        let list = Object.keys(projectController.getProjectList());
        let container = document.getElementById('toDoContainer');
        let firstChild = document.getElementById('titleLabel');
        let select = document.createElement('select');
        select.setAttribute('id', 'projects');
        select.setAttribute('name', 'projects');
        select.setAttribute('required', '');
        list.forEach((title) => {
            let project = document.createElement('option');
            project.textContent = `${title}`;
            project.value = `${title}`;
            select.appendChild(project);
        });
        container.insertBefore(select, firstChild);
        // Need to add a reset here, currently adding multiple times with each modal open
    }

    function displayDefaultProj(){
        // ON window load
        let feedCat = projectController.newProject("feedCat");
        projectController.addMethodsToProject(feedCat);
        feedCat.addTaskToList("breakfast", "wet food", "7am", "high");
        feedCat.addTaskToList("dinner", "soup", "5.30pm", "high");
        projectController.updateProjectList(feedCat);
        updateProjListDisp();
        displayProjectDetails(feedCat);
        console.log(projectController.getProjectList());
    }

    function displayProjectDetails(project){
        while (_contentList.firstChild){
            _contentList.removeChild(_contentList.firstChild);
        }
        while (_header.firstChild){
            _header.removeChild(_header.firstChild);
        }
        let title = document.createElement('h1');
        title.textContent = project.projTitle;
        _header.appendChild(title);
        displayTaskList(project);
        createMethodButtons(project);
        // Need function here to create buttons for methods
    }

    // *** creating UI for project methods ***
    function createMethodButtons(project){
        // RESET / remove existing display 
        // FOR each method
        for (const key in project){
            if (typeof project[key] == 'function'){
                console.log("method accessed", typeof project[key]);
                let button = document.createElement('button');
                button.textContent = key;
                _content.insertBefore(button, _contentList);
                if (key == 'addTaskToList'){
                    button.addEventListener('click', (event) => {
                    event.preventDefault();
                    createProjDropList();
                    _modalTask.style.display = 'block';
                    });
                } else if (key == 'completeTask'){
                    button.addEventListener('click', (event) => {
                       event.preventDefault();
                        // INVOKE function call
                        //  
                    })
                }
            } else {
                console.log("method unavailable", typeof project[key]);
            }
        }
        // CREATE button
        // SET text in button
        // SET event listener
        // APPEND to somewhere
    }
    // *** END ***

    function displayTaskList(project){
        let list = project.taskList;
        while (_contentList.firstChild){
            _contentList.removeChild(_contentList.firstChild);
        }
        for(const task in list){
            let li = document.createElement('li');
            let item = document.createElement('button');
            item.textContent = task;
            item.addEventListener('click', () => expandTasks(li, list[task]));
            li.appendChild(item);
            _contentList.appendChild(li);
        }
    }

    function expandTasks(li, list){
        if (li.hasAttributes() == false){
            let taskUL = document.createElement('ul');
            for(const key in list){ // ** need to review, button not rendering
                // console.log(key)
                // if (key === "completeTask"){
                //     let taskLI = document.createElement('li');
                //     let completeTask = document.createElement('button');
                //     // add event listener that invokes completeToDo();
                //     completeTask.addEventListener('click', () => {
                //         console.log(list[key]);
                //     });
                //     completeTask.textContent = "Complete";
                //     taskUL.appendChild(taskLI);
                //     taskLI.appendChild(completeTask);
                // } else if (key === "title"){
                //     ;
                // } else {
                    let taskLI = document.createElement('li');
                    taskLI.textContent = `${key}: ${list[key]}`;
                    taskUL.appendChild(taskLI);
                // }
            }
            li.appendChild(taskUL);
            li.setAttribute("class", "open");
        } else if (li.hasAttributes() == true){
            li.removeChild(li.lastChild);
            li.removeAttribute('class');
        }
    }

    function updateProjListDisp(){
        while (_sidebarList.firstChild){
            _sidebarList.removeChild(_sidebarList.firstChild);
        }
        let projList = projectController.getProjectList();
        for(const project in projList){
            let li = document.createElement('li');
            let proj = document.createElement('button');
            proj.textContent = project;
            proj.addEventListener('click', () => displayProjectDetails(projList[project]));
            li.appendChild(proj);
            _sidebarList.appendChild(li);
        }
    }

    /* ===== PSEUDOCODE =====
    PROJECT EXAMPLE
    {feed cat (KEY):
        VALUE {toDoList(KEY):
            VALUE {breakfast (KEY):
                VALUE {title (KEY): value,
                    desc (KEY): value,
                    due (KEY): value,
                    priority (KEY): value,
                    status (KEY): value,
                    },
            },
        },
    }

    ===== END pseudocode ===== */

}());


// let feedCat = projectController.newProject("feedCat");
// projectController.addMethodsToProject(feedCat);
// console.log(projectController.getProjectList());
// console.log(feedCat.toDoList);
// feedCat.addTaskToList("breakfast", "wet food", "7am", "high");
// console.log(feedCat.toDoList);
// feedCat.addToDo("dinner", "soup", "5.30pm", "high");
// console.log(feedCat.toDoList);
// feedCat.addToDo("allDay", "kibble", "NA", "high");
// console.log(feedCat);
// console.log(projectController.getProjectList());
// feedCat.deleteToDo(feedCat.toDoList.breakfast);
// feedCat.editToDo(feedCat.toDoList.breakfast, 'title', 'morningTea');
// console.log(feedCat);
// console.log(projectController.getProjectList());
// let haircut = projectController.newProject("haircut");
// projectController.addMethodsToProject(haircut);
// haircut.addTaskToList('haircut', "butterfly cut", "8 weeks", "low")
// projectController.updateProjectList(haircut);
// console.log("project:", haircut);
// console.log("projectList:", projectController.getProjectList());
// let list = Object.keys(projectController.getProjectList());
// console.log(list);

/* 
============ PSEUDOCODE =============

MOVING PARTS -- 
    -- Need way to invoke completeToDo, editToDo, 

    -- Required validation not working on new project modal

    -- SO SO SO MANY BUGS
        -- actually too many to type - lots of bugs in new task saving
        --

*/