/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à l'affichage et à la 
 * fermeture de la popup d'édition. 
 * 
 *********************************************************************************/


/**
 * Cette fonction affiche la popup d'édition. 
 */
function showPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // La popup est masquée par défaut (display:none), ajouter la classe "active"
    // va changer son display et la rendre visible. 
    popupBackground.classList.add("active")
}

/**
 * Cette fonction cache la popup d'édition. 
 */
function hidePopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // La popup est masquée par défaut (display:none), supprimer la classe "active"
    // va rétablir cet affichage par défaut. 
    popupBackground.classList.remove("active")
}

/**
 * Cette fonction initialise les écouteurs d'événements qui concernent 
 * l'affichage de la popup. 
 */
function initAddEventListenerPopup() {

    //on affiche la feuille 1 de la popup (mini galerie photos)
    document.getElementById("popupSheet_1").classList.add("activePopup");
    // On écoute le click sur le bouton "édition" de la page principale
    let btnEdit = document.querySelector("#titre .edit")
    let popupBackground = document.querySelector(".popupBackground")
    btnEdit.addEventListener("click", () => {
        // Quand on a cliqué sur le bouton "modifier", on affiche la popup
        showPopup()
    })


    // On écoute le click sur la div "popupBackground" (à l'extérieur de la popup)
    popupBackground.addEventListener("click", (event) => {
        // Si on a cliqué précisément sur la popupBackground 
        // (et pas un autre élément qui se trouve dedant)
        if (event.target === popupBackground) {
            // Alors on cache la popup
            hidePopup()
        }
    })
    // au click sur le bouton "éditer" la pop up s'affiche
    let editButton = document.getElementById("btn-edit");
    editButton.addEventListener("click",() => {
        // pas de flèche retour
        document.getElementById("backArrow").classList.add("unactiveIcon");
        document.getElementById("popup-menu").classList.add("popup-menu-1icon");
        showPopup()
    });
    // on écoute le click sur la croix pour fermer la popup
    let closureCross = document.getElementById("closure");
    closureCross.addEventListener("click", () => {
        hidePopup()
    });
    // on écoute le click sur le bouton "ajouter"
    let addButton = document.getElementById("btn-sheet_2");
    addButton.addEventListener("click", () => {
        //la fleche du menu apparait et doit être de l'autre coté
        document.getElementById("backArrow").classList.remove("unactiveIcon");
        document.getElementById("popup-menu").classList.add("popup-menu-2icons");
        document.getElementById("popup-menu").classList.remove("popup-menu-1icon");
        //on change l'affichage => feuille 1 disparait et feuille 2 apparait
        document.getElementById("popupSheet_1").classList.remove("activePopup");
        document.getElementById("popupSheet_2").classList.add("activePopup");
        //le titre change
        document.querySelector(".popup h1").innerHTML = "Ajout photo";
        //on cache le input d'attribut "file"
        document.getElementById("file").style.opacity = 0;
    });
    // on écoute le click sur la flèche de retour
    let backButton = document.getElementById("backArrow");
    backButton.addEventListener("click", () => {
        //la fleche du menu disparait 
        document.getElementById("backArrow").classList.add("unactiveIcon");
        document.getElementById("popup-menu").classList.remove("popup-menu-2icons");
        document.getElementById("popup-menu").classList.add("popup-menu-1icon");
        //on change l'affichage => feuille 2 disparait et feuille 1 apparait
        document.getElementById("popupSheet_1").classList.add("activePopup");
        document.getElementById("popupSheet_2").classList.remove("activePopup");
        //le titre change
        document.querySelector(".popup h1").innerHTML = "Galerie photos";
    });
}