let TaskView = (() => {

    let domStrings = {
        taskNavbarButton : ".task-button-ul",
        addNewTaskButton : ".add-new-task-button",
        showTaskSection: "show-task-section",
        mainTaskSection : ".task-section",
        showMainSection : ".show-main-section",
        taskSection : ".task-adding-section",
        taskNameInput : "#task-name-input-id",
        taskDescInput : ".task-desc-input",
        taskFromDate : "#from-task-input-date-id",
        taskToDate : "#to-task-input-date-id",
        taskButton : ".add-task-button",
        taskProjectSelect : ".project-choosing-select",
        taskProjectSelectOption : ".project-choosing-option",
        taskPeopleSelectingFullWrapper : ".task-people-selecting-checkboxes-wrapper",
        taskPeopleOptionWrapper : ".task-people-options-wrapper",
        taskPeopleAddingSectionButton : ".choose-task-people-button",
        showPeopleAddingSection : "show-people-choosing-section",
        peopleAddingDoneButton : ".task-done-people-add-button",
        fullTaskSection : ".all-tasks-section",
        taskNameTag : "task-name",
        singleTaskSection : "single-task-section",
        taskDescTag : "task-description",
        taskDateWrapper : "task-date-wrapper",
        percentageWrapper : "percentage-wrapper",
        taskDueDate : "task-due-data",
        taskPercentage : "task-percentage",
        taskPercentageValue : "task-percentage-value",
        taskStatusWrapper : "task-status-wrapper",
        commonStatus : "common-status",
        fullTaskOverview : ".task-overview-outer-layer",
        showTaskOverview : "show-task-overview",
        taskOverViewCloseButton : ".task-overview-close-button",
        overViewLi : "task-overview-user-li",
        overViewUserName : "task-overview-user-name",
        overViewName : ".task-overview-name",
        overViewDesc : ".task-overview-description",
        overViewFromDate : ".task-from-date",
        overViewToDate : ".task-deadline-date",
        taskOverViewCreatedBy : ".task-created-by-value",
        overViewUl : ".task-overview-users-ul",
        overViewExitButton : ".exit-task-button",
        overViewUserImage : "task-overview-user-image",
        completeStatusButton : "complete-task-button",
        showCompletedDiv : "show-completed-div",
        nonCompletedDiv : "non-completed-task",
        changeToIncomplete : ".change-to-not-complete-button"
    }

    let renderPeopleSearchResult = (userDetails, typedText) => {
        _(domStrings.taskUsersUl).innerHTML = "";
        userDetails.forEach(elem => {
            if(elem.userName.toLowerCase().startsWith(typedText) && typedText != "" && elem.uid != USERID){
                //Creating elements here
                let li = document.createElement("li");
                let div = document.createElement("div");
                let p = document.createElement("p");

                li.id = elem.uid;
                //Adding listeners to the created li tag
                li.addEventListener("click", function(event){
                    if(_(domStrings.taskUsers).classList.length > 2){
                        _(domStrings.taskUsers).classList.remove(document.querySelector(domStrings.taskUsers).classList[2]);
                    }
                    if(event.target.tagName == "LI"){
                        _(domStrings.taskUsers).classList.add(event.target.id);
                        _(domStrings.taskUsers).value = event.target.children[1].innerText;
                    }
                    else if (event.target.tagName == "P") {
                        _(domStrings.taskUsers).classList.add(event.target.parentElement.id);
                        _(domStrings.taskUsers).value = event.target.innerText;
                    }
                    else if (event.target.tagName == "DIV"){
                        _(domStrings.taskUsers).classList.add(event.target.parentElement.id);
                        _(domStrings.taskUsers).value = event.target.nextElementSibling.innerText;
                    }
                    _(domStrings.taskUsersUl).innerHTML = "";
                });
                li.classList.add(ProjectView.getDomStrings().projectUserSeachLi);
                li.classList.add("x-axis-flex");
                p.textContent = elem.userName;
                div.classList.add(ProjectView.getDomStrings().projectUserSeachPhoto.slice(1));
                div.style.width = `url(/ProApp/assets/images/usersImages/${elem.imagePath})`;
                li.append(div, p);
                _(domStrings.taskUsersUl).append(li);
            }
        });
    }
    //To render people in the task
    let renderTaskParticipants = users => {
        //Reseting users ul
        _(domStrings.overViewUl).innerHTML = "";

        users.forEach(elem => {
            //Creating elements for users list
            let liTag = document.createElement("li");
            let divTag = document.createElement("div");
            let paraTag = document.createElement("p");

            //Adding classes to elements
            liTag.classList.add(domStrings.overViewLi);
            liTag.classList.add("x-axis-flex");
            liTag.classList.add(elem.userId);

            divTag.classList.add(domStrings.overViewUserImage);
            paraTag.classList.add(domStrings.overViewUserName);

            //Adding content to the elements
            divTag.style.backgroundImage = `url(/ProApp/assets/images/usersImages/${elem.imagePath})`;
            paraTag.textContent = elem.userName;

            //Inserting elements
            liTag.append(divTag, paraTag);
            _(domStrings.overViewUl).append(liTag);
        });
    }
    //Setting values in Task overview section 
    let setOverViewValues = taskId => {
        console.log("Task id = " + taskId);
        //get project by id here
        let task = TaskModel.getTasks()[TaskModel.getIndexOfTask(taskId)];
        console.log("Task = " + task);
        _(domStrings.overViewName).innerText = task.taskName;
        _(domStrings.overViewDesc).innerText = task.taskDescription;
        _(domStrings.overViewFromDate).innerText = task.fromDate;
        _(domStrings.overViewToDate).innerText = task.toDate;
        _(domStrings.taskOverViewCreatedBy).id = task.createdBy;
        _(domStrings.fullTaskOverview).id = taskId;

        renderTaskParticipants(task.users);

        //This condition is for changing the text in exit button based on createdBy
        if(task.createdBy == USERID){
            _(domStrings.overViewExitButton).innerText = "Delete";
        }
        else {
            _(domStrings.overViewExitButton).innerText = "Exit";
        }
        console.log(task.createdBy);
        ProjectView.getUserById(task.createdBy, _(domStrings.taskOverViewCreatedBy));
    }
    //This is for showing the full project when we clicked a tasks
    let showFullTask = event => {
        normalClickAudio();
        if(event.target.tagName == "SECTION"){
            setOverViewValues(event.target.classList[2].slice(4));
            _(domStrings.fullTaskOverview).classList.add(domStrings.showTaskOverview);

        }
        else if (event.target.parentElement.tagName == "SECTION"){
            console.log("second if");
            setOverViewValues(event.target.parentElement.classList[2].slice(4));
            _(domStrings.fullTaskOverview).classList.add(domStrings.showTaskOverview);
        }
        else if (event.target.parentElement.parentElement.tagName == "SECTION"){
            console.log("third if");
            setOverViewValues(event.target.parentElement.parentElement.classList[2].slice(4));
            _(domStrings.fullTaskOverview).classList.add(domStrings.showTaskOverview);
        }
        else if (event.target.parentElement.parentElement.parentElement.tagName == "SECTION"){
            console.log("fourth if");
            setOverViewValues(event.target.parentElement.parentElement.parentElement.classList[2].slice(4));
            _(domStrings.fullTaskOverview).classList.add(domStrings.showTaskOverview);
        }
        else {
            console.log("Problem");
        }
    }
    //This function is to render project options
    let renderProjectOption = () => {
        //Reseting the select tag 
        _(domStrings.taskProjectSelect).innerHTML = "";
        let projects = ProjectModel.getProjectsArray();
        //Looping through all availbale projects 
        projects.forEach(elem => {
            let optionTag = document.createElement("option");
            optionTag.value = elem.id;
            optionTag.textContent = elem.projectName;

            optionTag.classList.add(domStrings.taskProjectSelectOption.slice(1));

            _(domStrings.taskProjectSelect).append(optionTag);
        });
    }

    let completeTask = event => {
        event.stopImmediatePropagation();
        // event.target.parentElement.parentElement.classList.add(domStrings.showCompletedDiv);
        TaskController.changeTaskStatus(event.target.parentElement.parentElement.classList[2].slice(4));
    }

    let renderTasks = tasks => {
        //Reseting all tasks
        _(domStrings.fullTaskSection).innerHTML = "";
        if(tasks.length){
            tasks.forEach(elem => {
                //Creating elements for a task section starts here 
                let mainSection = document.createElement("section");
                let nonCompletedDiv = document.createElement("div");
                let projectHeading = document.createElement("h1");
                let projectDescription = document.createElement("p");
                let percentageWrapper = document.createElement("div");
                let projectPercentage = document.createElement("div");
                let percentageValue = document.createElement("span");
                let projectDateWrapper = document.createElement("div");
                let projectDateHead = document.createElement("p");
                let projectDataValue = document.createElement("p");
                let projectStatusWrapper = document.createElement("div");
                let projectStatusHead = document.createElement("p");
                let projectStatusValue = document.createElement("span");
                let completeStatusButton = document.createElement("button");
                //Creating elements for a task section ends here 
    
                //Adding classes to the elements starts here
                mainSection.classList.add(domStrings.singleTaskSection);
                mainSection.classList.add("y-axis-flex");
                mainSection.classList.add("task" + elem.taskId);

                nonCompletedDiv.classList.add(domStrings.nonCompletedDiv);
                nonCompletedDiv.classList.add("y-axis-flex");
    
                projectHeading.classList.add(domStrings.taskNameTag);
                projectDescription.classList.add(domStrings.taskDescTag);
    
                percentageWrapper.classList.add(domStrings.percentageWrapper);
                projectPercentage.classList.add(domStrings.taskPercentage);
                percentageValue.classList.add(domStrings.taskPercentageValue);
    
                projectDateWrapper.classList.add(domStrings.taskDateWrapper);
                projectDateWrapper.classList.add("x-axis-flex");
                projectDateHead.textContent = "Date ";
                projectDataValue.classList.add(domStrings.commonStatus);
    
                projectStatusWrapper.classList.add(domStrings.taskStatusWrapper);
                projectStatusWrapper.classList.add("x-axis-flex");
                projectStatusHead.textContent = "Status";

                completeStatusButton.classList.add(domStrings.completeStatusButton);
                //Adding classes to the elements ends here 
    
                //Setting values to the elements starts here 
                projectHeading.textContent = elem.taskName;
                projectDescription.textContent = elem.taskDescription;
                projectDataValue.textContent = elem.toDate;
                percentageValue.textContent = elem.percentage;
                projectPercentage.style.width = elem.percentage + "%";
                projectStatusValue.textContent = elem.status;
                completeStatusButton.textContent = "Complete";
                //Setting values to the elements ends here 
    
                //Adding elements to its parent element starts here 
                percentageWrapper.append(projectPercentage, percentageValue);
                projectDateWrapper.append(projectDateHead, projectDataValue);
                projectStatusWrapper.append(projectStatusHead, projectStatusValue);
    
                nonCompletedDiv.append(projectHeading, projectDescription, percentageWrapper, projectDateWrapper, projectStatusWrapper, completeStatusButton);
                mainSection.addEventListener("click", showFullTask);
                completeStatusButton.addEventListener("click", completeTask);

                mainSection.append(nonCompletedDiv, getCompletedDiv(elem.taskId));
                //Adding elements to its parent element ends here 

                //This if condition is for making elements rotate  if they are completed.
                if(elem.status == "Completed"){
                    mainSection.classList.add(domStrings.showCompletedDiv);
                }
                else if (elem.isCompleted) {
                    completeStatusButton.textContent = "Change";
                }
    
                _(domStrings.fullTaskSection).append(mainSection);
            });
        }
        else {
            let h1Tag = document.createElement("h1");
            h1Tag.textContent = "You don't have a task yet";
            h1Tag.classList.add("nothing-heading");
            _(domStrings.fullTaskSection).append(h1Tag);
        }
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings,
        renderPeopleSearchResult : renderPeopleSearchResult,
        renderProjectOption : renderProjectOption,
        renderTasks : renderTasks,
        completeTask : completeTask
    }
})();