let ProjectSubView = (() => {

    let domStrings = {
        activeProjectsButton : ".active-project-button",
        mineProjectButton : ".mine-project-button",
        allProjectButton : ".all-project-button"
    }
    //This is to render active projects 
    let renderActiveProjects = projectsArray => {
        let activeProjects = [];
        projectsArray.forEach(elem => {
            if(elem.status == "Yet to start"){
                activeProjects.push(elem);
            }
        });
        ProjectView.renderProjects(activeProjects);
    }
    //This is to render projects that the current user participated
    let renderMineProjects = projectArray => {
        let mineProjects = [];
        projectArray.forEach(elem => {
            if(elem.createdBy == USERID){
                mineProjects.push(elem);
            }
        });
        ProjectView.renderProjects(mineProjects);
    }
    let getDomStrings = () => domStrings;
    
    return {
        getDomStrings : getDomStrings,
        renderActiveProjects : renderActiveProjects,
        renderMineProjects : renderMineProjects
    }
})();