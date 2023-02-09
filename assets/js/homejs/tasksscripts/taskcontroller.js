let TaskController = (function(view, model){

    let addTask = function(){

        validateProjectForm();
    }
    let getUsersForTasks = function(typedText){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/ProApp/user/getusers?id=all");
        xhr.send();
        xhr.onload = function(){
            view.renderPeopleSearchResult(JSON.parse(xhr.response), typedText);
        }
    }
    let validateProjectForm = function(){   
        //Getting all form input datas
        let taskUser = ["" + USERID];
        let taskName = _(view.getDomStrings().taskNameInput).value;
        let taskDescription = _(view.getDomStrings().taskDescInput).value;
        let taskFromDate = _(view.getDomStrings().taskFromDate).value;
        let taskLastDate = _(view.getDomStrings().taskToDate).value;
        let projectId = _(view.getDomStrings().taskProjectSelect).value;
        taskUser.push(_(view.getDomStrings().taskUsers).classList[2]); 

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
        //Checking the whether all the values aren't empty
        if(taskName != "" && taskLastDate != "" && taskUser != "" && projectId != ""){
            let flag = false;
            let userId = _(view.getDomStrings().taskUsers).classList[2];
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "http://10.52.0.190:8050/ProApp/user/getusers?id=all");
            xhr.send();
            xhr.onload = function(){
                //Doing everything inside onload function because of asynchronous problem.
                let userData = JSON.parse(xhr.response);
                for(let i = 0;i < userData.length;i++){
                    if(userData[i].uid == userId){
                        flag = true;
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

        //This is for adding listener to people searching input in task adding section
        _(view.getDomStrings().taskUsers).addEventListener("input", function(event){
            normalClickAudio();
            let tempClass = _(view.getDomStrings().taskUsers).classList;
            if(tempClass.length > 2){
                _(view.getDomStrings().taskUsers).classList.remove(tempClass[2]);
            }
            getUsersForTasks(event.target.value.trim().toLowerCase());
        });
        //This is for task adding button
        _(view.getDomStrings().taskButton).addEventListener("click", addTask);

        //This is for side navbar and bottom mobile view task button
        _All(view.getDomStrings().taskNavbarButton).forEach(function(elem){
            elem.addEventListener("click", function(){
                normalClickAudio();
                _(view.getDomStrings().mainTaskSection).classList.add(view.getDomStrings().showMainSection.slice(1));
                _(ProjectView.getDomStrings().mainProjectSection).classList.remove(view.getDomStrings().showMainSection.slice(1));
            });
        });

        //This is for new button in task section 
        _(view.getDomStrings().addNewTaskButton).addEventListener("click", function(){
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
        _(view.getDomStrings().taskOverViewCloseButton).addEventListener("click", function(){
            normalClickAudio();
            _(view.getDomStrings().fullTaskOverview).removeAttribute("id");
            _(view.getDomStrings().fullTaskOverview).classList.remove(view.getDomStrings().showTaskOverview);
        });

        //This is for task  overview closing button
        _(view.getDomStrings().overViewExitButton).addEventListener("click", function(){
            if(USERID == _(view.getDomStrings().taskOverViewCreatedBy).id){
                console.log("Remove project");
                removeProject(_(view.getDomStrings().fullTaskOverview).id);
            }
            else {
                console.log("Exit from project");
                exitFromProject(_(view.getDomStrings().fullTaskOverview).id);
            }
        });
    }
    init();

    return {
        addTask : addTask,
    }
})(TaskView, TaskModel);