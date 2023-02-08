let MainController = (function(view){

    _(view.getDomStrings().webViewHamburgerIcon).addEventListener("click", function(){
        _(view.getDomStrings().webViewNavBar).classList.toggle(view.getDomStrings().showNavBar.slice(1));
    });
    _(view.getDomStrings().errorCloseButton).addEventListener("click", function(){
        _(view.getDomStrings().errorSection).classList.remove(view.getDomStrings().showErrorSection.slice(1));
    });
})(MainView);