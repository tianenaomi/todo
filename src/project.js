import { toDoController } from './todo';
import _ from "lodash";

export const projectController = (function(){
    let _projectList = {}; 

    // ******** REWORKING *********
    function newProject(projTitle) {
        let project = {
            projTitle,
            taskList: {},
        }
        return project;
    }

    function addMethodsToProject(project){
        project.addTaskToList = toDoController.addTaskToList;
        project.completeTask = toDoController.completeTask;
        project.deleteTask = toDoController.deleteTask;
        project.editTask = toDoController.editTask;
        // addMethodsToTaskList(project.taskList);
        updateProjectList(project);
        console.log(_projectList);
        //add to local storage here?
        return project;
    }

    function addMethodsToTaskList(taskList){
        // taskList.completeTask = toDoController.addTaskToList;
        taskList.completeTask = toDoController.completeTask;
        taskList.deleteTask = toDoController.deleteTask;
        taskList.editTask = toDoController.editTask;
        return taskList;
    }

    // ******** END reworking *********

    // function newProject(projTitle){
    //     let project = newProjectShell(projTitle);
    //     console.log(project);
    //     project.addToDo = function(title, desc, due, priority) {
    //         let cloneList = _.cloneDeep(this.toDoList);
    //         this.toDoList = cloneList;
    //         let newToDo = toDoController.newToDo(title, desc, due, priority);
    //         this.toDoList[title] = newToDo;
    //         updateProjectList(project);
    //     }
    //     project.deleteToDo = function(toDo){
    //         let cloneList = _.cloneDeep(this.toDoList);
    //         let cloneToDo = _.cloneDeep(toDo);
    //         delete cloneList[cloneToDo.title];
    //         this.toDoList = cloneList;
    //         updateProjectList(project);
    //     }
        // project.editToDo = function(toDo, key, newData){
        //     let cloneList = _.cloneDeep(this.toDoList);
        //     let cloneToDo = _.cloneDeep(toDo);
        //     // console.log(this.toDoList === cloneList);
        //     if (key == "title") {
        //         delete cloneList[cloneToDo.title];
        //         cloneList[newData] = cloneToDo;   
        //     }
        //     cloneToDo[key] = newData;
        //     this.toDoList = cloneList;
        //     updateProjectList(project);
        //     // CONSOLE LOG values appear to share references again but comparisons output as false so continuing on
        // }
    //     updateProjectList(project);
    //     saveToStorage(projTitle, project);  
    //     return project;
    // }

    // FUNCTIONS which aren't being returned ===========
    // function newProjectShell(projTitle) {
    //     let shell = {
    //         projTitle,
    //         toDoList: {},
    //     }
    //     return shell;
    // }

    function updateProjectList(project) {
        let clonedProject = _.cloneDeep(project);
        let clonedList = _.cloneDeep(_projectList);
        clonedList[clonedProject.projTitle] = clonedProject;
        return _projectList = clonedList;
    }

    function deleteProject(project) {
        let clonedProject = _.cloneDeep(project);
        let clonedList = _.cloneDeep(_projectList);
        delete clonedList[clonedProject.title];
        return _projectList = clonedList;
    } 

    // ===== WORKING ON THIS. trying to write functions to get and set to local storage

    function saveToStorage(keyToStore, valueToStore){
        if (typeof(Storage) != 'undefined'){
            localStorage.setItem(keyToStore, valueToStore);
        } else {
            console.log("Error: localStorage not working, returning undefined");
        }  
    }

    function getFromStorage(){

    }
    // ====== END working

    //==================================================

    return {
        // *** REWORKING ***
        addMethodsToProject,

        // *** END reworking ***
        newProject,
        deleteProject,
        getProjectList: function(){
            return _projectList;
        },
        updateProjectList
    }

}());

/* 
============= PSEUDOCODE ================
Need to invoke function to save to storage when creating a new project or toDo

Also need to invoke function to retrieve data from storage on page load.
Easiest place to retrieve... projectsList?
Perhaps loop through projectsList, or does .. how .. I don't get this

this is FUUUUUCKED. apparently there's no way to store functions to localStorage so I have to separate the methods from the project Objects, save just the project shells, then when I retrieve the project / toDo data I then have to re-add the functions separately.

I hate this project, I hate objects, they suck. Obvs they're very good and whatever but fuck

*/

