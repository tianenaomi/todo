import "./style.css";
import { projectController } from "./project";
import { toDoController } from "./todo";


let screenController = (function(){
    let _addProject = document.createElement('button');
    let _closeBtn = document.querySelector('.closeBtn');
    let _content = document.getElementById('content');
    let _contentHeader = document.createElement('h2');
    let _contentList = document.querySelector('#content > ul');
    let _header = document.getElementById('header');
    let _modalProj = document.getElementById('modalProj');
    let _projNewTitle = document.getElementById('projNewTitle');
    let _projNewSave = document.getElementById('saveProj');
    let _sidebar = document.getElementById('sidebar');
    let _sidebarList = document.querySelector('#sidebar > ul');
    let _sideHeader = document.createElement('h2');
    

    _addProject.textContent = "Add Project";
    _contentHeader.textContent = "To Do List";
    _sideHeader.textContent = "Projects";


    _content.insertBefore(_contentHeader, _contentList);
    _sidebar.insertBefore(_sideHeader, _sidebarList);
    _sidebar.appendChild(_addProject);


    // EVENT Listeners
    _addProject.addEventListener('click', () => {
        _modalProj.style.display = 'block';
    });
    _closeBtn.addEventListener('click', () => {
        _modalProj.style.display = 'none';
    });
    _projNewSave.addEventListener('click', (event) => {
        event.preventDefault(); 
        projectController.newProject(_projNewTitle.value);
        updateProjListDisp();
        _projNewTitle.value = '';
        _modalProj.style.display = 'none';
    });

    // END event Listeners

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

    // for Project buttons
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
        displayToDoList(project);
    }

    function displayToDoList(project){
        let list = project.toDoList;
        console.log(list);
        for(const toDo in list){
            console.log(list[toDo].desc); //OUTPUT each object
            //  SET li
            let li = document.createElement('li');
            //  SET button
            let item = document.createElement('button');
            //  SET button text as toDo title
            item.textContent = toDo;
            item.addEventListener('click', () => expandToDos(li, list));
            //  SET         
            li.appendChild(item);
            _contentList.appendChild(li);
        }
    }

    // EVENT listener for each toDoList title button


    function expandToDos(li, obj){
        console.log(obj);
        let toDoUL = document.createElement('ul');
        
        for(const key in obj){
            console.log(key, obj[key]);
            let toDoLI = document.createElement('li');
            toDoLI.textContent = `${key}: ${obj[key]}`;
            toDoUL.appendChild(toDoLI);
        }
        li.appendChild(toDoUL);
    }

    function displayDefaultProj(){

    }



    /* ===== PSEUDOCODE =====

    CALL _addProject event listener
    
    function 

    Modals
     
    Create project - button
        project Title
        Save
        Cancel

    Add toDos - button
        Title
        Desc
        Due
        Priority
        Save
        Cancel



    ===== END pseudocode ===== */

}());


let feedCat = projectController.newProject("feed cat");
// console.log(projectController.getProjectList());
// console.log(feedCat.toDoList);
feedCat.addToDo("breakfast", "wet food", "7am", "high");
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
// haircut.addToDo('haircut', "butterfly cut", "8 weeks", "low")
// console.log(haircut);
// console.log(projectController.getProjectList());


/* 
REQUIREMENTS
- view all projectsw
- view todos in all projects
- expand individual todos and edit details



=================== PSEUDOCODE =======================



*/