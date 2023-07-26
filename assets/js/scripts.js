//*********Fonction mettant la page index.html en mode edition ou en mode visiteur*/
function logVisibility() {
    let token = sessionStorage.getItem("myToken");
    let buttonLogin = document.getElementById("btn-login");
    let buttonLogout = document.getElementById("btn-logout");
    let myDiv = document.getElementById("editMode");
    let parasModeEdit = document.getElementsByClassName("edit");
    let myFilter = document.getElementById("filter");
    // console.log("Token avant : " + token);

    // Mode visiteur
    if (token === null) {
        buttonLogin.style["display"] = "display";
        buttonLogin.innerHTML = "login";
        buttonLogout.style["display"] = "none";
        //On supprime l'évènement sur logout en mode visiteur
        // buttonLogout.removeEventListener("click",tokenDelete());
        // le bandeau édition n'est pas visible en mode visiteur
        myDiv.classList.add("notVisible");
        // les paragraphe avec l'indication "modifier" ne sont pas visibles en mode visiteur
        Array.from(parasModeEdit).forEach(function(paragraphe) {
            paragraphe.classList.add("notVisible");
        });
        // le filtre est visible en mode visiteur
       myFilter.style["visibility"] = "visible";  
    // mode édition
    } else {
        // le dernier bouton du menu est "logout"
        buttonLogin.style["display"] = "none";
        buttonLogout.style["display"] = "display";
        buttonLogout.innerHTML = "logout";
        //On écoute le bouton logout pour supprimer le token
        // buttonLogout.addEventListener("click",tokenDelete());
        // le bandeau édition est visible en mode édition
        myDiv.classList.remove("notVisible");
        // les paragraphe avec l'indication "modifier" sont visibles en mode édition
        Array.from(parasModeEdit).forEach(function(paragraphe) {
            paragraphe.classList.remove("notVisible");
        });
        // le filtre n'est pas visible en mode édition
        myFilter.style["visibility"] = "collapse";
    }
    // console.log("Token après : " + sessionStorage.getItem("myToken"));
}

function tokenDelete() {
    sessionStorage.removeItem("myToken");
}

// ****fonction principale de chargement de page****
// Au lancement de la page :
        // on récupère les données des travaux sur l'API
        // on crée un set de catégorie pour avoir la liste sans doublon des catégories et pouvoir créer les filtres
        // on génère les éléments du filtre
        // on ajoute un écouteur d'évènement sur chaque élément du filtre
function chargerGallerieFiltres() {

    const myHostname = "http://localhost:5678/";
    const myAction = "api/works";
    const myReq = myHostname + myAction;
    
    initAddEventListenerPopup();
    fetch(myReq)
        //Récupération de la réponse de type json  à la requête (tous les travaux)
        .then(response => response.json())
        //La réponse contient un tableau d'objet "worksWithoutFilter" définissant les travaux : on le parcours
        .then (function(worksWithoutFilter) {

            //*********************Filtres**********************/
            //Création d'un set de catégories (donc sans doublon)
            let categoriesSet = new Set(); 
            worksWithoutFilter.forEach(function(work) {
                categoriesSet.add(work.category.name);
                });
            // implémentation des options select de catégorie pour la popup d'édition
            let mySelect =  document.getElementById("categoryChoice");
            let newOption = document.createElement("option");
            newOption.setAttribute("value","");
            newOption.innerHTML = "";
            mySelect.appendChild(newOption);
            categoriesSet.forEach((category)=> {
                let newOption = document.createElement("option");
                newOption.setAttribute("value",category);
                newOption.innerHTML = category;
                mySelect.appendChild(newOption);
            });
            

            //Création des la liste non ordonnée des filtres de catégorie
            filterCreation(categoriesSet);
            //Evènement sur les filtres
            let myElement = document.querySelectorAll("#filter li");
            //***********************Gallerie*********************/
            myElement.forEach(function(item) {
                item.addEventListener("click", ()=> {
                    //Vider la gallerie
                    let myGallery = document.getElementById("gallery");
                    myGallery.innerHTML = "";
                    //Générer la gallerie selon le filtre de catégorie
                    let myFilter = htmlDecode(item.innerHTML);
                    //Par défaut il n'y a pas de filtre donc le tableau "filteredWorks" est le même que "worksWithoutFilter"
                    let filteredWorks = [...worksWithoutFilter];
                    // Ce tableau est filtré seulement si on est sur un filtre différent de "Tous"
                    if (myFilter !== "Tous") {
                        filteredWorks = worksWithoutFilter.filter(function(work){
                            if (work.category.name === myFilter) {
                                return work;
                            }
                        });
                    }
                    // On génère la gallerie seuleemnt avec les travaux qui ont pour catégorie celle du filtre
                    worksDisplay(filteredWorks);

                    //Les filtres (éléments li) sont définis "actif" si on afiche les travaux de ce filtre, inactif sinon
                    //Il faut donc activer le li du filtre choisi
                    activateFilter(myFilter);
                });          
            });
            
            //Création des <figure> des travaux pour l'affichage par défaut de la page
            worksDisplay(worksWithoutFilter);
            // On génèrer la galerie de la popup d'édition
            worksEditDisplay(worksWithoutFilter);
        });

};


// Cette fonction génère les éléments li du filtre
// "Tous" est généré en premier et sans utiliser les données reçu par fetch
// Il reçoit la classe "activeFilter"  pour avoir l'aspect "sélectionné"
// Les autres reçoivent la classe "unactiveFilter"  pour avoir l'aspect "non sélectionné"
function filterCreation(categoriesList) {
    myNode = document.getElementById("filter");
    let newListElement = document.createElement("li");
    newListElement.innerHTML = "Tous";
    newListElement.classList.add("activeFilter");
    myNode.appendChild(newListElement);
    categoriesList.forEach(function(value){
        newListElement = document.createElement("li");
        newListElement.classList.add("unActiveFilter");
        newListElement.innerHTML = value;
        myNode.appendChild(newListElement);
    });
}

// Fonction pour éviter d'avoir le "&" encodé en html lors de la récupération par innerHTML
// et donc un problème de correspondance de catégorie pour "Hotels & restaurants"
function htmlDecode(encodedString) {
    let decodedString= encodedString.replace(/&amp;/g,'&');
    return decodedString;
}


// Fonction qui créer les élément "figure" qui montrent les travaux sur la galerie
// Elle prend en paramètre les travaux de la catégorie de filtration
function worksDisplay(worksToDisplay) {
    
    let myGalleryNode = document.getElementById("gallery");
    //Pour chaque travail
    worksToDisplay.forEach(work => {
        //Création de la balise figure en tant que dernier enfant du noeud, soit la balise avec id = gallery
        let newWork = document.createElement("figure");
        //On ajoute la classe qui rend visible
        myGalleryNode.appendChild(newWork);
        
        //Création d'une balise image avec les attributs du html d'origine
        let newImage = document.createElement("img");
        newImage.setAttribute("src",work.imageUrl);
        newImage.setAttribute("alt",work.title);
        //Création d'une balise caption et de son contenu HTML
        let newCaption = document.createElement("figcaption");
        newCaption.innerHTML = work.title;
        //Insertion dans le DOM des balises image et caption en tant qu'enfant de la balise figure
        newWork.appendChild(newImage);
        newWork.appendChild(newCaption);
    });
}

// Fonction qui créer les élément "figure" qui montrent les travaux sur la modale
// Elle prend en paramètre l'ensemble des travaux
function worksEditDisplay(worksToDisplay) {
    
    let myGalleryNode = document.getElementById("galleryEdit");
    //Pour chaque travail
    worksToDisplay.forEach(work => {
        //Création de la balise figure en tant que dernier enfant du noeud, soit la balise avec id = gallery
        let newWork = document.createElement("figure");
        myGalleryNode.appendChild(newWork);
        //Création d'une balise image avec les attributs du html d'origine
        let newImage = document.createElement("img");
        newImage.setAttribute("src",work.imageUrl);
        newImage.setAttribute("alt",work.title);
        newWork.appendChild(newImage);
        //Création d'une balise div qui contiendra l'icone poubelle
        //C'est le carré noir à coin arrondis
        let myDivImgIcon = document.createElement("div");
        myDivImgIcon.setAttribute("class","imgIcon");
        newWork.appendChild(myDivImgIcon);
        //Création d'une balise icone poubelle, enfant du div "myDivImgIcon"
        let newIcon = document.createElement("i");
        newIcon.setAttribute("class","fa-solid fa-trash-can");
        myDivImgIcon.appendChild(newIcon);
        //Création d'une balise caption avec le lien "édition"
        let newCaption = document.createElement("figcaption");
        newCaption.innerHTML = "édition";
        //Insertion dans le DOM des balises image et caption en tant qu'enfant de la balise figure
        newWork.appendChild(newCaption);
    });
}

// Fonction qui met en forme les éléments li du filtre après fitration
function activateFilter(category) {
    let allLi = document.querySelectorAll("#filter li");
    //On parcours l'ensemble des li du filtre
    allLi.forEach((listElem) => {
        // si le li qui est parcouru est celui cliqué, il devient actif
        if (htmlDecode(listElem.innerHTML) === category) {
            listElem.classList.remove("unActiveFilter");
            listElem.classList.add("activeFilter");          
        //les autres li deviennent inactifs   
        } else {
            // console.log("contient la classe inactive");
            listElem.classList.remove("activeFilter");
            listElem.classList.add("unActiveFilter");
        }
    }); 
}

