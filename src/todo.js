export const toDoController = (function(){

    // function newToDo(title, desc, due, priority) {
    // //POUR MOI POUR LA PROCHAINE HEURES
    // // ADD functionality to make status as complete
    //     return {
    //         title,
    //         desc,
    //         due,
    //         priority,
    //         status: 'incomplete'
    //     }
    // }


    function newToDo(title, desc, due, priority){
        let toDo = newToDoShell(title, desc, due, priority);
        toDo.completeToDo = function(){
            toDo.status = 'complete';
        }
        // toDo.editToDo = function(key, newData){
        //     let clone = JSON.parse(JSON.stringify(toDo));
        //     return clone[key] = newData;
        // }
        return toDo;
    }

    function newToDoShell(title, desc, due, priority){
        return {
            title,
            desc,
            due,
            priority,
            status: 'incomplete'
        }
    }

    return {
        newToDo,
    }

}());    

/*
REQUIREMENTS
DONE
- todos will be objects that will be dynamically created
- minimum should have a title, description, dueDate, priority
    todo: {
        title: title,
        desc: desc,
        due: due,
        priority: priority,
    }

TO DO
- ability to edit or delete existing todos

PSEUDOCODE

EDIT TODO
What we know
- the keys for each todo
- needs to be cloned

What we don't know
- what needs to be edited

editToDo(todo, key, newData){
    SET variable for cloneToDo
    todo.key = newData;

}
    

*/
