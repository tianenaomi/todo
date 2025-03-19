import { toDoController } from './todo';

export const projectController = (function(){
    let _projectList = {}; 

    // function newProject(title) {
    //     console.log("Before adding:", _projectList);
    //     let project = {
    //         title,
    //         toDoList: {},
    //         addToDo: function(title, desc, due, priority) {
    //             // let clone = JSON.parse(JSON.stringify(project));
    //             let newToDo = toDoController.createToDo(title, desc, due, priority);
    //             this[toDoList.title] = newToDo;
    //         }
    //     }
    //     addToProjectList(project);
    //     return project;
    // }

    function newProjectShell(title) {
        // console.log("Before adding:", _projectList);
        let shell = {
            title,
            toDoList: {},
        }
        return shell;
    }

    function newProject(title){
        let project = newProjectShell(title);
        
        // ISSUE must be with this function as other clones work    . I think I need to clone and replace before adding new item
        project.addToDo = function(title, desc, due, priority) {
                // console.log("Before cloning toDoList", this.toDoList)
                let cloneList = cloneObject(this.toDoList);
                // console.log(this.toDoList === cloneList);
                this.toDoList = cloneList;
                // console.log("After cloning toDoList", this.toDoList)

                let newToDo = toDoController.createToDo(title, desc, due, priority);
                this.toDoList[title] = newToDo;
        }
        //

        addToProjectList(project);    
        return project;
        /* I THINK I KNOW WHAT THE ISSUE IS
        When I'm console.logging I have inspecting the toDoList before it's cloned. After it's cloned I THINK I'm inspecting the old reference instead of the one that's added to the project list. so I'm comparing objects that are referencing the same VALUE but no the same reference in memory

        The add to ProjectList is 

        I think I need to make separate cloning functions. Maybe a clone function for the toDo and one for the projectList


        okay yeah turns out I solved this days ago I'm relieved but fucking annoyed..

        */
    }
    
    function addToProjectList(project) {
        let clonedProject = cloneObject(project);
        let clonedList = cloneObject(_projectList);
        //console.log(clonedProject === project):
        clonedList[clonedProject.title] = clonedProject;
        return _projectList = clonedList;
    }

    function cloneObject(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    return {
        // addToDo,
        // addToProjectList,
        newProject,
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
