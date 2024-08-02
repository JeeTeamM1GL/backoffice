import { BookingStatus } from "../interfaces/interfaces.ts";

export const getBreadCrumbLabel = (item : string) => {
    let label = "";
    switch (item) {
        case "layout":
            label = "Mon espace";
            break;
        case "home":
            label = "Accueil";
            break;
        default:
            break;
    }
    
    return label === "" ? item : label;

}

export const formatDate = (record:any) => {
    return (record === null || record === "" || record === undefined || record === "0001-01-01T00:00:00") ? "" : new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(record));
}


export const getTagColor = ( key : string | undefined) => {
    let result = "";
    switch (key) {
        case BookingStatus.Cancelled:
            result = "error"
            break;
        case BookingStatus.Pending:
            result = "processing"
            break;
        case BookingStatus.Confirmed:
            result = "success"
            break;
        default:
            result = "processing"
            break;
    }
    return result;
}