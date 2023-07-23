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
        // console.log("evenement lancé")
        showPopup()
    });
    // on écoute le click sur la croix pour fermer la popup
    let closureCross = document.getElementById("closure");
    closureCross.addEventListener("click", () => {
        hidePopup()
    });
}