const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", (event) => {
    
    //Récupération des valeurs de champs
    const emailUser = document.getElementById('email');
    const passwordUser = document.getElementById('pwd');
    // un trim pour enlever les caractères blancs
    const emailInput = emailUser.value.trim();
    const passwordInput = passwordUser.value.trim();

    
    //try catch pour valider le formulaire
    try {
        errorDisplay();
        // On empêche le comportement par défaut et donc l'envoi par submit
        event.preventDefault();

        // On vérifie la validité du champ email
        const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
        fieldCheck(emailUser,emailRegex);
        //le mot de passe doit être rempli au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial au mini
        // const pwdRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        const pwdRegex = /[A-Za-z0-9._%+-]+/;
        fieldCheck(passwordUser,pwdRegex);
        //On envoie le couple login/mot de passe avec fetch
        const reqResp = sendData(emailInput, passwordInput);
        localStorage.setItem('myToken', reqResp);
    }
    catch (error) {
        errorDisplay(error);
    }
    loginForm.submit();
});

function fieldCheck(formField, regexString) {
    // test pour savoir si la chaine respecte le motif de l'expression régulière
    if (regexString.test(formField.value.trim())===false) {
        throw new Error(`Le champ ${formField.name} n'est pas valide.`);
    }
}

function errorDisplay(errorToDisplay) {
    let myPara = document.querySelector("p");
    if (errorToDisplay === undefined) {
        myPara.innerHTML = "";
    } else {
        myPara.innerHTML = errorToDisplay;
    }
}

async function sendData(login, password) {
    //création du fichier json des data de login
    let user = {
        email: login,
        password: password
      };

    //envoi de la requête
    const myHostname = "http://localhost:5678/";
    const myAction = "api/users/login";
    const myReq = myHostname + myAction;

    let response = await fetch(myReq, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
    });
    try {

        if (response.ok) { // if HTTP-status is 200-299
            // obtenir le corps de réponse (la méthode expliquée ci-dessous)
            let json = await response.json();
            console.log(response.ok);
            return json["token"];
        } else {
            // console.log(response.ok);
            // return response.status;
            // alert("HTTP-Error: " + response.status);
            if (response.status == 404) {
                // alert("L'utilisateur n'existe pas.");
                throw new Error("L'utilisateur n'existe pas.");
            } else {
                // alert("Le mot de passe est éronné.");
                throw new Error("Le mot de passe est éronné.");
            }
        }
    }
    catch(error) {
        errorDisplay(error);
    }

}