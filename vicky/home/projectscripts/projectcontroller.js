let ProjectController = (function(view, model){

    let addProject = function(event){
        event.preventDefault();
        let formData = validateProjectForm();
    }
    let getUsers = function(typedText){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8787/ProApp/user/getusers?id=all");
        xhr.send();
        xhr.onload = function(){
            view.renderPeopleSearchResult(JSON.parse(xhr.response), typedText);
        }
    }
    let openTaskAddingSection = function(){
        TaskView.renderProjectOption();
        console.log(model.getProjectsArray());
        _(view.getDomStrings().taskSection).classList.add(view.getDomStrings().showTaskSection);
    }
    let closeTaskAddingSection = function(){
        _(view.getDomStrings().taskSection).classList.remove(view.getDomStrings().showTaskSection);
    }
    let validateProjectForm = function(){   
        //Getting all form input datas
        let projectUser = [];
        let projectName = _(view.getDomStrings().projectNameId).value;
        let projectDescription = _(view.getDomStrings().projectDescriptionInput).value;
        let projectFromDate = _(view.getDomStrings().projectFromDate).value;
        let projectLastDate = _(view.getDomStrings().projectLastDate).value;
        projectUser.push(_(view.getDomStrings().projectPeopleAddingInput).classList[2]); 

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
            let flag = false;
            let userId = _(view.getDomStrings().projectPeopleAddingInput).classList[2];
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:8787/ProApp/user/getusers?id=all");
            xhr.send();
            xhr.onload = function(){
                //Doing everything inside onload function because of asynchronous problem.
                let userData = JSON.parse(xhr.response);
                for(let i = 0;i < userData.length;i++){
                    if(userData[i].uid == userId){
                        flag = true;
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
                }
                if(!flag){
                    showErrorMessage("Invalid user");
                    playErrorAudio();
                    // alert("Invalid user");
                }
            }
            //onload function ends here
        }
        else {
            showErrorMessage("Fill all the fields in the form");
            playErrorAudio();
        }
    }
    let init = function(){
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
            //Removing user id from input tag
            let tempClass = _(view.getDomStrings().projectPeopleAddingInput).classList;
            if(tempClass.length > 2){
                _(view.getDomStrings().projectPeopleAddingInput).classList.remove(tempClass[2]);
            }
            _(view.getDomStrings().projectAddingSection).reset();
            _(view.getDomStrings().fullProjectAndTaskSection).classList.remove(view.getDomStrings().showNewProjectSection);
        });
        //This for closing the add task section
        _(view.getDomStrings().taskAddingSectionCloseButton).addEventListener("click", function(){
            //Removing user id from input tag
            normalClickAudio();
            let tempClass = _(TaskView.getDomStrings().taskUsers).classList;
            if(tempClass.length > 2){
                _(TaskView.getDomStrings().taskUsers).classList.remove(tempClass[2]);
            }
            _(view.getDomStrings().taskSection).reset();
            _(view.getDomStrings().fullProjectAndTaskSection).classList.remove(view.getDomStrings().showNewProjectSection);
            _(view.getDomStrings().taskSection).classList.remove(view.getDomStrings().showTaskSection);
        });
        
        //This is for project adding button
        _(view.getDomStrings().projectAddingButton).addEventListener("click", addProject);

        //This is for searching people in project adding section
        _(view.getDomStrings().projectPeopleAddingInput).addEventListener("input", function(event){
            normalClickAudio();
            let tempClass = _(view.getDomStrings().projectPeopleAddingInput).classList;
            if(tempClass.length > 2){
                _(view.getDomStrings().projectPeopleAddingInput).classList.remove(tempClass[2]);
            }
            
            getUsers(event.target.value.trim().toLowerCase());
        });

        //This is for side navbar and bottom mobile view project button
        _All(view.getDomStrings().projectNavbarButton).forEach(function(elem){
            elem.addEventListener("click", function(){
                normalClickAudio();
                _(TaskView.getDomStrings().mainTaskSection).classList.remove(TaskView.getDomStrings().showMainSection.slice(1));
                _(view.getDomStrings().mainProjectSection).classList.add(TaskView.getDomStrings().showMainSection.slice(1));
            });
        });

        //This is for project overview closing action 
        _(view.getDomStrings().projectOverViewCloseButton).addEventListener("click", function(){
            _(view.getDomStrings().fullProjectOverview).classList.remove(view.getDomStrings().showProjectOverview);
        });
    }
    
    init();

    return {
        init : init,
        addProject : addProject,
        openTaskAddingSection : openTaskAddingSection
    }
    
})(ProjectView, ProjectModel);