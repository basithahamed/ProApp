let AddProjectView = (function(){

    let domStrings = {
        projectNameInput : ".project-heading-input",
        projectDescInput : ".project-desc-input",
        projectPeople : ".project-people-adding-input",
        projectToDate : "#date-input-id",
        projectFromDate : "#from-date-input-id"
    }

    let getDomStrings = function(){
        return domStrings;
    }

    return {
        getDomStrings : getDomStrings
    }
})();