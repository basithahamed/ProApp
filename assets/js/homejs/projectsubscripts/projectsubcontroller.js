let ProjectSubController = (function(view){

    let init = function(){
        //This event is for active projects button in the nav bar
        _(view.getDomStrings().activeProjectsButton).addEventListener("click", function(){
            view.renderActiveProjects(ProjectModel.getProjectsArray());
        });

        //This event is for all projects button in the nav bar
        _(view.getDomStrings().allProjectButton).addEventListener("click", function(){
            ProjectView.renderProjects(ProjectModel.getProjectsArray());
        });

        //This event is for mine projects button in the nav bar
        _(view.getDomStrings().mineProjectButton).addEventListener("click", function(){
            view.renderMineProjects(ProjectModel.getProjectsArray());
        });
    }

    init();

    return {
        init : init
    }
})(ProjectSubView);