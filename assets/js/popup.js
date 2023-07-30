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
function initAddEventListenerPopup(categoriesName,categoriesId) {

    //on affiche la feuille 1 de la popup (mini galerie photos)
    document.getElementById("popupSheet_1").classList.add("activePopup");
    // On écoute le click sur le bouton "édition" de la page principale
    let btnEdit = document.querySelector("#titre .edit");
    let popupBackground = document.querySelector(".popupBackground");
    btnEdit.addEventListener("click", () => {
        // Quand on a cliqué sur le bouton "modifier", on affiche la popup
        showPopup();
    });
    // On écoute le click sur la div "popupBackground" (à l'extérieur de la popup)
    popupBackground.addEventListener("click", (event) => {
        // Si on a cliqué précisément sur la popupBackground 
        // (et pas un autre élément qui se trouve dedant)
        if (event.target === popupBackground) {
            // Alors on cache la popup
            hidePopup();
        }
    });
    // au click sur le bouton "éditer" la pop up s'affiche
    let editButton = document.getElementById("btn-edit");
    editButton.addEventListener("click",() => {
        // pas de flèche retour
        document.getElementById("backArrow").classList.add("unactiveIcon");
        document.getElementById("popup-menu").classList.add("popup-menu-1icon");
        showPopup();
    });
    // on écoute le click sur la croix pour fermer la popup
    let closureCross = document.getElementById("closure");
    closureCross.addEventListener("click", () => {
        hidePopup();
    });
    // on écoute le click sur la poubelle pour supprimer une image
    let binIcons = document.getElementsByClassName("imgIcon");
    for (let cpt=0; cpt < binIcons.length; cpt++) {
        binIcons[cpt].addEventListener("click", () => {
            // alerte
            if (confirm("Etes vous bien sûr de vouloir effacer le projet")) {
                //récupération de l'id de la photo
                let imageId = binIcons[cpt].id.slice(binIcons[cpt].id.indexOf("-")+1);
                // efface le work en base de données
                deleteWorkAPI(imageId,myReq).then( ()=> {
                    // efface le work sur la galerie d'édition
                    document.getElementById("figGalleryThumb-" + imageId).remove();
                    // efface le work de la galerie
                    document.getElementById("figGallery-" + imageId).remove();
                });
            } 
        });
    }

    // on écoute le click sur le bouton "ajouter" passage de feuille 1 à feuille 2
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
        //initialisation des champs
        document.getElementById("imagePreview").src = "";
        document.getElementById("title").value="";
        document.getElementById("categoryChoice").value="";
        // on affiche l'encart de preview sans image
        document.getElementById("Calque_1").classList.remove("notVisible");
        document.getElementById("btn-add").classList.remove("notVisible");
        document.getElementById("image").classList.remove("notVisible");
        document.getElementById("imageExtension").classList.remove("notVisible");
        //on cache le input d'attribut "file" qui n'est pas customizable
        document.getElementById("image").style.opacity = 0;
    });
    // on écoute le click sur la flèche de retour, passage de feuille 2 à feuille 1
    document.getElementById("backArrow").addEventListener("click", () => {
        fromSheet2toSheet1();
    });

    // implémentation des options select de catégorie pour la popup d'édition
    let mySelect =  document.getElementById("categoryChoice");
    let idSet = categoriesId.values();
    categoriesName.forEach((nameCat)=> {
        let newOption = document.createElement("option");
        newOption.setAttribute("value",idSet.next().value);
        newOption.innerHTML = nameCat;
        mySelect.appendChild(newOption);
    });
}

function fromSheet2toSheet1() {
    //la fleche du menu disparait 
    document.getElementById("backArrow").classList.add("unactiveIcon");
    document.getElementById("popup-menu").classList.remove("popup-menu-2icons");
    document.getElementById("popup-menu").classList.add("popup-menu-1icon");
    //on change l'affichage => feuille 2 disparait et feuille 1 apparait
    document.getElementById("popupSheet_1").classList.add("activePopup");
    document.getElementById("popupSheet_2").classList.remove("activePopup");
    //le titre change
    document.querySelector(".popup h1").innerHTML = "Galerie photos";
}

//On écoute l'évènement change pour faire un preview de l'image
let myPreview = document.getElementById("image");
myPreview.addEventListener("change", (event) => {
    if(event.target.files.length > 0){
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("imagePreview");
        preview.src = src;
        document.getElementById("Calque_1").classList.add("notVisible");
        document.getElementById("btn-add").classList.add("notVisible");
        document.getElementById("image").classList.add("notVisible");
        document.getElementById("imageExtension").classList.add("notVisible");
      }
});


// On écoute l'évènement click sur le bouton valider (envoyer nouvelle photo)
let myForm = document.getElementById("createForm");
myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const myFormData = new FormData(myForm);
 
    // ajouter photo en base de données
    addPicture(myFormData, myReq).then(()=>{
        fromSheet2toSheet1();
        // vider la galerie principale
        let myGallery = document.getElementById("gallery");
        myGallery.innerHTML = "";
        //vider la galerie édition
        let myGalleryEdit = document.getElementById("galleryEdit");
        myGalleryEdit.innerHTML = "";
        //ajouter photo sur la galerie d'édition
        //ajouter photo sur la galerie....
        //..... en rechargeant la galerie
        chargerGallerieFiltres()
    });
});