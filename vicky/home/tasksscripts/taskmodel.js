let TaskModel = (function(){

    let tasksArray = [];

    let addTask = function(task){
        tasksArray.push(task);
    }
    let Task = function(taskId, taskName, taskDescription, fromDate, toDate, projectId, users){
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.status = "Yet to start";
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.projectId = projectId;
        this.users = users
    }
    let changeServerObject = function(serverObject){
        console.log(serverObject.tid, serverObject.tname, serverObject.description, serverObject.fromDate, serverObject.toDate, serverObject.projectId, serverObject.users);
        return new Task(serverObject.tid, serverObject.tname, serverObject.description, serverObject.fromDate, serverObject.toDate, serverObject.projectId, serverObject.users);
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
            users : taskData.users
        }
        formData.append("taskData", JSON.stringify(tempObj));
        
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8787/ProAppBackup/task/add");
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
    return {
        addTask : addTask,
        createTask : createTask,
        getTasks : getTasks
    }
})();