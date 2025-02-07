let projectController = function(){

function createProject(name){
        // name
        this.name = name;
        // todolist - array?
        let toDoList = [
            // okay but then how do I trigger the createToDo function and set the result to this array that's what I need do to next
            // will occur an unknown number of times 
        ];

    }

}



function createToDo (item, priority, due){
    return {item, priority, due}    
}

let todo1 = createToDo("feed kitty", "urgent", "now");
console.log(todo1);
    
    // createToDo
    // - Give it a due date
    // - Give it a priority
    // - List item
