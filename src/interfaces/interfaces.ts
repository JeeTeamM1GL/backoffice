export interface IAdmin extends IAbstractEntity {
    lastname?: string;
    firstname?: string;
    username?: string;
    password?: string;
}
export interface ICommentaire extends IAbstractEntity {
    texte?: string;
    datePublication?: Date;
    memoire?: IMemoire;
    password?: ILecteur;
}


export interface IAbstractEntity {
    id?: number;
    createdAt?: string;
    updateAt?: string;
    isActive?: boolean;
}

// Phone export interface
export interface IPhone {
    indicatif?: string;
    phoneNumber?: string;
}

// User export interface
export interface IUser extends IAbstractEntity {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: IPhone;
    password?: string;

}

// Bibliothecaire export interface
export interface IBibliothecaire extends IUser, IAbstractEntity { }

// Administrateur export interface
export interface IAdministrateur extends IUser, IAbstractEntity { }

// Auteur export interface
export interface IAuteur extends IUser, IAbstractEntity { }

// Lecteur export interface
export interface ILecteur extends IUser, IAbstractEntity {
    isMember?: boolean;
}

// Encadreur export interface
export interface IEncadreur extends IAbstractEntity {
    specialite?: string;
    memoires?: IMemoire[];
}

// GradeJury Enum
export enum GradeJury {
    PRESIDENT,
    RAPPORTEUR,
    EXAMINATEUR
}

// Jury export interface
export interface IJury extends IAbstractEntity {
    membre1?: string;
    membre2?: string;
    membre3?: string;
}
export interface IMembreJury extends IAbstractEntity {
    grade?: GradeJury;
    specialite?: string;
}

// Classe export interface
export interface IClasse extends IAbstractEntity {
    nom?: string;
    memoires?: IMemoire[];
}

// ClassFiliere export interface
export interface IClassFiliere extends IAbstractEntity { }

// Filiere export interface
export interface IFiliere extends IAbstractEntity {
    intitule?: string;
    memoires?: IMemoire[];
}

// Memoire export interface
export interface IMemoire extends IAbstractEntity {
    image?: string;
    titre?: string;
    description?: string;
    dateSoutenance?: Date;
    document?: string;
    auteur?: IAuteur;
    encadreur?: IEncadreur;
    jury?: IJury;
    year?: string;
    categorie?: ICategorie;
    filiere?: IFiliere;
    classe?: IClasse;
}

// Categorie export interface
export interface ICategorie extends IAbstractEntity {
    nom?: string;
    description?: string;
    memoires?: IMemoire[];
}
export interface PartageMemoireDbContext extends IAbstractEntity {
    Admins?: IAdministrateur[];
    Bibliothecaires?: IBibliothecaire[];
    Lecteurs?: ILecteur[];
    Encadreurs?: IEncadreur[];
    Filieres?: IFiliere[];
    Classes?: IClasse[];
    Categories?: ICategorie[];
    Memoires?: IMemoire[];
    Commentaires?: ICommentaire[];
    Likes?: ILike[];
    HistoriqueConsultations?: IHistoriqueConsultation[];
    TdErreurs?: any[];
}
// HistoriqueConsultation export interface
export interface IHistoriqueConsultation extends IAbstractEntity {
    dateConsultation?: Date;
    memoire?: IMemoire;
    lecteur?: ILecteur;
}

// Commentaire export interface
export interface ICommentaire extends IAbstractEntity {
    texte?: string;
    datePublication?: Date;
}

// Likes export interface
export interface ILike extends IAbstractEntity {
    nombreLikes?: number;
    memoire?: IMemoire;
    lecteur?: ILecteur;
}

// Abonnement export interface
export interface IAbonnement extends IAbstractEntity { }

export interface ITdErreur {
    id?: number;
    dateErreur?: Date | null;
    descriptionErreur?: string;
    titreErreur?: string;
}