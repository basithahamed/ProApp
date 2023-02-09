let TaskSubView = (function(){

    let domStrings = {
        activeTaskButton : ".active-task-button",
        mineTaskButton : ".mine-task-button",
        allTaskButton : ".all-task-button"
    }
    let getDomStrings = function(){
        return domStrings;
    }
    //This is to render active tasks 
    let renderActiveTasks = function(tasksArray){
        let activeTasks = [];
        tasksArray.forEach(function(elem){
            if(elem.status == "Yet to start"){
                activeTasks.push(elem);
            }
        });
        console.log(activeTasks);
        TaskView.renderTasks(activeTasks);
    }
    //This is to render tasks that the current user participated
    let renderMineTasks = function(taksArray){
        let mineTasks = [];
        taksArray.forEach(function(elem){
            if(elem.createdBy == USERID){
                mineTasks.push(elem);
            }
        });
        console.log(mineTasks);
        TaskView.renderTasks(mineTasks);
    }
    return {
        getDomStrings : getDomStrings,
        renderActiveTasks : renderActiveTasks,
        renderMineTasks : renderMineTasks
    }
})();