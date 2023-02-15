let ProfileView = (() => {

    let domStrings = {
        profileButton : ".profile-button",
        fullProfileSection : ".full-profile-section",
        showProfileSection : "show-profile-section",
        changePhotoButton : ".change-photo-button",
        profileName : ".user-profile-name",
        profileImage : ".user-big-profile-image",
        profileCloseButton : ".profile-close-button",
        editProfileButton : ".edit-profile-button",
        editProfilePhotoImage : ".mini-profile-user-image",
        fullEditProfileSection : ".outer-edit-profile",
        editProfileCloseButton : ".edit-profile-close-button",
        fullChangePhotoSection : ".full-update-image-window",
        showFullChangePhoto : "show-image-window",
        mainUploadPhotoButton : "#upload-photo-id",
        editProfilePhotoUploadButton : "#upload-photo-id-2",
        mainUploadPhotoSectionCloseButton : ".main-image-upload-close-button",
        editProfileForm : ".edit-profile-body",
        showEditProfile : "show-edit-profile-section",
        improveButton : ".edit-profile-improve-button",
        userFirstNameInput : "#edit-profile-first-name-input",
        userLastNameInput : "#edit-profile-last-name-input",
        userEmailIdInput : "#edit-profile-email-name-input",
        userNickNameInput : "#edit-profile-nick-name-input"
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings
    }
})();