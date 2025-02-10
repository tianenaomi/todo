import "./style.css";
import { projectController } from "./project";

let screenController = (function(){
    let addProject = document.createElement('button');
    let content = document.getElementById('content');
    let contentHeader = document.createElement('h2');
    let sidebar = document.getElementById('sidebar');
    let sideHeader = document.createElement('h1');
    

    addProject.textContent = "Add Project";
    contentHeader.textContent = "To Do List";
    sideHeader.textContent = "Projects";


    content.appendChild(contentHeader);
    sidebar.appendChild(sideHeader);
    sidebar.appendChild(addProject);

}());

/* =================================================
                    PSEUDOCODE
====================================================
WHAT DO I NEED
1. List of projects, each project to have;
    a. Title
    b. Description (optional)
    c. Due date
    d. priority
    e. notes or checklist
2. Button to add new project
3. Button to add new todo and select which project to assign


MODULES
=== screenController ===
1. View all projects
2. View all todos in project
3. Ability to expand each todo to see/edit details
4. delete

Sidebar
1. Shows list of projects
2. click on project and project details will expand in content div
3. default project shown on page load


+++ projectController +++

createProject
- button to create
- give it a name
    text field
- call createToDo
- button to save



### toDoController? ###


createToDo
- button to create
- add to project or stand alone?
- Give it a due date
    tbc
- Give it a priority
    - colour coded with class?
- List item
    - checkbox 







*/