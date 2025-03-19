export const toDoController = (function(){

    function createToDo(title, desc, due, priority) {
        return {
            title,
            desc,
            due,
            priority,
            status: 'incomplete'
        }
    }

    return {
        createToDo,
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




*/
