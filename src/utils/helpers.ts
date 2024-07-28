export const getBreadCrumbLabel = (item : string) => {
    let label = "";
    switch (item) {
        case "layout":
            label = "Mon espace";
            break;
        case "home":
            label = "Accueil";
            break;
        case "categories":
            label = "Catégories";
            break;
        case "memoires":
            label = "Mémoires";
            break;
        case "memoire-lecture":
            label = "Lecture Mémoire";
            break;
        case "settings":
            label = "Paramètres";
            break;
        case "profil":
            label = "Profil";
            break;
        case "libraries":
            label = "Bibliothèque";
            break;
        case "admins":
            label = "Admins";
            break;
        case "bibliothecaires":
            label = "Bibliothécaires";
            break;
        case "classes":
            label = "Classes";
            break;
        case "filieres":
            label = "Filières";
            break;
        case "lecteurs":
            label = "Lecteurs";
            break;
        default:
            break;
    }
    
    return label === "" ? item : label;

}

export const formatDate = (record:any) => {
    return (record === null || record === "" || record === undefined || record === "0001-01-01T00:00:00") ? "" : new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(record));
}