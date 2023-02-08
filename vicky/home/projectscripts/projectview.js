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
        showProjectOverview : "show-project-overview"
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
    let showFullProject = function(event){
        console.log(event.target.tagName);
        if(event.target.tagName == "SECTION"){
            console.log("first if");
            _(domStrings.fullProjectOverview).classList.add(domStrings.showProjectOverview);
        }
        else if (event.target.parentElement.tagName == "SECTION"){
            console.log("second if");
            _(domStrings.fullProjectOverview).classList.add(domStrings.showProjectOverview);
        }
        else if (event.target.parentElement.parentElement.tagName == "SECTION"){
            console.log("third if");
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