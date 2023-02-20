let ProfileController = (view => {

    //Reset form 
    let resetUpdateForm = () => {
        _(view.getDomStrings().editProfileForm).reset();
    }
    //This is to upload photo to the server
    let uploadPhotoToServer = file => {
        let formData = new FormData();
        formData.append("imageType", "." + file.type.split("/")[1]);
        formData.append("userImage", file);
        formData.append("uid", USERID);

        sendPostRequest("user/changeimage", formData, function(){
            resetImages();
            alert(this.response);
        });
    }
    //This is to logout from the page
    let logOutAction = () => {
        sendPostRequest("/ProApp/logout", "", function(){
            console.log(this.status);
            location.reload();
        });
    }
    //sending update data to server
    let sendUpdateData = userDetails => {
        let formData = new FormData();
        formData.append("updatedUserData", JSON.stringify(userDetails));

        sendPostRequest("user/update", formData, function(){
            let responseFromServer = JSON.parse(this.response);
            if(responseFromServer.result == "Success"){
                _(view.getDomStrings().editProfileCloseButton).click();
                resetUpdateForm();
            }
            else {
                showErrorMessage("Some problem while updating details");
                playErrorAudio();
            }
        });
    }
    //This is to validate the new update details
    let validateForm = () => {
        let firstName = _(view.getDomStrings().userFirstNameInput).value.trim();
        let lastName = _(view.getDomStrings().userLastNameInput).value.trim();
        let emailId = _(view.getDomStrings().userEmailIdInput).value.trim();
        let nickName = _(view.getDomStrings().userNickNameInput).value.trim();

        let nameRegex = new RegExp("[^a-zA-Z0-9]");
        let emailRegex = new RegExp("^[a-zA-Z0-9.]{1,}@.{4,25}.com$");

        //This if to check username does not contain special characters
        if(!nameRegex.test(firstName) && !nameRegex.test(lastName)){
            //This if to check the length of user names
            if(firstName.length <=30 && lastName.length <= 30 && firstName.length >=3 && lastName.length >= 1){
                //This is to check the email address
                if(emailRegex.test(emailId)){
                    //This if is to check length of user name
                    if(nickName.length <= 10 && nickName.length >= 3){
                        let obj = {
                            newFirstName : firstName,
                            newLastName : lastName,
                            newEmailId : emailId,
                            uid : USERID 
                        }
                        return {
                            data : obj,
                            status : true
                        };
                    }
                    else{
                        showErrorMessage("Nick Name should length should be greater than 3 and lesser than 10");
                        playErrorAudio();
                    }
                }
                else {
                    showErrorMessage("Invalid email");
                    playErrorAudio();
                }
            }
            else {
                showErrorMessage("First name and last name should contain minimum 3 characters and maximum 30 characters");
                playErrorAudio();
            }
        }
        else {
            showErrorMessage("Invalid user name. User name should not contain special characters");
            playErrorAudio();
        }
        return {
            status : false
        };
    }
    let init = () => {
        //This for showing the profile section
        _All(view.getDomStrings().profileButton).forEach(elem => {
            elem.addEventListener("click", event =>{
                _(view.getDomStrings().fullProfileSection).classList.add(view.getDomStrings().showProfileSection);
                _(view.getDomStrings().profileName).textContent = USERNAME;
                _All(view.getDomStrings().profileImage).forEach(elem => {
                    elem.style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
                });
            });
        });

        //This is for closing profile section
        _(view.getDomStrings().profileCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().fullProfileSection).classList.remove(view.getDomStrings().showProfileSection);
        });
        //This is to open edit profile section
        _(view.getDomStrings().editProfileButton).addEventListener("click", event => {
            _(view.getDomStrings().fullEditProfileSection).classList.add(view.getDomStrings().showEditProfile);
            _(view.getDomStrings().editProfilePhotoImage).style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
        })

        //This is for closing profile editing section
        _(view.getDomStrings().editProfileCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().fullEditProfileSection).classList.remove(view.getDomStrings().showEditProfile);
            resetUpdateForm();
        })
        //This is for improve button action
        _(view.getDomStrings().improveButton).addEventListener("click", event => {
            let validateResult = validateForm();
            if(validateResult.status){
                sendUpdateData(validateResult.data);
            }
        });
        //This is for opening main image uploading window
        _(view.getDomStrings().changePhotoButton).addEventListener("click", event => {
            _(view.getDomStrings().fullChangePhotoSection).classList.add(view.getDomStrings().showFullChangePhoto);
        });
        //This is for closing main image uploading window
        _(view.getDomStrings().mainUploadPhotoSectionCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().fullChangePhotoSection).classList.remove(view.getDomStrings().showFullChangePhoto);
        });

        //This is for uploading photo button action
        _(view.getDomStrings().mainUploadPhotoButton).addEventListener("change", event => {
            uploadPhotoToServer(_(view.getDomStrings().mainUploadPhotoButton).files[0]);
        });
        //This is for uploading photo button in the edit profile section 
        _(view.getDomStrings().editProfilePhotoUploadButton).addEventListener("change", event => {
            uploadPhotoToServer(_(view.getDomStrings().editProfilePhotoUploadButton).files[0]);
        });

        //This is for log out button
        _(view.getDomStrings().logOutButton).addEventListener("click", logOutAction);
    }
    init();
    return {
        init : init
    }
})(ProfileView);