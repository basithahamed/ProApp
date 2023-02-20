let allProjects;
let allTasks;

//Getting all projects data of current user
let resetProject = () => {
    ProjectModel.resetProject();
    sendGetRequest("project/getall", function(){
        allProjects = JSON.parse(this.response);
        //Rendering all projects
        allProjects.forEach(elem => {
            ProjectModel.addProject(AddProjectModel.changeServerObject(elem));
        });
        ProjectView.renderProjects(ProjectModel.getProjectsArray());
        //Rendering Project option for task adding
        TaskView.renderProjectOption();
    });
}

//Getting all tasks data of current user
let resetTasks = () => {
    sendGetRequest("task/getall", function(){
        TaskModel.resetTasks();
        let allTasks = JSON.parse(this.response);
        allTasks.forEach(elem => {
            TaskModel.addTask(TaskModel.changeServerObject(elem, true));
        });
        TaskView.renderTasks(TaskModel.getTasks());
    });
}

let resetImages = () => {
    getCurrentUserDetails();
    _All(ProfileView.getDomStrings().profileImage).forEach(elem => {
        elem.style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
    });
    _(ProfileView.getDomStrings().editProfilePhotoImage).style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
    _(".mini-photo").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
    _(".bottom-icon-profile").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
}

resetProject();
resetTasks();