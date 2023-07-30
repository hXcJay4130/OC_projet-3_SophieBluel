async function getAllWorks(request) {
    // console.log("On est dans getAllWorks");
    // Récupération des données provenant du back-end pour les travaux
    const response = await fetch(request);
    // console.log("Réponse : " + response);
    const works = await response.json();
    // console.log("Retour : " + works);
    return works;
};


async function getAllCategories(request) {
    // Récupération des données provenant du back-end pour les catégories
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    return categories;
};

async function deleteWorkAPI(workId,request) {
    let storedToken = window.sessionStorage.getItem("myToken");
    // console.log("storedToken : " + storedToken);
    let url = "";
    let httpOptions = "";
    let bearer = "Bearer " + storedToken;
    // console.log(bearer);

    if (storedToken !== null) {
        const headersContent = {
        "Accept": "*/*",
        "Authorization": bearer
        };
        // console.log(headersContent);
        const headers = new Headers(headersContent);
        // console.log(headers);
        httpOptions = {
        method : "DELETE",
        headers: headers,
        };
        url = request + "/" + workId;
        // console.log(httpOptions);
    }
    try {     
        const response = await fetch(url, httpOptions);
        console.log(response.status);
    } catch (error) {
        console.error(error);
    }
}; 

async function addPicture(formDatas,request) {

       // récupérations des autres éléments constitutifs des options de la requête
        let storedToken = window.sessionStorage.getItem("myToken");
        let bearer = "Bearer " + storedToken;
        let httpOptions = "";

        if (storedToken !== null) {
            const headersContent = {
                "Accept": "*/*",
                "Authorization": bearer
            };
            const headers = new Headers(headersContent);
            httpOptions = {
                method: "POST",
                headers: headers,
                body: formDatas
            };
            // console.log(httpOptions);
        }
        try {
            const response = await fetch(request, httpOptions);
            console.log(response.status);
            
            if (response.status === 201) {
                alert('image correctement ajoutée');
            
            } else {
                alert(response.status);
                throw new Error(response.status);
            }
        } catch (error) {
            console.error(error);
        }
        return false;
}
