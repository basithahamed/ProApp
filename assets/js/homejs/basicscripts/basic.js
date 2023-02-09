let _ = function(elem){
    return document.querySelector(elem);
}
let _All = function(elem){
    return  document.querySelectorAll(elem);
}
let playErrorAudio = function(){
    let errorAudio = new Audio("assets/audio/error_sound.mp3");
    errorAudio.play();
}
let playSuccessAudio = function(){
    let successAudio = new Audio("assets/audio/success_audio.mp3");
    successAudio.play();
}
let normalClickAudio = function(){
    let clickAudio = new Audio("assets/audio/MouseClick.mp3");
    clickAudio.play();
}
let showErrorMessage = function(errorMessage){
    _(MainView.getDomStrings().errorSection).classList.add(MainView.getDomStrings().showErrorSection.slice(1));
    _(MainView.getDomStrings().errorMessagePara).innerText = errorMessage;
}
let USERID;
let USERNAME;

let xhr = new XMLHttpRequest();
xhr.open("GET", "user/currentuser");
xhr.send();
xhr.onload = function(){
    let temp = JSON.parse(xhr.response);
    USERID = temp.currentUserId;
    USERNAME = temp.currentUserName;
}
let getCompletedDiv = function(classForButton, id, domStrings){
    let sectionTag = document.createElement("section");
    sectionTag.classList.add("completed-section");

    return sectionTag;
}