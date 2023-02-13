let PeopleAdding = (() => {

    let domStrings = {
        singlePeopleWrapper : "single-people-selecting-wrapper",
        peopleSelectingLabel : "people-selecting-label",
        miniPeoplePhoto : "mini-people-selecting-profile-image",
        personName : "people-selecting-name",
        peopleOptionLabel : "people-option-label",
        smallRoundIcon : "small-round-icon",
        peopleInputCheckbox : "people-selecting-id",
        smallIconOn : "small-round-icon-on",
        onBackgroundColor : "on-background-color"
    }
    let resetPeopleAddingSection = () => {

    }
    let getPersonOption = (id, name, isProject) => {
        //Creating elements starts here 
        let mainDiv = document.createElement("div");
        let peopleSelectingLabel = document.createElement("label");
        let miniProfileImage = document.createElement("div");
        let personName = document.createElement("p");
        let personOptionLabel = document.createElement("label");
        let roundIcon = document.createElement("div");
        let inputCheckBox = document.createElement("input");

        //Adding classes to the created elements
        mainDiv.classList.add(domStrings.singlePeopleWrapper);
        mainDiv.classList.add("x-axis-flex");

        peopleSelectingLabel.classList.add(domStrings.peopleSelectingLabel);
        peopleSelectingLabel.classList.add("x-axis-flex");
        peopleSelectingLabel.setAttribute("for", "person" + id);
        
        miniProfileImage.classList.add(domStrings.miniPeoplePhoto);
        miniProfileImage.style.backgroundImage = "url(/ProApp/assets/images/user.png)";

        personName.classList.add(domStrings.personName);
        personName.textContent = name;

        personOptionLabel.classList.add(domStrings.peopleOptionLabel);
        personOptionLabel.setAttribute("for", "person" + id);

        roundIcon.classList.add(domStrings.smallRoundIcon);
        inputCheckBox.classList.add(domStrings.peopleInputCheckbox);
        inputCheckBox.type = "checkbox";
        if(isProject){
            inputCheckBox.name = "project-people-option";
        }
        else {
            inputCheckBox.name = "task-people-option";
        }
        inputCheckBox.id = "person" + id;
        inputCheckBox.value = id;

        //Adding listeners to the elemetns
        personOptionLabel.addEventListener("click", (event) => {
            if(event.target.classList.contains(domStrings.peopleOptionLabel)){
                event.target.classList.toggle(domStrings.onBackgroundColor);
                event.target.children[0].classList.toggle(domStrings.smallIconOn);
            }
            else {
                event.target.classList.toggle(domStrings.smallIconOn);
                event.target.parentElement.classList.toggle(domStrings.onBackgroundColor);
            }
        });

        //Adding element to their respective parent elements
        peopleSelectingLabel.append(miniProfileImage, personName);
        personOptionLabel.append(roundIcon);

        mainDiv.append(peopleSelectingLabel, personOptionLabel, inputCheckBox);

        return mainDiv;
    }

    let renderPeopleChoosingSection = (fullPeopleDisplaySection, usersList, isProject) => {
        fullPeopleDisplaySection.innerHTML = "";
        usersList.forEach((elem) => {
            fullPeopleDisplaySection.append(getPersonOption(elem.userId, elem.userName, isProject));
        });
    }

    return {
        renderPeopleChoosingSection : renderPeopleChoosingSection,
        resetPeopleAddingSection : resetPeopleAddingSection
    }
})();