let ProjectView = (() => {

    let domStrings = {
        mainProjectSection : ".project-section",
        projectNavbarButton : ".projects-button-ul",
        fullProjectAndTaskSection : ".full-project-adding-section",
        showMainSection : ".show-main-section",
        fullProjectSection : ".all-projects-section",
        showNewProjectSection : "show-add-project-section",
        newProjectButton : ".add-new-project-button",
        addProjectCloseIcon : ".project-adding-close-button",
        singleProjectSection : ".single-project-section",
        projectName : ".project-name",
        projectNameId : "#project-name-input-id",
        projectDescriptionInput : ".project-desc-input",
        projectDescription : ".project-description",
        projectFromDate : "#from-date-input-id",
        projectLastDate : "#date-input-id",
        projectPercentageWrapper : ".percentage-wrapper",
        projectPeopleAddingButton : ".choose-people-button",
        peopleAddingSection : ".people-selecting-checkboxes-wrapper",
        peopleOptionsWrapper : ".people-options-wrapper",
        peopleAddingLabel : ".people-option-label",
        smallRoundIcon : ".small-round-icon",
        showPeopleAddingSection : "show-people-choosing-section",
        peopleAddingDoneButton : ".done-people-add-button",
        projectPercentage : ".project-percentage",
        projectPercentageValue : ".percentage-value",
        projectDateWrapper : ".projects-date-wrapper",
        projectDateCommonClass : ".common-status",
        projectStatusWrapper : ".projects-status-wrapper",
        projectAddingSection : ".project-adding-section",
        showTaskSectionButton : ".show-add-task-button",
        showTaskSection: "show-task-section",
        taskSection : ".task-adding-section",
        taskAddingSectionCloseButton : ".task-adding-close-button",
        taskAddingButton : ".add-task-button",
        projectAddingButton : ".create-project-button",
        projectPeopleUl : ".people-search-ul",
        projectUserSeachPhoto : ".user-search-image",
        projectUserSeachLi : "user-search-result-li",
        fullProjectOverview : ".project-overview-outer-layer",
        projectOverViewCloseButton : ".project-overview-close-button",
        showProjectOverview : "show-project-overview",
        showInnerOverview : "show-inner-over-view",
        projectOverViewCreatedBy : ".created-by-value",
        overViewName : ".project-overview-name",
        overViewDesc : ".project-overview-description",
        overViewFromDate : ".project-from-date",
        overViewToDate : ".project-deadline-date",
        overViewLi : "project-overview-user-li",
        overViewUl : ".project-overview-users-ul",
        overViewUserImage : "project-overview-user-image",
        overViewUserName : "project-overview-user-name",
        overViewExitButton : ".exit-project-button",
        fullProjectOverView : ".project-overview",
        showCompletedDiv : "show-completed-div",
        nonCompletedDiv : "non-completed-task"
    }
    let getDomStrings = () => domStrings;
    
    //This is to set name of the created user in overview section
    let getUserById = (id, createdByElement) => {
        sendGetRequest("user/getusers?id=" + id, function(){
            createdByElement.innerText = JSON.parse(this.response).userName;
        });
    }
    //To render people in the project
    let renderProjectParticipants = users => {
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
    //This is for setting details of the clicked project for the overview
    let setOverViewValues = projectId => {
        //get project by id here
        let project = ProjectModel.getProjectsArray()[ProjectModel.getIndexOfProject(projectId)];
        _(domStrings.overViewName).innerText = project.projectName;
        _(domStrings.overViewDesc).innerText = project.projectDesc;
        _(domStrings.overViewFromDate).innerText = project.fromDate;
        _(domStrings.overViewToDate).innerText = project.toDate;
        _(domStrings.projectOverViewCreatedBy).id = project.createdBy;
        _(domStrings.fullProjectOverView).id = projectId;

        renderProjectParticipants(project.users);

        //This condition is for changing the text in exit button based on createdBy
        if(project.createdBy == USERID){
            _(domStrings.overViewExitButton).innerText = "Delete";
        }
        else {
            _(domStrings.overViewExitButton).innerText = "Exit";
        }
        
        getUserById(project.createdBy, _(domStrings.projectOverViewCreatedBy));
    }
    //This is for showing the full project when we clicked a project
    let showFullProject = event => {
        normalClickAudio();
        if(event.target.tagName == "SECTION" && event.target.classList.contains(domStrings.singleProjectSection.slice(1))){
            setOverViewValues(event.target.classList[2].slice(7));
            _(domStrings.fullProjectOverview).classList.add(domStrings.showProjectOverview);
            console.log()
        }
        else if (event.target.parentElement.tagName == "SECTION" && event.target.parentElement.classList.contains(domStrings.singleProjectSection.slice(1))){
            console.log("second if");
            setOverViewValues(event.target.parentElement.classList[2].slice(7));
            _(domStrings.fullProjectOverview).classList.add(domStrings.showProjectOverview);
        }
        else if (event.target.parentElement.parentElement.tagName == "SECTION" && event.target.parentElement.parentElement.classList.contains(domStrings.singleProjectSection.slice(1))){
            console.log("third if");
            setOverViewValues(event.target.parentElement.parentElement.classList[2].slice(7));
            _(domStrings.fullProjectOverview).classList.add(domStrings.showProjectOverview);
        }
        else if (event.target.parentElement.parentElement.parentElement.tagName == "SECTION" && event.target.parentElement.parentElement.parentElement.classList.contains(domStrings.singleProjectSection.slice(1))){
            console.log("third if");
            setOverViewValues(event.target.parentElement.parentElement.parentElement.classList[2].slice(7));
            _(domStrings.fullProjectOverview).classList.add(domStrings.showProjectOverview);
        }
        else {
            console.log("Problem");
        }
    }
    //Rendering all projects 
    let renderProjects = projects => {
        //Reseting all projects
        _(domStrings.fullProjectSection).innerHTML = "";
        if(projects.length){
            projects.forEach(elem => {
                //Creating elements for a project section starts here 
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
                //Creating elements for a project section ends here 
    
                //Adding classes to the elements starts here
                mainSection.classList.add(domStrings.singleProjectSection.slice(1));
                mainSection.classList.add("y-axis-flex");
                mainSection.classList.add("project" + elem.id);

                nonCompletedDiv.classList.add(domStrings.nonCompletedDiv);
                nonCompletedDiv.classList.add("y-axis-flex");
    
                projectHeading.classList.add(domStrings.projectName.slice(1));
                projectDescription.classList.add(domStrings.projectDescription.slice(1));
    
                percentageWrapper.classList.add(domStrings.projectPercentageWrapper.slice(1));
                projectPercentage.classList.add(domStrings.projectPercentage.slice(1));
                percentageValue.classList.add(domStrings.projectPercentageValue.slice(1));
    
                projectDateWrapper.classList.add(domStrings.projectDateWrapper.slice(1));
                projectDateWrapper.classList.add("x-axis-flex");
                projectDateHead.textContent = "Date ";
                projectDataValue.classList.add(domStrings.projectDateCommonClass.slice(1));
    
                projectStatusWrapper.classList.add(domStrings.projectStatusWrapper.slice(1));
                projectStatusWrapper.classList.add("x-axis-flex");
                projectStatusHead.textContent = "Status";

                //Adding classes to the elements ends here 
    
                //Setting values to the elements starts here 
                projectHeading.textContent = elem.projectName;
                projectDescription.textContent = elem.projectDesc;
                projectDataValue.textContent = elem.toDate;
                percentageValue.textContent = elem.percentage;
                projectPercentage.style.width = elem.percentage + "%";
                projectStatusValue.textContent = elem.status;
                //Setting values to the elements ends here 
    
                //Adding elements to its parent element starts here 
                percentageWrapper.append(projectPercentage, percentageValue);
                projectDateWrapper.append(projectDateHead, projectDataValue);
                projectStatusWrapper.append(projectStatusHead, projectStatusValue);
                
                nonCompletedDiv.append(projectHeading, projectDescription, percentageWrapper, projectDateWrapper, projectStatusWrapper);
                mainSection.append(nonCompletedDiv, getCompletedDiv(elem.id, projectHeading.cloneNode(true), true));
                mainSection.addEventListener("click", showFullProject);

                //This if condition is for making elements rotate  if they are completed.
                console.log(elem.status);
                if(elem.status == "Completed"){
                    mainSection.classList.add(domStrings.showCompletedDiv);
                }
                
                //Adding elements to its parent element ends here 
    
                _(domStrings.fullProjectSection).append(mainSection);
            });
        } 
        else {
            let h1Tag = document.createElement("h1");
            h1Tag.textContent = "You have no Projects";
            h1Tag.classList.add("nothing-heading");
            _(domStrings.fullProjectSection).append(h1Tag);
        }
    }
    return {
        getDomStrings : getDomStrings,
        renderProjects : renderProjects,
        getUserById : getUserById
    }
})();