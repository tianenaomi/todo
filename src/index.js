import "./style.css";
import { projectController } from "./project";
import { toDoController } from "./todo";

let screenController = (function(){
    let _addProject = document.createElement('button');
    let _content = document.getElementById('content');
    let _contentHeader = document.createElement('h2');
    let _sidebar = document.getElementById('sidebar');
    let _sideHeader = document.createElement('h1');


    _addProject.textContent = "Add Project";
    _contentHeader.textContent = "To Do List";
    _sideHeader.textContent = "Projects";


    _content.appendChild(_contentHeader);
    _sidebar.appendChild(_sideHeader);
    _sidebar.appendChild(_addProject);

}());

console.log(projectController.getProjectList());
let feedCat = projectController.newProject("feed cat");
console.log(feedCat.toDoList);

// console.log("Before adding:", feedCat.toDoList);
feedCat.addToDo("breakfast", "wet food", "7am", "high");
// console.log("After adding:", feedCat.toDoList);
console.log(feedCat);
console.log(projectController.getProjectList());


/* 
REQUIREMENTS
- view all projectsw
- view todos in all projects
- expand individual todos and edit details



=================== PSEUDOCODE =======================



*/