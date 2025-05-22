import { projectController } from "./project";

export const toDoController = (function(){

    // function newToDo(title, desc, due, priority){
    //     let toDo = newToDoShell(title, desc, due, priority);
    //     toDo.completeToDo = function(){
    //         toDo.status = 'complete';
    //     }
    //     return toDo;
    // }

    // function newToDoShell(title, desc, due, priority){
    //     return {
    //         title,
    //         desc,
    //         due,
    //         priority,
    //         status: 'incomplete'
    //     }
    // }

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
    }

    function addTaskToList(title, desc, due, priority){
        let cloneList = _.cloneDeep(this.taskList);
        this.taskList = cloneList;
        let task = newTask(title, desc, due, priority);
        this.taskList[title] = task; 
    }

    function deleteTask(task){
        let cloneList = _.cloneDeep(this.taskList);
        let cloneTask = _.cloneDeep(task);
        delete cloneList[cloneTask.title];
        this.taskList = cloneList; 
    }

    function editTask(task, key, newData){
        let cloneList = _.cloneDeep(this.taskList);
        let cloneTask = _.cloneDeep(task);
        console.log(this.taskList === cloneList);
        if (key == "title"){
            delete cloneList[cloneTask.title];
            cloneList[newData] = cloneTask;   
        }
        cloneTask[key] = newData;
        this.taskList = cloneList;
    }

    return {
        addTaskToList,
        deleteTask,
        editTask,
        newTask,
        completeTask,
    }

}());    

    /* =======  UP TO HERE =======
    // see notes in project template. localStorage has a limitation so considering re-working all the object methods so that they're separated out cos my UI doesn't really work with them attached anyway. I want this project to be OVVVERR

    // or... maybe I can just bash my head against this chatGPT suggestion and get it over with. Actually, yes attempt that first cos surely that is way quicker so this project can just die already

    // Okay - stackoverflow makes a very good point - why _would_ you need to store a function to local storage? there's nothing unique about them

    // Monday - 19/05/1989
    // I think I'll move all the toDo methods from the project module to this module. addToDo changed to addToTaskList. I think I'm going to rename everything from toDo to task because toDo is a mouthful

    To move
    1. addTaskToList
    2. editTask
    3. deleteTask

    ========  WAY FORWARD  ========
    - Defining all methods outside of factories to create projects and tasks. 
    - Adding methods to projects separately
    - When projects are added to localStorage, they will automatically lose methods as they cannot be stored
    - function to retrieve from localStroage will need to readd methods to project objects





    */



