let MainView = (function(){

    let domStrings = {
        webViewNavBar : ".web-view-nav-bar",
        webViewHamburgerIcon : ".hamburger-menu",
        showNavBar : ".show-web-view-nav-bar",
        errorSection : ".error-message-section",
        showErrorSection : ".show-error-message",
        errorCloseButton : ".error-close-button",
        errorMessagePara : ".error-message-para"
    }
    let getDomStrings = function(){
        return domStrings;
    }
    return {
        getDomStrings : getDomStrings
    }
})();