let allProjects;
let allTasks;

//Getting all projects data of current user
let resetProject = () => {
    ProjectModel.resetProject();
    let projectsXhr = new XMLHttpRequest();
    projectsXhr.open("GET", "project/getall");
    projectsXhr.send();
    projectsXhr.onload = () => {
        allProjects = JSON.parse(projectsXhr.response);
        //Rendering all projects
        allProjects.forEach(elem => {
            ProjectModel.addProject(AddProjectModel.changeServerObject(elem));
        });
        ProjectView.renderProjects(ProjectModel.getProjectsArray());
        //Rendering Project option for task adding
        TaskView.renderProjectOption();
    }
}


//Getting all tasks data of current user
let resetTasks = () => {
    let tasksXhr = new XMLHttpRequest();
    tasksXhr.open("GET", "task/getall");
    tasksXhr.send();
    tasksXhr.onload = () => {
        TaskModel.resetTasks();
        let allTasks = JSON.parse(tasksXhr.response);
        console.log(allTasks);
        allTasks.forEach(elem => {
            TaskModel.addTask(TaskModel.changeServerObject(elem, true));
        });
        TaskView.renderTasks(TaskModel.getTasks());
    }
}

let resetImages = () => {
    getCurrentUserDetails();
    console.log(CURRENTUSERPHOTO);
    _All(ProfileView.getDomStrings().profileImage).forEach(elem => {
        elem.style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
    });
    _(ProfileView.getDomStrings().editProfilePhotoImage).style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
    _(".mini-photo").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
    _(".bottom-icon-profile").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
}

resetProject();
resetTasks();