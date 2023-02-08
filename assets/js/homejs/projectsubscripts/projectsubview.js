let ProjectSubView = (function(){

    let domStrings = {
        activeProjectsButton : ".active-project-button",
        mineProjectButton : ".mine-project-button",
        allProjectButton : ".all-project-button"
    }
    //This is to render active projects 
    let renderActiveProjects = function(projectsArray){
        let activeProjects = [];
        projectsArray.forEach(function(elem){
            if(elem.status == "Yet to start"){
                activeProjects.push(elem);
            }
        });
        console.log(activeProjects);
        ProjectView.renderProjects(activeProjects);
    }
    //This is to render projects that the current user participated
    let renderMineProjects = function(projectArray){
        let mineProjects = [];
        projectArray.forEach(function(elem){
            if(elem.id == USERID){
                mineProjects.push(elem);
            }
        });
        console.log(mineProjects);
        ProjectView.renderProjects(mineProjects);
    }
    let getDomStrings = function(){
        return domStrings;
    }
    return {
        getDomStrings : getDomStrings,
        renderActiveProjects : renderActiveProjects,
        renderMineProjects : renderMineProjects
    }
})();