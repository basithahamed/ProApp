let userObj = {
    userId : USERID,
    userName : USERNAME
}
let webConnection = new WebSocket("ws://10.52.0.190:8050/ProApp/proapp?data=todoadmins");
webConnection.onopen = function(event){
    console.log(event.log);
}
webConnection.onmessage = function(event){
    console.log(event.data);
}