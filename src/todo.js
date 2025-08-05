// import { projectController } from "./project";
import { storageController } from "./storage";

export const toDoController = (function(){

    function newTask(title, desc, due, priority){
        return {
            title,
            desc,
            due,
            priority,
            status: 'incomplete'
        }
    }

    function completeTask(task){
        let cloneList = _.cloneDeep(this.taskList);
        let cloneTask = _.cloneDeep(task);
        cloneList[cloneTask].status = 'complete';
        this.taskList = cloneList;
        storageController.saveToStorage("projectList", cloneList);
    }

    function addTaskToList(title, desc, due, priority){
        let cloneList = _.cloneDeep(this.taskList);
        this.taskList = cloneList;
        let task = newTask(title, desc, due, priority);
        this.taskList[title] = task; 
        storageController.saveToStorage("projectList", cloneList);
    }

    function deleteTask(task){
        let cloneList = _.cloneDeep(this.taskList);
        let cloneTask = _.cloneDeep(task);
        delete cloneList[cloneTask.title];
        this.taskList = cloneList; 
        storageController.saveToStorage("projectList", cloneList);
    }

    function editTask(task, key, newData){
        let cloneList = _.cloneDeep(this.taskList);
        let cloneTask = _.cloneDeep(task);
        if (key === "title"){
            delete cloneList[cloneTask.title];
            cloneTask.title = newData;
            cloneList[newData] = cloneTask;   
        } else {
            cloneTask[key] = newData;
            cloneList[cloneTask.title] = cloneTask;
        }
        this.taskList = cloneList;
        storageController.saveToStorage("projectList", cloneList);
    }

    return {
        addTaskToList,
        deleteTask,
        editTask,
        newTask,
        completeTask,
    }

}());    


