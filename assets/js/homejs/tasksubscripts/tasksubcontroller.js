let TaskSubController = (function(view){

    let init = function(){
        //This is for active button of Task section
        _(view.getDomStrings().activeTaskButton).addEventListener("click", function(){
            view.renderActiveTasks(TaskModel.getTasks());
        });
        //This is for mine button of task section
        _(view.getDomStrings().mineTaskButton).addEventListener("click", function(){
            view.renderMineTasks(TaskModel.getTasks());
        });
        //This event is for all tasks button in the nav bar
        _(view.getDomStrings().allTaskButton).addEventListener("click", function(){
            TaskView.renderTasks(TaskModel.getTasks());
        });
    }
    init();
})(TaskSubView);