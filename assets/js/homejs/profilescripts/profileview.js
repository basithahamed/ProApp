let ProfileView = (() => {

    let domStrings = {
        profileButton : ".profile-button",
        fullProfileSection : ".full-profile-section",
        showProfileSection : "show-profile-section",
        profileName : ".user-profile-name",
        profileImage : ".user-big-profile-image",
        profileCloseButton : ".profile-close-button"
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings
    }
})();