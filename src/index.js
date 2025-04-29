import "./style.css";
import { projectController } from "./project";
import { toDoController } from "./todo";


let screenController = (function(){
    let _addProject = document.createElement('button');
    let _addToDo = document.createElement('button');
    let _closeBtns = document.querySelectorAll('.closeBtn');
    let _content = document.getElementById('content');
    let _contentHeader = document.createElement('h2');
    let _contentList = document.querySelector('#content > ul');
    let _header = document.getElementById('header');
    let _modalProj = document.getElementById('modalProj');
    let _modalToDo = document.getElementById('modalToDo');
    let _projNewTitle = document.getElementById('projNewTitle');
    let _projNewSave = document.getElementById('saveProj');
    let _sidebar = document.getElementById('sidebar');
    let _sidebarList = document.querySelector('#sidebar > ul');
    let _sideHeader = document.createElement('h2');
    let _toDoNewTitle = document.getElementById('toDoTitle');
    let _toDoNewDesc = document.getElementById('toDoDesc');
    let _toDoNewDue = document.getElementById('toDoDue');
    let _toDoNewPriority = document.getElementById('toDoPriority');
    let _toDoNewSave = document.getElementById('saveToDo');
    

    _addProject.textContent = "Add Project";
    _addToDo.textContent = "Add ToDo";
    _contentHeader.textContent = "To Do List";
    _sideHeader.textContent = "Projects";


    _content.insertBefore(_contentHeader, _contentList);
    _contentHeader.appendChild(_addToDo);
    _sidebar.insertBefore(_sideHeader, _sidebarList);
    _sidebar.appendChild(_addProject);


    //EVENT Listeners
    _addProject.addEventListener('click', () => {
        _modalProj.style.display = 'block';
    });
    _addToDo.addEventListener('click', (event) => {
        event.preventDefault();
        createProjDropList();
        _modalToDo.style.display = 'block';
    });
    _closeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
        _modalProj.style.display = 'none';
        _modalToDo.style.display = 'none';
        });
    });
    _projNewSave.addEventListener('click', (event) => {
        event.preventDefault(); 
        projectController.newProject(_projNewTitle.value);
        updateProjListDisp();
        _projNewTitle.value = '';
        _modalProj.style.display = 'none';
    });
    _toDoNewSave.addEventListener('click', (event) => {
        event.preventDefault();
        
    });

    //END event Listeners

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
        // Add button for adding new toDo
        // let newToDo = document.createElement('button');
        // newToDo.textContent = "Add ToDo";
        // newToDo.addEventListener('click', () => {
        //     _modalToDo.style.display = 'block';

        //     // POUR MOI POUR DEMAIN
        //         // Working on this event listener in html and toDo files

        //     // 
        // });
        // _contentList.appendChild(newToDo);
        // console.log(list);
        for(const toDo in list){
            console.log(toDo);
            console.log(list[toDo]); 
            let li = document.createElement('li');
            let item = document.createElement('button');
            item.textContent = toDo;
            item.addEventListener('click', () => expandToDos(li, list[toDo]));  //list[toDo] changed from list
            li.appendChild(item);
            _contentList.appendChild(li);
        }
    }

    function expandToDos(li, list){
        if (li.hasAttributes() == false){
            let toDoUL = document.createElement('ul');
            for(const key in list){
                if (key === "completeToDo"){
                    let toDoLI = document.createElement('li');
                    let completeToDo = document.createElement('button');
                    // add event listener that invokes completeToDo();
                    completeToDo.addEventListener('click', () => {
                        console.log(list[key]);
                    });
                    completeToDo.textContent = "Complete";
                    toDoUL.appendChild(toDoLI);
                    toDoLI.appendChild(completeToDo);
                } else if (key === "title"){
                    ;
                } else {
                    let toDoLI = document.createElement('li');
                    toDoLI.textContent = `${key}: ${list[key]}`;
                    toDoUL.appendChild(toDoLI);
                }
            }
            li.appendChild(toDoUL);
            li.setAttribute("class", "open");
        } else if (li.hasAttributes() == true){
            li.removeChild(li.lastChild);
            li.removeAttribute('class');
        }
    }

    // function completeToDo(toDo){
    //     // INVOKE toDo function

    //     // Update display
    //     // Maybe remove complete button?
    // }

    function displayDefaultProj(){

    }

    function createProjDropList() {
        let list = Object.keys(projectController.getProjectList());
        let container = document.getElementById('toDoContainer');
        let firstChild = document.getElementById('toDoTitle');
        let select = document.createElement('select');
        let label = document.createElement('label');
        select.setAttribute('id', 'projects');
        select.setAttribute('name', 'projects');
        select.setAttribute('required', '');
        label.setAttribute('for', 'projects');
        label.textContent = 'Project';
        list.forEach((title) => {
            console.log(title);
            let project = document.createElement('option');
            project.textContent = `${title}`;
            project.value = `${title}`;
            select.appendChild(project);
        });
        container.insertBefore(label, firstChild);
        container.insertBefore(select, firstChild);
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


let feedCat = projectController.newProject("feed cat");
// console.log(projectController.getProjectList());
// console.log(feedCat.toDoList);
feedCat.addToDo("breakfast", "wet food", "7am", "high");
// console.log(feedCat.toDoList);
feedCat.addToDo("dinner", "soup", "5.30pm", "high");
// console.log(feedCat.toDoList);
// feedCat.addToDo("allDay", "kibble", "NA", "high");
// console.log(feedCat);
console.log(projectController.getProjectList());
// feedCat.deleteToDo(feedCat.toDoList.breakfast);
// feedCat.editToDo(feedCat.toDoList.breakfast, 'title', 'morningTea');
// console.log(feedCat);
// console.log(projectController.getProjectList());
let haircut = projectController.newProject("haircut");
// haircut.addToDo('haircut', "butterfly cut", "8 weeks", "low")
console.log(haircut);
console.log(projectController.getProjectList());
let list = Object.keys(projectController.getProjectList());
console.log(list);

/* 
============ PSEUDOCODE =============

MOVING PARTS -- 
    -- Add ToDo button should prepopulate project somehow. That data feeds the project.addToDo() arguments or something
        -- create function to dynamically create radio buttons or drop down list?

    -- Still need to create default project

    -- Need way to invoke completeToDo


*/