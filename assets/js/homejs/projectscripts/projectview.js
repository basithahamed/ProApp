let ProjectView = (function(){

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
        projectPeopleAddingInput : ".project-people-adding-input",
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
        fullProjectOverView : ".project-overview"
    }
    let getDomStrings = function(){
        return domStrings;
    }
    //This function is to render all search results of users
    let renderPeopleSearchResult = function(userDetails, typedText){
        _(domStrings.projectPeopleUl).innerHTML = "";
        userDetails.forEach(function(elem){
            if(elem.userName.toLowerCase().startsWith(typedText) && typedText != ""){
                //Creating elements here
                let li = document.createElement("li");
                let div = document.createElement("div");
                let p = document.createElement("p");

                li.id = elem.uid;
                //Adding listeners to the created li tag
                li.addEventListener("click", function(event){
                    if(_(domStrings.projectPeopleAddingInput).classList.length > 2){
                        _(domStrings.projectPeopleAddingInput).classList.remove(document.querySelector(domStrings.projectPeopleAddingInput).classList[2]);
                    }
                    if(event.target.tagName == "LI"){
                        _(domStrings.projectPeopleAddingInput).classList.add(event.target.id);
                        _(domStrings.projectPeopleAddingInput).value = event.target.children[1].innerText;
                    }
                    else if (event.target.tagName == "P") {
                        _(domStrings.projectPeopleAddingInput).classList.add(event.target.parentElement.id);
                        _(domStrings.projectPeopleAddingInput).value = event.target.innerText;
                    }
                    else if (event.target.tagName == "DIV"){
                        _(domStrings.projectPeopleAddingInput).classList.add(event.target.parentElement.id);
                        _(domStrings.projectPeopleAddingInput).value = event.target.nextElementSibling.innerText;
                    }
                    _(domStrings.projectPeopleUl).innerHTML = "";
                });
                li.classList.add(domStrings.projectUserSeachLi);
                li.classList.add("x-axis-flex");
                p.textContent = elem.userName;
                div.classList.add(domStrings.projectUserSeachPhoto.slice(1));
                li.append(div, p);
                _(domStrings.projectPeopleUl).append(li);
            }
        });
    }
    //This is to set name of the created user in overview section
    let getUserById = function(id, createdByElement){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "user/getusers?id=" + id);
        xhr.send();
        xhr.onload = function(){
            createdByElement.innerText = JSON.parse(xhr.response).userName;
        }
    }
    //To render people in the project
    let renderProjectParticipants = function(users){
        //Reseting users ul
        _(domStrings.overViewUl).innerHTML = "";

        users.forEach(function(elem){
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
            divTag.style.backgroundImage = "url(assets/images/user.png)";
            paraTag.textContent = elem.userName;

            //Inserting elements
            liTag.append(divTag, paraTag);
            _(domStrings.overViewUl).append(liTag);
        });
    }
    //This is for setting details of the clicked project for the overview
    let setOverViewValues = function(projectId){
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
    let showFullProject = function(event){
        normalClickAudio();
        if(event.target.tagName == "SECTION"){
            console.log("first if");
            setOverViewValues(event.target.classList[2]);
            _(domStrings.fullProjectOverview).classList.add(domStrings.showProjectOverview);

        }
        else if (event.target.parentElement.tagName == "SECTION"){
            console.log("second if");
            setOverViewValues(event.target.parentElement.classList[2]);
            _(domStrings.fullProjectOverview).classList.add(domStrings.showProjectOverview);
        }
        else if (event.target.parentElement.parentElement.tagName == "SECTION"){
            console.log("third if");
            setOverViewValues(event.target.parentElement.parentElement.classList[2]);
            _(domStrings.fullProjectOverview).classList.add(domStrings.showProjectOverview);
        }
        else {
            console.log("Problem");
        }
    }
    let renderProjects = function(projects){
        //Reseting all projects
        _(domStrings.fullProjectSection).innerHTML = "";
        projects.forEach(function(elem){
            //Creating elements for a project section starts here 
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
            //Creating elements for a project section ends here 

            //Adding classes to the elements starts here
            mainSection.classList.add(domStrings.singleProjectSection.slice(1));
            mainSection.classList.add("y-axis-flex");
            mainSection.classList.add(elem.id);

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
            percentageValue.textContent = "27%";
            projectPercentage.style.width = "27%";
            projectStatusValue.textContent = elem.status;
            //Setting values to the elements ends here 

            //Adding elements to its parent element starts here 
            percentageWrapper.append(projectPercentage, percentageValue);
            projectDateWrapper.append(projectDateHead, projectDataValue);
            projectStatusWrapper.append(projectStatusHead, projectStatusValue);

            mainSection.append(projectHeading, projectDescription, percentageWrapper, projectDateWrapper, projectStatusWrapper);
            mainSection.addEventListener("click", showFullProject);
            //Adding elements to its parent element ends here 

            _(domStrings.fullProjectSection).append(mainSection);
        });  

    }
    return {
        getDomStrings : getDomStrings,
        renderProjects : renderProjects,
        renderPeopleSearchResult : renderPeopleSearchResult
    }
})();