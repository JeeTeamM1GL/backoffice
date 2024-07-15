// Phone Interface
interface Phone {
    indicatif: string;
    phoneNumber: string;
}

// User Interface
interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: Phone;
    password: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
}

// Bibliothecaire Interface
interface Bibliothecaire extends User { }

// Administrateur Interface
interface Administrateur extends User { }

// Auteur Interface
interface Auteur extends User {
    attribute1: string;
}

// Lecteur Interface
interface Lecteur extends User {
    isMember: boolean;
    consulter(): void;
    liker(): void;
    commenter(): void;
}

// Encadreur Interface
interface Encadreur {
    specialite: string;
    id: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
}

// GradeJury Enum
enum GradeJury {
    President = "PRESIDENT",
    Rapporteur = "RAPPORTEUR",
    Examinateur = "EXAMINATEUR"
}

// Jury Interface
interface Jury {
    id: string;
    grade: GradeJury;
    specialite: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
}

// Classe Interface
interface Classe {
    id: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
}

// ClassFiliere Interface
interface ClassFiliere {
    id: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
}

// Filiere Interface
interface Filiere {
    id: string;
    nom: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
}

// Memoire Interface
interface Memoire {
    id: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
    numMemoire: string;
    image: string;
    titre: string;
    description: string;
    dateSoutenance: Date;
    document: string;
    auteur: Auteur
    encadreur: Encadreur;
    jury: Jury;
    annee: string;
}

// Categorie Interface
interface Categorie {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    nom: string;
    description: string;
    memoires : Memoire[];
}

// HistoriqueConsultation Interface
interface HistoriqueConsultation {
    id: string;
    dateConsultation: Date;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
}

// Commentaire Interface
interface Commentaire {
    id: string;
    texte: string;
    datePublication: Date;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
}

// Likes Interface
interface Likes {
    id: string;
    nombreLikes: number;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
}

// Abonnement Interface
interface Abonnement {
    id: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
}
