import { toDoController } from './todo';

export const projectController = (function(){
    let _projectList = {}; 

    function newProject(title){
        let project = newProjectShell(title);
        project.addToDo = function(title, desc, due, priority) {
            let cloneList = cloneObject(this.toDoList);
            this.toDoList = cloneList;
            let newToDo = toDoController.newToDo(title, desc, due, priority);
            this.toDoList[title] = newToDo;
        }
        project.deleteToDo = function(toDo){
            let cloneList = cloneObject(this.toDoList);
            let cloneToDo = cloneObject(toDo);
            delete cloneList[cloneToDo.title];
            this.toDoList = cloneList;
        }
        addToProjectList(project);    
        return project;
    }

    

    // FUNCTIONS which aren't being returned ===========
    function newProjectShell(title) {
        // console.log("Before adding:", _projectList);
        let shell = {
            title,
            toDoList: {},
        }
        return shell;
    }

    function addToProjectList(project) {
        let clonedProject = cloneObject(project);
        let clonedList = cloneObject(_projectList);
        //console.log(clonedProject === project):
        clonedList[clonedProject.title] = clonedProject;
        return _projectList = clonedList;
    }

    function deleteProject(project) {
        let clonedProject = cloneObject(project);
        let clonedList = cloneObject(_projectList);
        delete clonedList[clonedProject.title];
        return _projectList = clonedList;
    } 

    function cloneObject(obj){
        return JSON.parse(JSON.stringify(obj));
    }
    //==================================================

    return {
        newProject,
        deleteProject,
        getProjectList: function(){
            return _projectList;
        }
    }

}());

/* 
REQUIREMENTS
- project list of todos
- default project
- ability to create project and assign todos to new project


============= PSEUDOCODE ================

CREATE factory object with title only
CLONE object
GIVE addToDo method to object

or

CREATE factory object with title, empty toDoList and method
CLONE object then add to projects list
    
*/

/* 
============ ATTEMPTS ===========

// ATTEMPT 1 -  both projectList and toDoList seem

let _projectList = {}; 

function newProject(title) {
    console.log("Before adding:", _projectList);
    let project = {
        title,
        toDoList: {},
        addToDo: function(title, desc, due, priority) {
            let newToDo = toDoController.createToDo(title, desc, due, priority);
            this.toDoList.title = newToDo;
        }
    }
    addToProjectList(project);
    return project;
}

function addToProjectList(project) {
    let cloned = JSON.parse(JSON.stringify(project));
    return _projectList.title = cloned;
}


*/
