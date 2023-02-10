let TaskModel = (function(){

    let tasksArray = [];

    let addTask = function(task){
        tasksArray.push(task);
    }
    let Task = function(taskId, taskName, taskDescription, fromDate, toDate, projectId, users, createdBy, status){
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.status = status;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.projectId = projectId;
        this.users = users;
        this.createdBy = createdBy;
    }
    let changeServerObject = function(serverObject, isStatusAvailable){
        if(isStatusAvailable){
            return new Task(serverObject.tid, serverObject.tname, serverObject.description, serverObject.fromDate, serverObject.toDate, serverObject.projectId, serverObject.users, serverObject.createdBy, serverObject.status);
        }
        else {
            return new Task(serverObject.tid, serverObject.tname, serverObject.description, serverObject.fromDate, serverObject.toDate, serverObject.projectId, serverObject.users, serverObject.createdBy, "Yet to start");
        }
        
    }
    let getIndexOfTask = function(id){
        return tasksArray.findIndex(function(elem){
            return elem.taskId == id;
        });
    }
    let getTasks = function(){
        return tasksArray.slice();
    }
    let createTask = function(taskData){

        let formData = new FormData();
        let tempObj = {
            taskName : taskData.taskName,
            description : taskData.taskDescription,
            fromDate : taskData.fromDate,
            toDate : taskData.toDate,
            projectId : taskData.projectId,
            users : taskData.users,
            createdBy : USERID
        }
        formData.append("taskData", JSON.stringify(tempObj));
        
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/ProApp/task/add");
        xhr.send(formData);
        xhr.onload = function(){
            let serverObject = JSON.parse(xhr.response);
            let task =  changeServerObject(serverObject);
            addTask(task);
            TaskView.renderTasks(getTasks());
        }
    }
    let removeTask = function(id){
        tasksArray.splice(getIndexOfTask(id), 1);
    }
    //First time trying arrow function for reseting all tasks.
    let resetTasks = () => {
        tasksArray = []; 
    }
    return {
        addTask : addTask,
        createTask : createTask,
        getTasks : getTasks,
        changeServerObject : changeServerObject,
        getIndexOfTask : getIndexOfTask,
        removeTask : removeTask,
        resetTasks : resetTasks
    }
})();