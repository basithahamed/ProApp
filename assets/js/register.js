
//This is model of this page contains htmlelements id and class name .......
let DomStrings = (function () {

    let domStrings = {
        commonNameInput: ".name-input",
        openEyeIcon: ".bi-eye-fill",
        closeEyeIcon: ".bi-eye-slash-fill",
        firstNameInput: "#first-name-input",
        lastNameInput: "#last-name-input",
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
        if(!isServerError){
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

    let isValidField = function (str) {
        let first = parseInt(str[0])
        if (isNaN(first) && (str.length >= 5 && str.length <= 20) && str.search("[^A-Za-z0-9]") == -1) {
            return true;
        }
        return false;
    }

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

    //This method is to send the user data to the server
    let sendDataToVerify = function (firstName, lastName, emailId, password) {
        let data = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: password
        }
        console.log(JSON.stringify(data));
        //Sending the data has JSON object, We want to use MultipartConfig Annotation in servlet
        let formData = new FormData();
        formData.append("userData", JSON.stringify(data));
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "CreateUser");
        xhr.send(formData);
        xhr.onload=function()
        {
            if(xhr.response == "Success"){
                let anker = document.createElement("a");
                anker.href = "home";
                anker.click();
            }
            else{
                view.inValidInputDisplay("", xhr.response, true);
            }
        }
        //No need of onload function
    }


    //This method is to validate the input details before sending to the server
    let formVerification = function () {
        let emailTag = document.querySelector(domStrings.getDomStrings().emailInputTag);
        let firstNameTag = document.querySelector(domStrings.getDomStrings().firstNameInput);
        let lastNameTag = document.querySelector(domStrings.getDomStrings().lastNameInput);
        let passInputTag = document.querySelector(domStrings.getDomStrings().passInputTag);

        if (!emailTag.classList.contains("error") && !firstNameTag.classList.contains("error") && !lastNameTag.classList.contains("error")) {
            if (!passInputTag.value > 0) {
                view.inValidInputDisplay("#" + passInputTag.id, "password can't be empty");
            }
            else if (!isValidEmail(emailTag.value)) {
                view.inValidInputDisplay(domStrings.getDomStrings().emailInputTag, "invalid email");
            }
            else if (!isValidField(firstNameTag.value)) {
                view.inValidInputDisplay("#" + firstNameTag.id, "Name length can be range from 5 to 20 and no special characters");
            }
            else if (!lastNameTag.value.length > 0) {
                view.inValidInputDisplay("#" + lastNameTag.id, "Last name can't be empty");
            }
            else {
                sendDataToVerify(firstNameTag.value, lastNameTag.value, emailTag.value, passInputTag.value);
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

    //Setting listener for name input field for validation
    document.querySelector(domStrings.getDomStrings().firstNameInput).addEventListener("input", generalNameValidate);

    //Setting listener for last name input field
    document.querySelector(domStrings.getDomStrings().lastNameInput).addEventListener("input", function () {
        let firstCharacter = parseInt(this.value[0]);
        if (isNaN(firstCharacter) && this.value.search("[^A-Za-z]") == -1) {
            view.validDisplay(domStrings.getDomStrings().lastNameInput);
        }
        else {
            let temp = domStrings.getDomStrings().lastNameInput;
            view.inValidInputDisplay(temp, "Last name should not conatin other than alphabets");
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
