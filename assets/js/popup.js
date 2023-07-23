/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à l'affichage et à la 
 * fermeture de la popup de partage. 
 * 
 *********************************************************************************/


/**
 * Cette fonction affiche la popup pour partager son score. 
 */
function showPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // La popup est masquée par défaut (display:none), ajouter la classe "active"
    // va changer son display et la rendre visible. 
    popupBackground.classList.add("active")
}

/**
 * Cette fonction cache la popup pour partager son score. 
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
    // On écoute le click sur le bouton "partager"
    // console.log("initialisation pop up");
    let btnEdit = document.querySelector("#titre .edit")
    // console.log("bouton édit : " + btnEdit);
    let popupBackground = document.querySelector(".popupBackground")
    btnEdit.addEventListener("click", () => {
        // Quand on a cliqué sur le bouton "modifier", on affiche la popup
        showPopup()
    })

    // On écoute le click sur la div "popupBackground"
    popupBackground.addEventListener("click", (event) => {
        // Si on a cliqué précisément sur la popupBackground 
        // (et pas un autre élément qui se trouve dedant)
        if (event.target === popupBackground) {
            // Alors on cache la popup
            hidePopup()
        }
    })

    let editButton = document.getElementById("btn-edit");
    // console.log("deuxieme bouton édit : " + editButton);
    editButton.addEventListener("click",() => {
        console.log("evenement lancé")
        showPopup()
    });
}