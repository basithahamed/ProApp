let AddProjectController = (function(model, view){

    let addProject = function(data){

        return model.addProject(data.projectName, data.projectDescription, data.projectFromDate, data.projectLastDate, data.projectUser);
    }
    let init = function(){

    }
    init();

    return {
        init : init,
        addProject : addProject
    }
})(AddProjectModel, AddProjectView);