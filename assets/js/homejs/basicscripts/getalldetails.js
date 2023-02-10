let allProjects;
let allTasks;

//Getting all projects data of current user
let resetProject = function(){
    let projectsXhr = new XMLHttpRequest();
    projectsXhr.open("GET", "project/getall");
    projectsXhr.send();
    projectsXhr.onload = function(){
        allProjects = JSON.parse(projectsXhr.response);
        //Rendering all projects
        allProjects.forEach(function(elem){
            ProjectModel.addProject(AddProjectModel.changeServerObject(elem));
            ProjectView.renderProjects(ProjectModel.getProjectsArray());
        });
        //Rendering Project option for task adding
        TaskView.renderProjectOption();
    }
}


//Getting all tasks data of current user
let resetTasks = function(){
    let tasksXhr = new XMLHttpRequest();
    tasksXhr.open("GET", "task/getall");
    tasksXhr.send();
    tasksXhr.onload = function(){
        TaskModel.resetTasks();
        let allTasks = JSON.parse(tasksXhr.response);
        console.log(allTasks);
        allTasks.forEach(function(elem){
            TaskModel.addTask(TaskModel.changeServerObject(elem, true));
        });
        TaskView.renderTasks(TaskModel.getTasks());
    }
}

resetProject();
resetTasks();