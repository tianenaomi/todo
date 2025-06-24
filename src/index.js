import "./style.css";
import { projectController } from "./project";
import { toDoController } from "./todo";

let screenController = (function(){
    let _addProject = document.createElement('button');
    let _checkboxContainer = document.getElementById('checkboxContainer');
    let _closeBtnProj = document.getElementById('closeBtnProj');
    let _closeBtnTask = document.getElementById('closeBtnToDo');
    let _closeBtnComTask = document.getElementById('closeBtnComTask');
    let _completeTaskSave = document.getElementById('saveComTask');
    let _content = document.getElementById('content');
    let _contentHeader = document.createElement('h2');
    let _contentList = document.querySelector('#content > ul');
    let _header = document.getElementById('header');
    let _modalComTask = document.getElementById('modalComTask');
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
    _contentHeader.textContent = "Task List";
    _sideHeader.textContent = "Projects";

    _content.insertBefore(_contentHeader, _contentList);
    _sidebar.insertBefore(_sideHeader, _sidebarList);
    _sidebar.appendChild(_addProject);

    //EVENT Listeners
    _addProject.addEventListener('click', () => {
        _modalProj.style.display = 'block';
    });
    _closeBtnProj.addEventListener('click', () => {
        _modalProj.style.display = 'none';
    });
    _closeBtnTask.addEventListener('click', () => {
        _modalTask.style.display = 'none';
        let select = document.getElementById('projects');
        select.remove();
    });
    _closeBtnComTask.addEventListener('click', () => {
        _modalComTask.style.display = 'none';
    });
    _projNewSave.addEventListener('click', (event) => {
        event.preventDefault(); 
        let newProject = projectController.newProject(_projNewTitle.value);
        projectController.addMethodsToProject(newProject);
        projectController.setCurrentProj(newProject);
        displayProjectDetails(projectController.getCurrentProj());
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
        // REWORKING - to use set currentProj
        projectController.setCurrentProj(projList[projName]);
        // END reworking
        displayTaskList(projectController.getCurrentProj());
        _modalTask.style.display = 'none';
        _taskNewTitle.value = '';
        _taskNewDesc.value = '';
        _taskNewDue.value = '';
        _taskNewPriority.value = '';
        createMethodButtons(projectController.getCurrentProj());
        console.log("taskNewSave list: ", projectController.getProjectList(), 
            "taskNewSave currentProj: ", projectController.getCurrentProj());
    });
    window.addEventListener('load', () => displayDefaultProj());
    //END event Listeners

    function createCheckBoxes(){
        while(_checkboxContainer.firstChild){
            _checkboxContainer.removeChild(_checkboxContainer.firstChild);
        }
        // console.log("createCheckBoxes:", project);
        let project = projectController.getCurrentProj();
        let list = project.taskList;
        for (let task in list){
            let box = document.createElement('input');
            let label = document.createElement('label');
            let newLine = document.createElement('br');
            box.setAttribute('type', 'checkbox');
            box.setAttribute('id', task);
            box.textContent = task;
            label.setAttribute('for', task);
            label.textContent = task;
            _checkboxContainer.appendChild(box);
            _checkboxContainer.appendChild(label);
            _checkboxContainer.appendChild(newLine);
        }
        // need a reset / check for existing inputs
    }

    // *** creating UI for project methods ***
    function createMethodButtons(){
        // console.log("argument passed to createMethod Buttons", project);
        let project = projectController.getCurrentProj();
        if (document.querySelector('button.methodBtn')){
            let existingBtns = document.querySelectorAll('button.methodBtn');
            existingBtns.forEach((button) => { 
                button.remove();
            })
        }
        for (const key in project){
            if (typeof project[key] == 'function'){
                let button = document.createElement('button');
                button.textContent = key;
                _content.insertBefore(button, _contentList);
                button.setAttribute('class', 'methodBtn');
                if (key == 'addTaskToList'){
                    eventAddTaskToList(button);
                } else if (key == 'completeTask'){
                    eventCompleteTask(button);
                } else if (key == 'deleteTask'){

                } else if (key == 'editTask'){

                }
            }
        }
    }

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
            // project.setAttribute('id', `${title}`);
            select.appendChild(project);
        });
        container.insertBefore(select, firstChild);
    }

    function displayDefaultProj(){
        // ON window load
        let feedCat = projectController.newProject("feedCat");
        projectController.addMethodsToProject(feedCat);
        feedCat.addTaskToList("breakfast", "wet food", "7am", "high");
        feedCat.addTaskToList("dinner", "soup", "5.30pm", "high");
        projectController.updateProjectList(feedCat);
        // REWORKING
        projectController.setCurrentProj(feedCat);
        // END reworking
        updateProjListDisp();
        displayProjectDetails(projectController.getCurrentProj());
        // console.log("Display default:", projectController.getProjectList());
    }

    function displayProjectDetails(){
        let currentProj = projectController.getCurrentProj();
        while (_contentList.firstChild){
            _contentList.removeChild(_contentList.firstChild);
        }
        while (_header.firstChild){
            _header.removeChild(_header.firstChild);
        }
        let title = document.createElement('h1');
        title.textContent = currentProj.projTitle;
        _header.appendChild(title);
        displayTaskList();
        createMethodButtons();
    }

    function displayTaskList(){
        console.log("currentProj: ", projectController.getCurrentProj());
        let currentProj = projectController.getCurrentProj();
        let list = currentProj.taskList;
        console.log("displayTasks list", list);
        while (_contentList.firstChild){
            _contentList.removeChild(_contentList.firstChild);
        }
        for (let task in list){ //TEST - change const to let suggested by google
            let li = document.createElement('li');
            let item = document.createElement('button');
            item.textContent = task;
            item.addEventListener('click', () => expandTasks(li, list[task]));
            li.appendChild(item);
            _contentList.appendChild(li);
        }
    }

    function eventAddTaskToList(button){
        button.addEventListener('click', (event) => {
            event.preventDefault();
            createProjDropList();
            let dropDown = document.querySelector('select');
            let currentProj = projectController.getCurrentProj().projTitle;
            dropDown.value = currentProj;
            _modalTask.style.display = 'block';
        });
    }

    function eventCompleteTask(button){ 
        let project = projectController.getCurrentProj();
        button.addEventListener('click', (event) => { // tested - works
            event.preventDefault();
            _modalComTask.style.display = 'block';
            createCheckBoxes();
            displayTaskList(project);
        });
        _completeTaskSave.addEventListener('click', (event) => {
            console.trace("Function called");
            event.preventDefault(); 
            eventSaveComplete();
        });
    }

    function eventDeleteTask(button, project){
        button.addEventListener('click', (event) => {
            event.preventDefault();
            // logic to delete project or appear a modal
        })
    }

    function eventProjBtnDisp(projBtn){
        projBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let projList = projectController.getProjectList();
            for (const project in projList){
                if (project == projBtn.textContent){
                    projectController.setCurrentProj(projList[project]);
                    displayProjectDetails(projList[project]);
                }
            }
        });
    }

    function eventSaveComplete(){
        // logic to update project task status
        let project = projectController.getCurrentProj();
        let tasks = project.taskList;
        console.log(tasks);
        let options = document.querySelectorAll('#checkboxContainer > input');
        console.log("eventSaveComplete", options);
        // LOOP through nodes
        options.forEach((option) => {
            console.log("option", option.checked);
            console.log(typeof option.id);
            if (option.checked === true){
                console.log("This is checked", tasks[option.id]);
                tasks[option.id].status = "complete";
                console.log("This is updated", tasks[option.id]);
            }
            //update task display
            //update project list
        });
        _modalComTask.style.display = 'none';
    }

    function expandTasks(li, list){
        if (li.hasAttributes() == false){
            let taskUL = document.createElement('ul');
            for(const key in list){
                if (key === "title"){
                    ;
                } else {
                    let taskLI = document.createElement('li');
                    taskLI.textContent = `${key}: ${list[key]}`;
                    taskUL.appendChild(taskLI);
                }
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
            let projBtn = document.createElement('button');
            projBtn.textContent = project;
            eventProjBtnDisp(projBtn);
            li.appendChild(projBtn);
            _sidebarList.appendChild(li);
        }
    }

}());


/* 
============ PSEUDOCODE =============
24/06 - now debugging the complete task event

__BUG - When hitting save the event listener seems to be running 4 times? First round with stale data, then evenutally the correct data is passed and actioned. 

** BEHAVIOUR - 
1. add new project Love Rupurrt
2. add new task x2 to Love Rupurrt
3. complete x1 task of Love Rupurrt
4. event firing with data from feedCat first, then runs again with Love Rupurrt data

== INVESTIGATIONS - 
1. Currently updating instances of "project" argument or similar for projectContoller.getCurrentProj(); At the point of completing a task the current project should be updated and correct so no need to pass references and should just be able to access. 


*/