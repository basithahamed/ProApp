let userObj = {
    userId : USERID,
    userName : USERNAME
}
let webConnection = new WebSocket("ws://192.168.103.32:8050/ProApp/proapp?data=vicky");
webConnection.onopen = function(event){
    console.log(event.log);
}
webConnection.onmessage = function(event){
    console.log(event.data);
}