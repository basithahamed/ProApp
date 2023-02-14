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
//This is to show a error message
let showErrorMessage = function(errorMessage){
    _(MainView.getDomStrings().errorSection).classList.add(MainView.getDomStrings().showErrorSection.slice(1));
    _(MainView.getDomStrings().errorMessagePara).innerText = errorMessage;
}
let USERID;
let USERNAME;
let CURRENTUSERPHOTO;

let xhr = new XMLHttpRequest();
xhr.open("GET", "user/currentuser");
xhr.send();
xhr.onload = function(){
    let temp = JSON.parse(xhr.response);
    USERID = temp.currentUserId;
    USERNAME = temp.currentUserName;
    CURRENTUSERPHOTO= temp.imagePath;
    _(".mini-photo").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
    _(".bottom-icon-profile").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
}
//This is for getting a task completed page for a task single task.
let getCompletedDiv = function(id, isProject){
    let mainDivTag = document.createElement("div");
    let h1Tag = document.createElement("h1");
    
    mainDivTag.classList.add("completed-section");
    mainDivTag.classList.add("y-axis-flex");
    
    h1Tag.textContent = "Completed";
    mainDivTag.id = id;

    if(!isProject){
        let changeButton = document.createElement("button");
        changeButton.classList.add("change-to-not-complete-button");
        changeButton.textContent = "Undo";
        changeButton.addEventListener("click", function(event){
            console.log(TaskView.getDomStrings().showCompletedDiv);
            let selectedId = event.target.parentElement.id;
            event.target.parentElement.parentElement.classList.remove(TaskView.getDomStrings().showCompletedDiv);
            TaskController.changeTaskStatus(selectedId);
        });
        mainDivTag.append(h1Tag, changeButton);
    }
    else {
        mainDivTag.append(h1Tag);
    }
    
    return mainDivTag;
}