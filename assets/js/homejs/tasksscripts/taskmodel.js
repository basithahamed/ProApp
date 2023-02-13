let TaskModel = (() => {

    let tasksArray = [];

    let addTask = task => tasksArray.push(task);

    let Task = function(taskId, taskName, taskDescription, fromDate, toDate, projectId, users, createdBy, status, percentage, isCompleted){
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.status = status;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.projectId = projectId;
        this.users = users;
        this.createdBy = createdBy;
        this.percentage = percentage;
        this.isCompleted = isCompleted;
    }
    let changeServerObject = function(serverObject, isStatusAvailable){
        if(isStatusAvailable){
            return new Task(serverObject.tid, serverObject.tname, serverObject.description, serverObject.fromDate, serverObject.toDate, serverObject.projectId, serverObject.users, serverObject.createdBy, serverObject.status, serverObject.percentage, serverObject.isCompleted);
        }
        else {
            return new Task(serverObject.tid, serverObject.tname, serverObject.description, serverObject.fromDate, serverObject.toDate, serverObject.projectId, serverObject.users, serverObject.createdBy, "Yet to start");
        }
        
    }
    let getIndexOfTask = id => {
        return tasksArray.findIndex(elem => {
            return elem.taskId == id;
        });
    }
    let getTasks = () => tasksArray.slice();
    
    let createTask = taskData => {

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
        xhr.onload = () => {
            let serverObject = JSON.parse(xhr.response);
            let task =  changeServerObject(serverObject);
            addTask(task);
            TaskView.renderTasks(getTasks());
        }
    }
    let removeTask = id => tasksArray.splice(getIndexOfTask(id), 1);

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