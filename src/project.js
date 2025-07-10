import { toDoController } from './todo';
import _ from "lodash";

export const projectController = (function(){
    let _projectList = {}; 
    let _currentProject;

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
        // console.log(_projectList);
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

    function updateProjectList(project) {
        let clonedProject = _.cloneDeep(project);
        let clonedList = _.cloneDeep(_projectList);
        clonedList[clonedProject.projTitle] = clonedProject;
        return _projectList = clonedList;
    }

    function deleteProject(project) {
        let clonedProject = _.cloneDeep(project);
        let clonedList = _.cloneDeep(_projectList);
        delete clonedList[clonedProject.projTitle];
        _currentProject = "";
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
        addMethodsToProject,
        newProject,
        deleteProject,
        getProjectList: function(){
            return _projectList;
        },
        getCurrentProj: function(){
            return _currentProject;
        },
        setCurrentProj: function(project){
            _currentProject = project;
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

