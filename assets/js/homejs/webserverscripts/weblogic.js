let userObj = {
    userId : USERID,
    userName : USERNAME
}
let webConnection = new WebSocket("ws://localhost:8787/ProApp/proapp?data=vicky");
webConnection.onopen = function(event){
    console.log(event.log);
}
webConnection.onmessage = function(event){
    console.log(event.data);
}