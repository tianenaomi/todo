import { projectController } from "./project";


export const storageController = (function(){

    function saveToStorage(keyToStore, valueToStore){
        let value = JSON.stringify(valueToStore);
        if (typeof(Storage) != 'undefined'){
            localStorage.setItem(keyToStore, value);
        } else {
            console.log("Error: localStorage not working, returning undefined");
        }  
    }

    function getFromStorage(item){
        let fromStorage = JSON.parse(localStorage.getItem(`${item}`));
        console.log(fromStorage);
        if (item == "projectList"){
            for (const project in fromStorage){
                projectController.addMethodsToProject(fromStorage[project]);
                projectController.updateProjectList(fromStorage[project]);
                console.log(fromStorage);
            }
        } else if (item == "currentProject") {
            projectController.addMethodsToProject(fromStorage);
            projectController.setCurrentProj(fromStorage);
        } else {
            console.log("getFromStorage: error");
        }
    }

    return {
        saveToStorage,
        getFromStorage
    }
}());