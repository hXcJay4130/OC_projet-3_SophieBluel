async function getAllWorks() {
    // Récupération des données provenant du back-end pour les travaux
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
};


async function getAllCategories() {
    // Récupération des données provenant du back-end pour les catégories
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    return categories;
};

async function deleteWorkAPI(workId) {
    let storedToken = window.localStorage.getItem("token");
    let url = "";
    let httpOptions = "";
    let bearer = "Bearer " + storedToken;
    console.log(bearer);

    if (storedToken !== null) {
        const headersContent = {
        "Accept": "*/*",
        "Authorization": bearer
        };
        console.log(headersContent);
        const headers = new Headers(headersContent);
        console.log(headers);
        httpOptions = {
        method : "DELETE",
        headers: headers,
        };
        url = "http://localhost:5678/api/works/" + workId;
        console.log(httpOptions);
    }
    try {     
        const response = await fetch(url, httpOptions);
        console.log(response.status);
    } catch (error) {
        console.error(error);
    }
}; 

async function addPicture(formDatas) {

       // récupérations des autres éléments constitutifs des options de la requête
        let storedToken = window.localStorage.getItem("token");
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
            console.log(httpOptions);
        }
        try {
            const response = await fetch("http://localhost:5678/api/works", httpOptions);
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
