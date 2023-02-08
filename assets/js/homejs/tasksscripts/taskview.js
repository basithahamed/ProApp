let TaskView = (function(){

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
        taskUsers : "#search-member-task-input-id",
        taskUsersUl : ".people-task-search-ul",
        taskButton : ".add-task-button",
        taskProjectSelect : ".project-choosing-select",
        taskProjectSelectOption : ".project-choosing-option",
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
        commonStatus : "common-status"
    }

    let renderPeopleSearchResult = function(userDetails, typedText){
        _(domStrings.taskUsersUl).innerHTML = "";
        userDetails.forEach(function(elem){
            if(elem.userName.toLowerCase().startsWith(typedText) && typedText != ""){
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
                li.append(div, p);
                _(domStrings.taskUsersUl).append(li);
            }
        });
    }
    //This function is to render project options
    let renderProjectOption = function(){
        //Reseting the select tag 
        _(domStrings.taskProjectSelect).innerHTML = "";
        console.log("Projects while rendering project option = " + ProjectModel.getProjectsArray());
        let projects = ProjectModel.getProjectsArray();
        //Looping through all availbale projects 
        projects.forEach(function(elem){
            let optionTag = document.createElement("option");
            optionTag.value = elem.id;
            optionTag.textContent = elem.projectName;

            optionTag.classList.add(domStrings.taskProjectSelectOption.slice(1));

            _(domStrings.taskProjectSelect).append(optionTag);
        });
    }

    let renderTasks = function(tasks){
        //Reseting all tasks
        _(domStrings.fullTaskSection).innerHTML = "";
        tasks.forEach(function(elem){
            //Creating elements for a task section starts here 
            let mainSection = document.createElement("section");
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
            //Creating elements for a task section ends here 

            //Adding classes to the elements starts here
            mainSection.classList.add(domStrings.singleTaskSection);
            mainSection.classList.add("y-axis-flex");

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
            //Adding classes to the elements ends here 

            //Setting values to the elements starts here 
            projectHeading.textContent = elem.taskName;
            projectDescription.textContent = elem.taskDescription;
            projectDataValue.textContent = elem.toDate;
            percentageValue.textContent = "27%";
            projectPercentage.style.width = "27%";
            projectStatusValue.textContent = elem.status;
            //Setting values to the elements ends here 

            //Adding elements to its parent element starts here 
            percentageWrapper.append(projectPercentage, percentageValue);
            projectDateWrapper.append(projectDateHead, projectDataValue);
            projectStatusWrapper.append(projectStatusHead, projectStatusValue);

            mainSection.append(projectHeading, projectDescription, percentageWrapper, projectDateWrapper, projectStatusWrapper);
            //Adding elements to its parent element ends here 

            _(domStrings.fullTaskSection).append(mainSection);
        });
    }
    let getDomStrings = function(){
        return domStrings;
    }

    return {
        getDomStrings : getDomStrings,
        renderPeopleSearchResult : renderPeopleSearchResult,
        renderProjectOption : renderProjectOption,
        renderTasks : renderTasks
    }
})();