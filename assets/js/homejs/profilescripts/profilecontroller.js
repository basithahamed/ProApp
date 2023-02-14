let ProfileController = (view => {

    let init = () => {
        //This for showing the profile section
        _All(view.getDomStrings().profileButton).forEach(elem => {
            elem.addEventListener("click", event =>{
                _(view.getDomStrings().fullProfileSection).classList.add(view.getDomStrings().showProfileSection);
                _(view.getDomStrings().profileName).textContent = USERNAME;
                _(view.getDomStrings().profileImage).style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
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
        })
    }
    init();
    return {
        init : init
    }
})(ProfileView);