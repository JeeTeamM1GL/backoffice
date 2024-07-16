export const getBreadCrumbLabel = (item : string) => {
    let label = "";
    switch (item) {
        case "layout":
            label = "Mon espace"
            break;
        case "home":
            label = "Accueil"
            break;
        case "categories":
            label = "Catégories"
            break;
        case "memoires":
            label = "Mémoires"
            break;
        case "settings":
            label = "Paramètres"
            break;
        case "profil":
            label = "Profil"
            break;
        case "libraries":
            label = "Bibliothèque"
            break;
        default:
            break;
    }
    return label === "" ? item : label;

}