import React, { useState } from 'react';
import { Card, Input, Pagination } from 'antd';
import { Memoire } from '../../front/composants/Items.tsx';
import { useNavigate } from 'react-router-dom';
// import logo from "../../asset/logo.png";

const memoires = Array.from({ length: 60 }).map((_, index) => ({
  id: index,
  nom: `Memoire ${index + 1}`,
  anneeScolaire: '2023-2024',
  classe: 'Classe A',
  filiere: 'Filière X',
  image: '' // Ajoutez les chemins des images si disponibles
}));

const ITEMS_PER_PAGE = 18; // Nombre d'items par page

export default function Bibliotheque() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMemoires = memoires.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Card>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: 4, padding: '20px' }}>
          <h2>Liste des memoires</h2>
          <Input placeholder="Entrez le nom d'un memoire..." style={{ width: '100%', marginBottom: '20px' }} />
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", maxHeight: "70%", overflow: "auto" }}>
            {currentMemoires.map((memoire, index) => (
              <Memoire body={memoire}  />
            ))}
          </div>
          <Pagination
            current={currentPage}
            pageSize={ITEMS_PER_PAGE}
            total={memoires.length}
            onChange={handlePageChange}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        </div>
      </div>
    </Card>
  );
}
