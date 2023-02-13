let ProfileController = (view => {

    let init = () => {
        //This for showing the profile section
        _All(view.getDomStrings().profileButton).forEach(elem => {
            elem.addEventListener("click", event =>{
                _(view.getDomStrings().fullProfileSection).classList.add(view.getDomStrings().showProfileSection);
                _(view.getDomStrings().profileName).textContent = USERNAME;
            });
        });

        //This is for closing profile section
        _(view.getDomStrings().profileCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().fullProfileSection).classList.remove(view.getDomStrings().showProfileSection);
        });
    }
    init();
    return {
        init : init
    }
})(ProfileView);