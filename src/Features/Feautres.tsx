import { IMemoire } from "../interfaces/interfaces";

 const memoiresFeatures: IMemoire[] = Array.from({ length: 60 }).map((_, index) => (
    {
    id: index,
    image: "https://e4t5x9m6.rocketcdn.me/wp-content/uploads/2020/04/1_A4_reliure_plastique.jpg",
    titre: `Memoire ${index + 1}`,
    description: 'Description...',
    dateSoutenance: new Date(),
    document: '',
    auteur: {
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: '',
      phone: { indicatif: '', phoneNumber: '' },
      password: '',
      createdAt: new Date().toString(),
      updateAt: new Date().toString(),
      isActive: true,
    },
    encadreur: { id: 1, specialite: '', createdAt: new Date().toString(), updateAt: new Date().toString(), isActive: true },
    jury: { id: 1, membre1: '', membre2: '', membre3: '', createdAt: new Date().toString(), updateAt: new Date().toString(), isActive: true },
    year: '2023-2024',
    categorie: { id: 1, nom: 'Categorie', description: '', createdAt: new Date().toString(), updateAt: new Date().toString(), isActive: true },
    filiere: { id: 1, intitule: 'Filière X', createdAt: new Date().toString(), updateAt: new Date().toString(), isActive: true },
    classe: { id: 1, nom: 'Classe A', createdAt: new Date().toString(), updateAt: new Date().toString(), isActive: true },
    isActive: true,
    createdAt: new Date().toString(),
    updateAt: new Date().toString(),
  }
));

export default memoiresFeatures