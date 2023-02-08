let allProjects;
let allTasks;

//Getting all projects data of current user
let projectsXhr = new XMLHttpRequest();
projectsXhr.open("GET", "project/getall");
projectsXhr.send();
projectsXhr.onload = function(){
    allProjects = JSON.parse(projectsXhr.response);
    //Rendering all projects
    allProjects.forEach(function(elem){
        console.log(AddProjectModel.changeServerObject(elem));
        ProjectModel.addProject(AddProjectModel.changeServerObject(elem));
        ProjectView.renderProjects(ProjectModel.getProjectsArray());
    });
    //Rendering Project option for task adding
    TaskView.renderProjectOption();
}

//Getting all tasks data of current user
let tasksXhr = new XMLHttpRequest();
tasksXhr.open("GET", "task/getall");
tasksXhr.send();
tasksXhr.onload = function(){
    let allTasks = JSON.parse(tasksXhr.response);
    console.log(allTasks);
    allTasks.forEach(function(elem){
        console.log(TaskModel.changeServerObject(elem));
        TaskModel.addTask(TaskModel.changeServerObject(elem));
        TaskView.renderTasks(TaskModel.getTasks());
    });
}