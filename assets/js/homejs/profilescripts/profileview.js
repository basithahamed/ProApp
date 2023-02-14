let ProfileView = (() => {

    let domStrings = {
        profileButton : ".profile-button",
        fullProfileSection : ".full-profile-section",
        showProfileSection : "show-profile-section",
        profileName : ".user-profile-name",
        profileImage : ".user-big-profile-image",
        profileCloseButton : ".profile-close-button",
        editProfileButton : ".edit-profile-button",
        editProfilePhotoImage : ".mini-profile-user-image",
        fullEditProfileSection : ".outer-edit-profile",
        editProfileCloseButton : ".edit-profile-close-button",
        showEditProfile : "show-edit-profile-section"
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings
    }
})();