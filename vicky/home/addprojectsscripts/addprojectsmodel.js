let AddProjectModel = (function(){

    let Project = function(id, projectName, projectDesc, fromDate, toDate, users){
        this.id = id;
        this.projectName = projectName;
        this.projectDesc = projectDesc;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.status = "Yet to start";
        this.users = users;
    }
    let changeServerObject = function(serverObject){
        localStorage.lastAddedProject = serverObject.id;
        return new Project(serverObject.id, serverObject.projectName, serverObject.projectDesc, serverObject.fromDate, serverObject.toDate, serverObject.users);
    }
    let addProject = function(projectName, projectDesc, fromDate, toDate, users){
        let formData = new FormData();
        let tempObj = {
            projectName : projectName,
            projectDesc : projectDesc,
            fromDate : fromDate,
            toDate : toDate,
            users : users
        }
        
        formData.append("data", JSON.stringify(tempObj));
        
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://192.168.103.32:8050/ProApp/project/add");
        xhr.send(formData);
        xhr.onload = function(){
            let serverObject = JSON.parse(xhr.response); 
            let project = changeServerObject(serverObject);
            ProjectModel.addProject(project);
            ProjectController.openTaskAddingSection();
            ProjectView.renderProjects(ProjectModel.getProjectsArray());
        }
        // return new Project(getTempId(), projectName, projectDesc, fromDate, toDate, users);
    }
    let getTempId = function(){
        if(ProjectModel.getProjectsArray().length){
            return ProjectModel.getProjectsArray()[ProjectModel.getProjectsArray().length-1].id + 1;
        }
        else {
            return 1;
        }
    }

    return {
        addProject : addProject
    }
})();