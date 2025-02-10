export const toDoController = function(){
    let newToDo;

    function createToDo (name, priority, due, ...desc){
        return newToDo = {  name, 
                            priority, 
                            due, 
                            status: "incomplete",
                            ...desc}    
    }
    
    function updateToDoPriority(todo, newPriority){
        return todo.priority = newPriority;
        //watch kyle's video about single responsibiity for inspo on writing this
    }

    function completeToDo(toDo){
        return toDo.status = "complete";
    }

    function deleteToDo(){
        
    }

    return {
        createToDo,
        updateToDoPriority,
        completeToDo,
        getNewToDo: function(){
            return newToDo;
        }
    }
}    



// let todo1 = createToDo("feed kitty", "urgent", "now");
// console.log(todo1);