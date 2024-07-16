import React, { useState } from 'react';
import { Input, Button, Pagination } from 'antd';



const memoires = Array.from({ length: 60 }).map((_, index) => ({
  id: index,
  nom: `Memoire ${index + 1}`,
  anneeScolaire: '2023-2024',
  classe: 'Classe A',
  filiere: 'Filière X',
  image: '' // Ajoutez les chemins des images si disponibles
}));

const ITEMS_PER_PAGE = 6; // Nombre d'items par page

export default function Profil() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMemoires = memoires.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div style={{ display: 'flex', height: '100vh', padding: "5px" }}>
        {/* <div style={{ flex: 1, backgroundColor: '#BEC9CB', padding: '20px', color: '#fff' }}>
          <p>Nom</p>
          <p>Prenom</p>
          <p>Email</p>
          <p>Telephone</p>
        </div> */}
        <div style={{ flex: 4, padding: '20px' }}>
          <h2>Liste des memoires</h2>
          {/* <Input placeholder="Entrez le nom d'un memoire..." style={{ width: '100%', marginBottom: '20px' }} /> */}
          <div style={{ display: "flex", flexDirection: "row", maxHeight: "70%", overflowX: "auto", overflowY: "hidden" }}>
            {/* {currentMemoires.map((memoire, index) => (
              <Memoire body={undefined}  />
            ))} */}
          </div>
          <Pagination
            current={currentPage}
            pageSize={ITEMS_PER_PAGE}
            total={memoires.length}
            onChange={handlePageChange}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#BEC9CB', color: '#fff' }}>
            <h3>Modifier ou ajouter un Memoire :</h3>
            <Input placeholder="memoire1" style={{ marginBottom: '10px' }} />
            <Input placeholder="annee scolaire" style={{ marginBottom: '10px' }} />
            <Input placeholder="classes" style={{ marginBottom: '10px' }} />
            <Input placeholder="filieres" style={{ marginBottom: '10px' }} />
            <Input placeholder="Description" style={{ marginBottom: '10px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button style={{ backgroundColor: '#fff', color: '#BEC9CB' }}>Changer</Button>
              <Button style={{ backgroundColor: '#fff', color: '#BEC9CB' }}>Appliquer Toute les Modifications</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
