import {toDoController} from './todo';

export const projectController = function(){
    // do I need this?
    let projectList = [];
    let completedList = [];
    let newProject;

    // function createProject(title){
    //     this.title = title;
    //     let toDoList = [];

    //     function addToDo(toDo){
    //         return toDoList.push(toDo);
    //     }

    //     //add todo separate from creating project?
    //     return {addToDo}
    // }

    function createProject(title){
        this.title = title;
        let toDoList = [];
        toDoList.push(getNewToDo());
        return newProject = {title, toDoList};
    }

    function addProject(newProject){
        return projectList.push(newProject);
    }

    function addToDo(){
        //how to select project to add to
        //push new toDo to relevant array
        
    }

    function completeProject(project){
        //isolate project from projectList array - findIndexOf() method?
        //remove from array
        //add to completedList array
        completedList.push(project);
    }

    return {
        createProject,
        addProject,
        getProjectList: function(){
            return projectList;
        },
        getCompletedList: function(){
            return completedList;
        },
    }
}





