let ProjectModel = (function(){

    let projectsArray = [];

    let getProjectsArray = function(){
        return projectsArray.slice();
    }
    let getIndexOfProject = function(id){
        return projectsArray.findIndex(function(elem){
            return elem.id == id;
        });
    }
    let resetProject = () => projectsArray = [];
    
    let removeProject = function(id){
        projectsArray.splice(getIndexOfProject(id), 1);
    }
    let addProject = function(project){
        projectsArray.push(project);
    }
    let changeStatus = function(status, id){
        projectsArray[getIndexOfProject(id)].status = status;
    }
    
    return {
        getProjectsArray : getProjectsArray,
        removeProject : removeProject,
        changeStatus : changeStatus,
        addProject : addProject,
        getIndexOfProject : getIndexOfProject,
        resetProject : resetProject
    }
})();