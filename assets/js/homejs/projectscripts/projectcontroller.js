let ProjectController = ((view, model) => {

    //This is to add a project
    let addProject = event => {
        event.preventDefault();
        let formData = validateProjectForm();
    }
    //This is to get the users
    let renderPeople = element => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/ProApp/user/getusers?id=all");
        xhr.send();
        xhr.onload = () => PeopleAdding.renderPeopleChoosingSection(element, JSON.parse(xhr.response), true);
    }
    //This is to open the task section
    let openTaskAddingSection = () => {
        TaskView.renderProjectOption();
        _(view.getDomStrings().taskSection).classList.add(view.getDomStrings().showTaskSection);
    }
    //This is to remove project works if current user is the one who created that specific project
    let removeProject = id => {
        let xhr = new XMLHttpRequest();
        
        xhr.open("POST", "project/delete?projectId=" + id);
        xhr.send();
        xhr.onload = () => {
            model.removeProject(id);
            view.renderProjects(model.getProjectsArray());
            resetTasks();
            _(view.getDomStrings().projectOverViewCloseButton).click();
        }
    }
    //This is to get selected the users values 
    let getSelectedUsers = optionName => {
        tempArray = [];
        let temp = document.getElementsByName(optionName);
        console.log("seleced tags = " + temp);
        temp.forEach(elem => {
            if(elem.checked){
                console.log(elem.value);
                tempArray.push(elem.value);
            }
        });
        console.log("selected users = " + tempArray);
        return tempArray;
    }
    //This is to exit from a project
    let exitFromProject = id => {
        let xhr = new XMLHttpRequest();
        let obj = {
            userId : USERID,
            projectId : id
        }
        let formData = new FormData();
        formData.append("userData", JSON.stringify(obj));
        xhr.open("POST", "project/user/delete");
        xhr.send(formData);
        xhr.onload = () => {
            model.removeProject(id);
            view.renderProjects(model.getProjectsArray());
            resetTasks();
            _(view.getDomStrings().projectOverViewCloseButton).click();
        }
    }
    //This is to validate the details in project adding section
    let validateProjectForm = () => {   
        //Getting all form input datas
        let projectUser = getSelectedUsers("project-people-option");
        projectUser.push(USERID);
        let projectName = _(view.getDomStrings().projectNameId).value;
        let projectDescription = _(view.getDomStrings().projectDescriptionInput).value;
        let projectFromDate = _(view.getDomStrings().projectFromDate).value;
        let projectLastDate = _(view.getDomStrings().projectLastDate).value;
        
        //Setting default value to from date if it is empty
        if(projectFromDate == ""){
            projectFromDate = new Date();
            let tempDate = new Date();
            projectFromDate = tempDate.getFullYear() + "-";
            let temp = tempDate.getDate();
            let tempMonth = tempDate.getMonth() + 1;
            if(tempMonth < 10){
                tempMonth = "0" + tempMonth;
            }
            if(temp < 10){
                temp = "0" + temp;
            }
            projectFromDate += tempMonth + "-";
            projectFromDate += temp;
        }
        //Checking the whether all the values aren't empty
        if(projectName != "" && projectLastDate != "" && projectUser != ""){
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/ProApp/user/getusers?id=all");
            xhr.send();
            xhr.onload = () => {
                let obj = {
                    projectName : projectName,
                    projectDescription : projectDescription,
                    projectFromDate : projectFromDate,
                    projectLastDate : projectLastDate,
                    projectUser : projectUser
                };
                AddProjectController.addProject(obj);
                playSuccessAudio();
                //Resetting project adding form
                _(view.getDomStrings().projectAddingSection).reset();
                //Closing project adding section
                _(view.getDomStrings().projectAddingSection).classList.remove(view.getDomStrings().showNewProjectSection);
            }
            //onload function ends here
        }
        else {
            showErrorMessage("Fill all the fields in the form");
            playErrorAudio();
        }
    }
    let init = () => {
        //Adding listener to new button
        //This is for opening the add project section
        _(view.getDomStrings().newProjectButton).addEventListener("click", function(){
            normalClickAudio();
            _(view.getDomStrings().projectAddingSection).classList.add(view.getDomStrings().showNewProjectSection);
            _(view.getDomStrings().fullProjectAndTaskSection).classList.add(view.getDomStrings().showNewProjectSection);
        });
        //This is for closing the add project section
        _(view.getDomStrings().addProjectCloseIcon).addEventListener("click", function(){
            normalClickAudio();
            _(view.getDomStrings().projectAddingSection).reset();
            _(view.getDomStrings().fullProjectAndTaskSection).classList.remove(view.getDomStrings().showNewProjectSection);
        });
        //This for closing the add task section
        _(view.getDomStrings().taskAddingSectionCloseButton).addEventListener("click", function(){
            //Removing user id from input tag
            normalClickAudio();
            _(view.getDomStrings().taskSection).reset();
            _(view.getDomStrings().fullProjectAndTaskSection).classList.remove(view.getDomStrings().showNewProjectSection);
            _(view.getDomStrings().taskSection).classList.remove(view.getDomStrings().showTaskSection);
        });
        
        //This is for project adding button
        _(view.getDomStrings().projectAddingButton).addEventListener("click", addProject);

        //This is for showing people adding section
        _(view.getDomStrings().projectPeopleAddingButton).addEventListener("click", () => {
            _(view.getDomStrings().peopleAddingSection).classList.add(view.getDomStrings().showPeopleAddingSection);
            renderPeople(_(view.getDomStrings().peopleOptionsWrapper));
        });
        //This is for closing people adding section
        _(view.getDomStrings().peopleAddingDoneButton).addEventListener("click", () => {
            _(view.getDomStrings().peopleAddingSection).classList.remove(view.getDomStrings().showPeopleAddingSection);
        });

        //This is for side navbar and bottom mobile view project button
        _All(view.getDomStrings().projectNavbarButton).forEach(elem => {
            elem.addEventListener("click", () => {
                normalClickAudio();
                _(TaskView.getDomStrings().mainTaskSection).classList.remove(TaskView.getDomStrings().showMainSection.slice(1));
                _(view.getDomStrings().mainProjectSection).classList.add(TaskView.getDomStrings().showMainSection.slice(1));
            });
        });

        //This is for project overview closing action 
        _(view.getDomStrings().projectOverViewCloseButton).addEventListener("click", () => {
            normalClickAudio();
            _(view.getDomStrings().fullProjectOverView).removeAttribute("id");
            _(view.getDomStrings().fullProjectOverview).classList.remove(view.getDomStrings().showProjectOverview);
        });
        //This is for project overview exiting button
        _(view.getDomStrings().overViewExitButton).addEventListener("click", () => {
            if(USERID == _(view.getDomStrings().projectOverViewCreatedBy).id){
                removeProject(_(view.getDomStrings().fullProjectOverView).id);
            }
            else {
                exitFromProject(_(view.getDomStrings().fullProjectOverView).id);
            }
        });
    }
    
    init();

    return {
        init : init,
        addProject : addProject,
        openTaskAddingSection : openTaskAddingSection,
        getSelectedUsers : getSelectedUsers
    }
    
})(ProjectView, ProjectModel);