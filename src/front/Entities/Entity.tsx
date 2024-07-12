// Phone Interface
interface Phone {
    indicatif: string;
    numeroPhone: string;
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
  
    selectAll(): User[];
    save(entity: User): void;
    update(entity: User): void;
    delete(entity: User): void;
    getById(id: string): User;
    login(): void;
  }
  
  // Bibliothecaire Interface
  interface Bibliothecaire extends User {}
  
  // Administrateur Interface
  interface Administrateur extends User {}
  
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
  
    selectAll(): Encadreur[];
    save(entity: Encadreur): void;
    update(entity: Encadreur): void;
    delete(entity: Encadreur): void;
    getById(id: string): Encadreur;
  }
  
  // GradeJury Enum
  enum GradeJury {
    PRESIDENT,
    RAPPORTEUR,
    EXAMINATEUR
  }
  
  // Jury Interface
  interface Jury {
    id: string;
    grade: GradeJury;
    specialite: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
  
    selectAll(): Jury[];
    save(entity: Jury): void;
    update(entity: Jury): void;
    delete(entity: Jury): void;
    getById(id: string): Jury;
  }
  
  // Classe Interface
  interface Classe {
    id: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
  
    selectAll(): Classe[];
    save(entity: Classe): void;
    update(entity: Classe): void;
    delete(entity: Classe): void;
    getById(id: string): Classe;
  }
  
  // ClassFiliere Interface
  interface ClassFiliere {
    id: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
  
    selectAll(): ClassFiliere[];
    save(entity: ClassFiliere): void;
    update(entity: ClassFiliere): void;
    delete(entity: ClassFiliere): void;
    getById(id: string): ClassFiliere;
  }
  
  // Filiere Interface
  interface Filiere {
    id: string;
    nom: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
  
    selectAll(): Filiere[];
    save(entity: Filiere): void;
    update(entity: Filiere): void;
    delete(entity: Filiere): void;
    getById(id: string): Filiere;
  }
  
  // Memoire Interface
  interface Memoire {
    id: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
    numMemoire: string;
    image:string;
    titre: string;
    description: string;
    dateSoutenance: Date;
    document: string;
    auteur:Auteur
    encadreur: Encadreur;
    jury: Jury;
    annee: string;
  
    selectAll(): Memoire[];
    save(entity: Memoire): void;
    update(entity: Memoire): void;
    delete(entity: Memoire): void;
    getById(id: string): Memoire;
  }
  
  // Categorie Interface
  interface Categorie {
    id: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
    nom: string;
    description: string;
  
    selectAll(): Categorie[];
    save(entity: Categorie): void;
    update(entity: Categorie): void;
    delete(entity: Categorie): void;
    getById(id: string): Categorie;
  }
  
  // HistoriqueConsultation Interface
  interface HistoriqueConsultation {
    id: string;
    dateConsultation: Date;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
  
    selectAll(): HistoriqueConsultation[];
    save(entity: HistoriqueConsultation): void;
    update(entity: HistoriqueConsultation): void;
    delete(entity: HistoriqueConsultation): void;
    getById(id: string): HistoriqueConsultation;
  }
  
  // Commentaire Interface
  interface Commentaire {
    id: string;
    texte: string;
    datePublication: Date;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
  
    selectAll(): Commentaire[];
    save(entity: Commentaire): void;
    update(entity: Commentaire): void;
    delete(entity: Commentaire): void;
    getById(id: string): Commentaire;
  }
  
  // Likes Interface
  interface Likes {
    id: string;
    nombreLikes: number;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
  
    selectAll(): Likes[];
    save(entity: Likes): void;
    update(entity: Likes): void;
    delete(entity: Likes): void;
    getById(id: string): Likes;
  }
  
  // Abonnement Interface
  interface Abonnement {
    id: string;
    creationDate: Date;
    updateDate: Date;
    isActive: boolean;
  
    selectAll(): Abonnement[];
    save(entity: Abonnement): void;
    update(entity: Abonnement): void;
    delete(entity: Abonnement): void;
    getById(id: string): Abonnement;
  }
  