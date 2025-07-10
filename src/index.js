import "./style.css";
import { projectController } from "./project";
import { toDoController } from "./todo";
import { create } from "lodash";

let screenController = (function(){
    let _addProject = document.createElement('button');
    let _checkboxContainer = document.getElementById('checkboxContainer');
    let _checkboxContainerDel = document.getElementById('checkboxContainerDel');
    let _closeBtnProj = document.getElementById('closeBtnProj');
    let _closeBtnTask = document.getElementById('closeBtnToDo');
    let _closeBtnComTask = document.getElementById('closeBtnComTask');
    let _closeBtnDelTask = document.getElementById('closeBtnDelTask');
    let _closeBtnEditTask = document.getElementById('closeBtnEditTask');
    let _closeBtnProjDelete = document.getElementById('closeBtnProjDelete');
    let _completeTaskSave = document.getElementById('saveComTask');
    let _content = document.getElementById('content');
    let _contentHeader = document.createElement('h2');
    let _contentList = document.querySelector('#content > ul');
    let _deleteTaskSave = document.getElementById('saveDelTask');
    let _deleteProject = document.createElement('button');
    let _deleteProjSaveBtn = document.getElementById('saveDelProj');
    let _editTaskTitle = document.getElementById('title');
    let _editTaskDesc = document.getElementById('desc');
    let _editTaskDue = document.getElementById('due');
    let _editTaskPriority = document.getElementById('priority');
    let _editTaskSave = document.getElementById('editTaskSave');
    let _header = document.getElementById('header');
    let _modalComTask = document.getElementById('modalComTask');
    let _modalDelTask = document.getElementById('modalDelTask');
    let _modalEditTask = document.getElementById('modalEditTask');
    let _modalProj = document.getElementById('modalProj');
    let _modalProjDelete = document.getElementById('modalProjDelete');
    let _modalTask = document.getElementById('modalToDo');
    let _projNewTitle = document.getElementById('projNewTitle');
    let _projNewSave = document.getElementById('saveProj');
    let _selectProjDelete = document.getElementById('selectProjDelete');
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
    _deleteProject.textContent = "Delete Project";
    _sideHeader.textContent = "Projects";

    _content.insertBefore(_contentHeader, _contentList);
    _sidebar.insertBefore(_sideHeader, _sidebarList);
    _sidebar.appendChild(_addProject);
    _sidebar.appendChild(_deleteProject);

    //EVENT Listeners
    window.addEventListener('load', displayDefaultProj);
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
    _closeBtnDelTask.addEventListener('click', () => {
        _modalDelTask.style.display = 'none';
    });
    _closeBtnEditTask.addEventListener('click', () => {
        _modalEditTask.style.display = 'none';
    });
    _closeBtnProjDelete.addEventListener('click', () => {
        _modalProjDelete.style.display = 'none';
    });
    _deleteProject.addEventListener('click', () => {
        _modalProjDelete.style.display = 'block';
        let project = projectController.getCurrentProj();
        _selectProjDelete.textContent  = `${project.projTitle}`;
    });
    _deleteProjSaveBtn.addEventListener('click', (event) => {
        event.preventDefault();
        let project = projectController.getCurrentProj();
        projectController.deleteProject(project);
        console.log(projectController.getProjectList());
        displayProjectDetails();
        updateProjListDisp();
        _modalProjDelete.style.display = 'none';

    });
    _projNewSave.addEventListener('click', (event) => {
        event.preventDefault(); 
        let newProject = projectController.newProject(_projNewTitle.value);
        projectController.addMethodsToProject(newProject);
        projectController.setCurrentProj(newProject);
        displayProjectDetails();
        updateProjListDisp();
        if (document.querySelector('#sidebar > p')){
            let info = document.querySelector('#sidebar > p');
            info.remove();
        };
        _projNewTitle.value = '';
        _modalProj.style.display = 'none';
    });
    _taskNewSave.addEventListener('click', (event) => {
        event.preventDefault();
        let projName = document.getElementById('projects').value;
        let projList = projectController.getProjectList();
        projList[projName].addTaskToList(_taskNewTitle.value, _taskNewDesc.value, _taskNewDue.value, _taskNewPriority.value);
        projectController.updateProjectList(projList[projName]);
        projectController.setCurrentProj(projList[projName]);
        displayTaskList(projectController.getCurrentProj());
        _modalTask.style.display = 'none';
        _taskNewTitle.value = '';
        _taskNewDesc.value = '';
        _taskNewDue.value = '';
        _taskNewPriority.value = '';
        createMethodButtons(projectController.getCurrentProj());
    });
    //END event Listeners

    function createCheckBoxesComplete(){
        while(_checkboxContainer.firstChild){
            _checkboxContainer.removeChild(_checkboxContainer.firstChild);
        }
        let project = projectController.getCurrentProj();
        let list = project.taskList;
        for (let task in list){
            if (list[task].status == "incomplete"){
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
        }
    }

    function createCheckBoxesDelete(){
        while(_checkboxContainerDel.firstChild){
            _checkboxContainerDel.removeChild(_checkboxContainerDel.firstChild);
        }
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
            _checkboxContainerDel.appendChild(box);
            _checkboxContainerDel.appendChild(label);
            _checkboxContainerDel.appendChild(newLine);
        }
        // need a reset / check for existing inputs
    }

    function createMethodButtons(){
        let project = projectController.getCurrentProj();
        if (document.querySelector('button.methodBtn')){
            let existingBtns = document.querySelectorAll('button.methodBtn');
            existingBtns.forEach((button) => { 
                button.remove();
            })
        }
        if (project !== ''){
            for (const key in project){
                if (typeof project[key] == 'function'){
                    let button = document.createElement('button');
                    button.textContent = key;
                    _content.insertBefore(button, _contentList);
                    button.setAttribute('class', 'methodBtn');
                    if (key == 'addTaskToList'){
                        addEventAddTaskToList(button);
                    } else if (key == 'completeTask'){
                        addEventCompleteTask(button);
                    } else if (key == 'deleteTask'){
                        addEventDeleteTask(button);
                    } else if (key == 'editTask'){
                        addEventEditTask(button);
                    }
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
            project.setAttribute('id', `${title}`);
            select.appendChild(project);
        });
        container.insertBefore(select, firstChild);
    }

    function displayDefaultProj(){
        // ON window load
        let feedCat = projectController.newProject("Feed Cats");
        projectController.addMethodsToProject(feedCat);
        feedCat.addTaskToList("Breakfast", "wet food", "7am", "high");
        feedCat.addTaskToList("Dinner", "soup", "5.30pm", "high");
        projectController.setCurrentProj(feedCat);
        projectController.updateProjectList(feedCat);
        updateProjListDisp();
        displayProjectDetails();
    }

    function displayProjectDetails(){
        while (_contentList.firstChild){
            _contentList.removeChild(_contentList.firstChild);
        }
        while (_header.firstChild){
            _header.removeChild(_header.firstChild);
        }
        let projList = projectController.getProjectList();
        let currentProj = projectController.getCurrentProj();
        let title = document.createElement('h1');
        if (_.isEmpty(projList)){
            // console.log("testing: projList empty", projList);
            // console.log("is currentProj also empty?", typeof currentProj);
            title.textContent = "projects list is empty";
            let info = document.createElement('p');
            info.textContent = "Click the 'Add Project' button to start";
            _sidebar.insertBefore(info, _addProject);   
        } else if (currentProj === '' && !_.isEmpty(projList)){
            // console.log("testing else if: currentProj empty and projList not empty", currentProj, projList);
            let proj0 = Object.values(projList)[0];
            projectController.setCurrentProj(proj0);
            title.textContent = proj0.projTitle;
            _header.appendChild(title);
            displayTaskList();
        } else {
            // console.log("testing: else. currentProj and projList not empty", currentProj, projList);
            title.textContent = currentProj.projTitle;
            _header.appendChild(title);
            displayTaskList();
        }
        createMethodButtons();
    }

    function displayTaskList(){
        let currentProj = projectController.getCurrentProj();
        let list = currentProj.taskList;
        while (_contentList.firstChild){
            _contentList.removeChild(_contentList.firstChild);
        }
        for (let task in list){
            let li = document.createElement('li');
            let item = document.createElement('button');
            item.textContent = task;
            item.addEventListener('click', () => expandTasks(li, list[task]));
            li.appendChild(item);
            _contentList.appendChild(li);
        }
    }

    function addEventAddTaskToList(button){
        button.addEventListener('click', (event) => {
            event.preventDefault();
            createProjDropList();
            let dropDown = document.querySelector('select');
            let currentProj = projectController.getCurrentProj().projTitle;
            dropDown.value = currentProj;
            _modalTask.style.display = 'block';
        });
    }

    function addEventCompleteTask(button){ 
        // let project = projectController.getCurrentProj();
        button.addEventListener('click', (event) => {
            event.preventDefault();
            _modalComTask.style.display = 'block';
            createCheckBoxesComplete();
            // displayTaskList();
        });
        _completeTaskSave.removeEventListener('click', eventSaveComplete);
        _completeTaskSave.addEventListener('click', eventSaveComplete);
    }

    function addEventDeleteTask(button){ 
        button.addEventListener('click', (event) => {
            event.preventDefault();
            _modalDelTask.style.display = 'block';
            createCheckBoxesDelete();
            // displayTaskList();
        });
        _deleteTaskSave.removeEventListener('click', eventSaveDelete);
        _deleteTaskSave.addEventListener('click', eventSaveDelete);
    }

    // ------------------ WORKING -  EDIT TASK FUNCTIONS
    function addEventEditTask(button){
        button.addEventListener('click', (event) => {
            event.preventDefault();
            _modalEditTask.style.display = 'block';
            createModalEditTask();

        });
        _editTaskSave.removeEventListener('click', eventSaveEditTask);
        _editTaskSave.addEventListener('click', eventSaveEditTask);
    }

    function createModalEditTask(){
        let selectExists = document.getElementById('tasks');
        if(selectExists) selectExists.remove();
        let project = projectController.getCurrentProj();
        let list = Object.keys(project.taskList);
        // console.log(list);
        let container = document.getElementById('editTaskContainer');
        let firstChild = document.getElementById('firstChild');
        let select = document.createElement('select');
        select.setAttribute('id', 'tasks');
        select.setAttribute('name', 'tasks');
        select.setAttribute('required', '');
        list.forEach((task) => {
            let option = document.createElement('option');
            option.textContent = `${task}`;
            option.value = `${task}`;
            option.setAttribute('id', `${task}`);
            select.appendChild(option);
        });
        container.insertBefore(select, firstChild);
    }

    function eventSaveEditTask(event){
        event.preventDefault();
        let project = projectController.getCurrentProj();
        let task = document.getElementById('tasks').value;
        console.log(task);
        let taskInputs = document.querySelectorAll('.editTaskInput');
        taskInputs.forEach((input) => {
            let key = input.getAttribute('id');
            if (input.value !== '' && key !== "title"){
                console.log("input attribute type: ", typeof key);
                console.log("input.value: ", input.value);
                project.editTask(project.taskList[task], key, input.value);
                console.log(projectController.getProjectList());
                
            } else if (input.value !== '' && key == "title"){
                project.editTask(project.taskList[task], key, input.value);
                task = input.value;
            }
        });
        projectController.updateProjectList(project);
        console.log(projectController.getProjectList());
        displayTaskList();
        // createMethodBtns();
        _editTaskTitle.value = '';
        _editTaskDesc.value = '';
        _editTaskDue.value = '';
        _editTaskPriority.value = '';
        _modalEditTask.style.display = 'none';
    }

    // --------------- END working on edit functions

    function eventProjBtnDisp(projBtn){
        projBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let projList = projectController.getProjectList();
            for (const project in projList){
                if (project == projBtn.textContent){
                    projectController.setCurrentProj(projList[project]);
                    displayProjectDetails();
                }
            }
        });
    }

    function eventSaveComplete(event){  
        // logic to update project task status
        event.preventDefault(); 
        let project = projectController.getCurrentProj();
        let tasks = project.taskList;
        let options = document.querySelectorAll('#checkboxContainer > input');
        options.forEach((option) => {
            if (option.checked === true){
                tasks[option.id].status = "complete";
                displayTaskList();
                projectController.updateProjectList(project);
            }
        });
        _modalComTask.style.display = 'none';
    }

    function eventSaveDelete(event){
    // logic to update project task status
        event.preventDefault();
        let project = projectController.getCurrentProj();
        let tasks = project.taskList;
        let options = document.querySelectorAll('#checkboxContainerDel > input');
        options.forEach((option) => {
            console.log("option.id: ", tasks[option.id]);
            if (option.checked === true){
                project.deleteTask(tasks[option.id]);
                console.log(project);
                projectController.updateProjectList(project);
            }
            displayTaskList();
        });
            _modalDelTask.style.display = 'none';
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
01/07
1. editTask in toDo module needs reworking. Start with debugging there, refer to console logs
2. once that's done I think I'm finally up to local storage

*/

/*
+++++++++++ LEARNINGS TO TAKE AWAY +++++++++++

1. When opening and closing modals, be careful that you're only adding listeners once and not multiple times with each opening
2. In this project could have streamlined the modals, use span elements in place of unique info ("Select the projects you want to <span> complete || delete <span>"). would have minimised modal html, variables, repeating functions for slightly different behaviours etc
3. separate methods from objects and create function to add them to the object. This will help with local storage
4. the 'event' argument is automatically passed to event listeners. No need to create arrow function solely for purpose of passing this argument
5. when working with objects, easy to mistake a string as an object key when attempting to access properties dynamically

*/