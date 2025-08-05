import { toDoController } from './todo';
import { storageController } from "./storage";
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
        // updateProjectList(project);
        return project;
    }

    function updateProjectList(project) {
        let cloneProject = _.cloneDeep(project);
        let cloneList = _.cloneDeep(_projectList);
        cloneList[cloneProject.projTitle] = cloneProject;
        storageController.saveToStorage("projectList", cloneList);
        return _projectList = cloneList;
    }

    function deleteProject(project) {
        let cloneProject = _.cloneDeep(project);
        let cloneList = _.cloneDeep(_projectList);
        delete cloneList[cloneProject.projTitle];
        storageController.saveToStorage("projectList", cloneList);
        _currentProject = "";
        return _projectList = cloneList;
    } 

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
            storageController.saveToStorage("currentProject", _currentProject);
        },
        updateProjectList
    }

}());

