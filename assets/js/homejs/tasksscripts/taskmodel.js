let TaskModel = (function(){

    let tasksArray = [];

    let addTask = function(task){
        tasksArray.push(task);
    }
    let Task = function(taskId, taskName, taskDescription, fromDate, toDate, projectId, users, createdBy){
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.status = "Yet to start";
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.projectId = projectId;
        this.users = users;
        this.createdBy = createdBy;
    }
    let changeServerObject = function(serverObject){
        console.log(serverObject.tid, serverObject.tname, serverObject.description, serverObject.fromDate, serverObject.toDate, serverObject.projectId, serverObject.users, serverObject.createdBy);
        return new Task(serverObject.tid, serverObject.tname, serverObject.description, serverObject.fromDate, serverObject.toDate, serverObject.projectId, serverObject.users, serverObject.createdBy);
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
            console.log(serverObject);
            let task =  changeServerObject(serverObject);
            console.log(task);
            addTask(task);
            TaskView.renderTasks(getTasks());
        }
    }
    let removeTask = function(id){
        tasksArray.splice(getIndexOfTask(id), 1);
    }
    return {
        addTask : addTask,
        createTask : createTask,
        getTasks : getTasks,
        changeServerObject : changeServerObject,
        getIndexOfTask : getIndexOfTask,
        removeTask : removeTask
    }
})();