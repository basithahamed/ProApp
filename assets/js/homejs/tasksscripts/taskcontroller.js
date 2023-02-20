let TaskController = ((view, model) => {

    let addTask = () => validateProjectForm();

    let renderPeople = (element, pid) => {
        sendGetRequest("/ProApp/user/getusers/project?id=" + pid, function(){
            PeopleAdding.renderPeopleChoosingSection(element, JSON.parse(this.response), false);
        })
        // let xhr = new XMLHttpRequest();
        // xhr.open("GET", "/ProApp/user/getusers/project?id=" + pid);
        // xhr.send();
        // xhr.onload = () => PeopleAdding.renderPeopleChoosingSection(element, JSON.parse(xhr.response), false);
    }
    //This is to remove task works if current user is the one who created that specific task
    let removeTask = (id, isDelete) => {
        let url;
        if(isDelete){
            url = "task/delete?taskId=" + id;
        }
        else {
            url = "task/user/delete";
        }
        sendPostRequest(url, "", function(){
            model.removeTask(id);
            view.renderTasks(model.getTasks());
            resetProject();
            _(view.getDomStrings().taskOverViewCloseButton).click();
        })
    }
    let changeTaskStatus = id => {
        let xhr = new XMLHttpRequest();
        let obj = {
            userId : USERID,
            taskId : id
        }
        let formData = new FormData();
        formData.append("taskData", JSON.stringify(obj));

        xhr.open("POST", "task/user/changestatus");
        xhr.send(formData);
        xhr.onload = () => {
            resetTasks();
            resetProject();
        }
    }
    //This is to exit from a task
    // let exitFromTask = id => {
    //     let xhr = new XMLHttpRequest();
    //     let obj = {
    //         userId : USERID,
    //         taskId : id
    //     }
    //     let formData = new FormData();
    //     formData.append("userData", JSON.stringify(obj));
    //     xhr.open("POST", "task/user/delete");
    //     xhr.send(formData);
    //     xhr.onload = () => {
    //         model.removeTask(id);
    //         view.renderTasks(model.getTasks());
    //         resetProject();
    //         _(view.getDomStrings().taskOverViewCloseButton).click();
    //     }
    // }
    //This is to check whether the users are in the selected project
    let isValidUsers = (users, pid, validateFunction) => {
        let outsideFlag = false;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/ProApp/user/getusers/project?id=" + pid);
        xhr.send();
        xhr.onload = () => {
            let temp = JSON.parse(xhr.response);
            let flag = false;
            for(let i = 0;i < users.length;i++){
                for(let j = 0;j < temp.length;j++){
                    if(users[i] == temp[j].userId){
                        flag = true;
                        break;
                    }
                }
                if(flag){
                    outsideFlag = true;
                    flag = false;
                }
                else{
                    console.log(users[i])
                    outsideFlag = false;
                    break;
                }
            }
            validateFunction(outsideFlag);
        }
    }
    let validateProjectForm = () => {   
        //Getting all form input datas
        let taskUser = ProjectController.getSelectedUsers("task-people-option");
        let taskName = _(view.getDomStrings().taskNameInput).value;
        let taskDescription = _(view.getDomStrings().taskDescInput).value;
        let taskFromDate = _(view.getDomStrings().taskFromDate).value;
        let taskLastDate = _(view.getDomStrings().taskToDate).value;
        let projectId = _(view.getDomStrings().taskProjectSelect).value;
        taskUser.push(USERID); 

        //Setting default value to from date if it is empty
        if(taskFromDate == ""){
            taskFromDate = new Date();
            let tempDate = new Date();
            taskFromDate = tempDate.getFullYear() + "-";
            let temp = tempDate.getDate();
            let tempMonth = tempDate.getMonth() + 1;
            if(tempMonth < 10){
                tempMonth = "0" + tempMonth;
            }
            if(temp < 10){
                temp = "0" + temp;
            }
            taskFromDate += tempMonth + "-";
            taskFromDate += temp;
        }
        //Giving other actions as a callback function to avoid synchronous problem.
        isValidUsers(taskUser, projectId, isValidUserInput => {
            //Checking the whether all the values aren't empty
            if(taskName != "" && taskLastDate != "" && taskUser != "" && projectId != "" && isValidUserInput){
                let obj = {
                    taskName : taskName,
                    taskDescription : taskDescription,
                    fromDate : taskFromDate,
                    toDate : taskLastDate,
                    users : taskUser,
                    projectId : projectId
                };
                model.createTask(obj);
                playSuccessAudio();
                //Resetting task adding form
                _(view.getDomStrings().taskSection).reset();
                //Closing task adding section
                _(view.getDomStrings().taskSection).classList.remove(view.getDomStrings().showTaskSection);
                _(ProjectView.getDomStrings().fullProjectAndTaskSection).classList.remove(ProjectView.getDomStrings().showNewProjectSection);
            }
            //onload function ends here
            else {
                playErrorAudio();
                if(!isValidUserInput){
                    showErrorMessage("Users are not found in the selected project");
                }
                else {
                    showErrorMessage("Fill all the fields in the form");
                }
            }
        });
    }
    let init = () => {
        //This is for task adding button
        _(view.getDomStrings().taskButton).addEventListener("click", addTask);

        //This is for side navbar and bottom mobile view task button
        _All(view.getDomStrings().taskNavbarButton).forEach(elem => {
            elem.addEventListener("click", () => {
                normalClickAudio();
                _(view.getDomStrings().mainTaskSection).classList.add(view.getDomStrings().showMainSection.slice(1));
                _(ProjectView.getDomStrings().mainProjectSection).classList.remove(view.getDomStrings().showMainSection.slice(1));
            });
        });
        //This is for opening people adding section tasks
        _(view.getDomStrings().taskPeopleAddingSectionButton).addEventListener("click", () => {
            _(view.getDomStrings().taskPeopleSelectingFullWrapper).classList.add(view.getDomStrings().showPeopleAddingSection);
            //There is a problem here when the user click change project after choosing people.
            let pid = _(view.getDomStrings().taskProjectSelect).value;
            renderPeople(_(view.getDomStrings().taskPeopleOptionWrapper), pid);
        });
        //This is for closing people adding section
        _(view.getDomStrings().peopleAddingDoneButton).addEventListener("click", () => {
            _(view.getDomStrings().taskPeopleSelectingFullWrapper).classList.remove(view.getDomStrings().showPeopleAddingSection);
        });

        //This is for new button in task section 
        _(view.getDomStrings().addNewTaskButton).addEventListener("click", () => {
            normalClickAudio();
            if(ProjectModel.getProjectsArray().length){
                view.renderProjectOption();
                _(view.getDomStrings().taskSection).classList.add(view.getDomStrings().showTaskSection);
            }
            else{
                showErrorMessage("Add a Project first");
                playErrorAudio();
            } 
        });

        //This is for task overview closing action 
        _(view.getDomStrings().taskOverViewCloseButton).addEventListener("click", () => {
            normalClickAudio();
            _(view.getDomStrings().fullTaskOverview).removeAttribute("id");
            _(view.getDomStrings().fullTaskOverview).classList.remove(view.getDomStrings().showTaskOverview);
        });

        //This is for task  overview closing button
        _(view.getDomStrings().overViewExitButton).addEventListener("click", () => {
            if(USERID == _(view.getDomStrings().taskOverViewCreatedBy).id){
                console.log("Remove project");
                removeTask(_(view.getDomStrings().fullTaskOverview).id);
            }
            else {
                console.log("Exit from project");
                exitFromTask(_(view.getDomStrings().fullTaskOverview).id);
            }
        });
    }
    init();

    return {
        addTask : addTask,
        changeTaskStatus : changeTaskStatus
    }
})(TaskView, TaskModel);