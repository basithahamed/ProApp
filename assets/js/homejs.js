



//This is model of this page contains htmlelements id and class name .......
let DomStrings = (function () {

    let domStrings = {
        openEyeIcon: ".bi-eye-fill",
        closeEyeIcon: ".bi-eye-slash-fill",
        emailInputTag: "#email-input",
        passInputTag: "#pass-input-tag",
        commonEye: ".common-eye",
        inputMessage: ".input-message",
        inputMessageWrapper: ".input-message-wrapper",
        goButton: ".submit-button"
    }

    let getDomStrings = function () {
        return domStrings;
    }

    return {
        getDomStrings: getDomStrings
    }
})();


//na iruken
//This is the view of this page contains methods to change the view .....
let View = (function () {

    let togglePassword = function (openEye, closeEye, password) {
        document.querySelector(openEye).classList.toggle("close-eye");
        document.querySelector(closeEye).classList.toggle("show-eye");

        if (document.querySelector(openEye).classList.contains("close-eye")) {
            document.querySelector(password).type = "text";
        }
        else {
            document.querySelector(password).type = "password";
        }
    }

    let inValidInputDisplay = function (elemRef, errorMessage, isServerError) {
        if (!isServerError) {
            document.querySelector(elemRef).parentElement.classList.add("error");
        }
        document.querySelector(DomStrings.getDomStrings().inputMessage).innerHTML = errorMessage;
        document.querySelector(DomStrings.getDomStrings().inputMessageWrapper).classList.add("show-message-wrapper");
    }
    let validDisplay = function (elemRef) {
        document.querySelector(elemRef).parentElement.classList.remove("error");
        document.querySelector(DomStrings.getDomStrings().inputMessageWrapper).classList.remove("show-message-wrapper");
    }
    return {
        togglePassword: togglePassword,
        inValidInputDisplay: inValidInputDisplay,
        validDisplay: validDisplay
    }
})(DomStrings);




//Event listeners and input validating code goes here .....
let MainRunner = (function (domStrings, view) {
    //Setting eye icon actions
    document.querySelectorAll(domStrings.getDomStrings().commonEye).forEach(function (elem) {
        elem.addEventListener("click", function () {
            let passTag = domStrings.getDomStrings().passInputTag;
            let closeEye = domStrings.getDomStrings().closeEyeIcon;
            let openEye = domStrings.getDomStrings().openEyeIcon;

            view.togglePassword(openEye, closeEye, passTag);
        });
    });

    let isValidEmail = function (str) {
        let first = parseInt(str[0])
        if ((str.search("[@]") >= 0 && isNaN(first)) && str.length > 0) {
            return true;
        }
        return false;
    }
    //method to validate name
    let generalNameValidate = function () {
        if (isValidField(this.value)) {
            view.validDisplay("#" + this.id);
        }
        else {
            view.inValidInputDisplay("#" + this.id, "Name length can be range from 5 to 20 and no special characters");
        }
    }

    let goToMainPage = function () {
        let button = document.createElement("button");
        let anker = document.createElement("a");
        anker.append(button);
        //To be changed
        anker.href = "home"
        button.click();
        
    }
    //This method is to send the user data to the server
    let sendDataToVerify = function (emailId, password) {
        let data = {
            emailId: emailId,
            password: password
        }
        //Sending the data has JSON object, We want to use MultipartConfig Annotation in servlet
        let formData = new FormData();
        
        formData.append("userData", JSON.stringify(data));

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "LoginAction");
        xhr.send(formData);

        xhr.onload = function () {
            if (xhr.response == "Success") {
                goToMainPage();
            }
            else {
                view.inValidInputDisplay(domStrings.getDomStrings().emailInputTag, "Invalid email or password", true);
            }
        }
    }

    //This method is to validate the input details before sending to the server
    let formVerification = function () {
        let emailTag = document.querySelector(domStrings.getDomStrings().emailInputTag);
        let passInputTag = document.querySelector(domStrings.getDomStrings().passInputTag);

        if (!emailTag.classList.contains("error")) {
            if (!passInputTag.value > 0) {
                view.inValidInputDisplay("#" + passInputTag.id, "password can't be empty");
            }
            else if (!isValidEmail(emailTag.value)) {
                view.inValidInputDisplay(domStrings.getDomStrings().emailInputTag, "invalid email");
            }
            else {
                sendDataToVerify(emailTag.value, passInputTag.value);
            }
        }
    }

    //Setting listener for email input field for validation
    document.querySelector(domStrings.getDomStrings().emailInputTag).addEventListener("input", function () {
        if (isValidEmail(this.value)) {
            view.validDisplay(domStrings.getDomStrings().emailInputTag);
        }
        else {
            view.inValidInputDisplay(domStrings.getDomStrings().emailInputTag, "invalid email");
        }
    });

    document.querySelector(domStrings.getDomStrings().passInputTag).addEventListener("input", function () {
        if (!this.value > 0) {
            view.inValidInputDisplay("#" + this.id, "password can't be empty");
        }
        else {
            view.validDisplay("#" + this.id);
        }
    })
    //Listener for GO button this verify all input fields and sends request to the server
    document.querySelector(domStrings.getDomStrings().goButton).addEventListener("click", formVerification);

})(DomStrings, View);

