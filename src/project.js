import { toDoController } from './todo';
import _ from "lodash";

export const projectController = (function(){
    let _projectList = {}; 

    function newProject(projTitle){
        let project = newProjectShell(projTitle);
        project.addToDo = function(title, desc, due, priority) {
            let cloneList = _.cloneDeep(this.toDoList);
            this.toDoList = cloneList;
            let newToDo = toDoController.newToDo(title, desc, due, priority);
            this.toDoList[title] = newToDo;
            updateProjectList(project);
        }
        project.deleteToDo = function(toDo){
            let cloneList = _.cloneDeep(this.toDoList);
            let cloneToDo = _.cloneDeep(toDo);
            delete cloneList[cloneToDo.title];
            this.toDoList = cloneList;
            updateProjectList(project);
        }
        project.editToDo = function(toDo, key, newData){
            let cloneList = _.cloneDeep(this.toDoList);
            let cloneToDo = _.cloneDeep(toDo);
            // console.log(this.toDoList === cloneList);
            if (key == "title") {
                delete cloneList[cloneToDo.title];
                cloneList[newData] = cloneToDo;   
            }
            cloneToDo[key] = newData;
            this.toDoList = cloneList;
            updateProjectList(project);
            // CONSOLE LOG values appear to share references again but comparisons output as false so continuing on
        }
        updateProjectList(project);  
        return project;
    }

    // FUNCTIONS which aren't being returned ===========
    function newProjectShell(projTitle) {
        // console.log("Before adding:", _projectList);
        let shell = {
            projTitle,
            toDoList: {},
        }
        return shell;
    }

    function updateProjectList(project) {
        let clonedProject = _.cloneDeep(project);
        let clonedList = _.cloneDeep(_projectList);
        //console.log(clonedProject === project):
        clonedList[clonedProject.projTitle] = clonedProject;
        // console.log(clonedList);
        return _projectList = clonedList;
    }

    function deleteProject(project) {
        let clonedProject = _.cloneDeep(project);
        let clonedList = _.cloneDeep(_projectList);
        delete clonedList[clonedProject.title];
        return _projectList = clonedList;
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

