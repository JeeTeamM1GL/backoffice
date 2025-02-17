import React, { useState } from 'react';
import { Button, Input, Select, Pagination, Card } from 'antd';

import { Memoire as ItemMemoire} from '../../front/composants/Items.tsx';

const { Option } = Select;

const memoires = Array.from({ length: 60 }).map((_, index) => ({
  id: index,
  nom: `Memoire ${index + 1}`,
  anneeScolaire: '2023-2024',
  classe: 'Classe A',
  filiere: 'Filière X',
  image: '' // Ajoutez les chemins des images si disponibles
}));

const ITEMS_PER_PAGE = 18; // Nombre d'items par page

export default function Memoire() {
    const [filtre, setFiltre] = useState({
        typeDeFiltre: "tout-voir",
        filtrerPar: "jury",
        objetDuFiltre: "",
        placeholder: "entrez le nom du jury à filtrer..."
    });

    const [currentPage, setCurrentPage] = useState(1);

    const handleFilterChange = (value) => {
        if (value === "tout-voir") {
            setFiltre({ ...filtre, typeDeFiltre: "tout-voir" });
        } else if (value === "filtrer") {
            setFiltre({ ...filtre, typeDeFiltre: "filtrer" });
        }
    };

    const handleFilterByChange = (value) => {
        if (value === "jury") {
            setFiltre({ ...filtre, filtrerPar: "jury", placeholder: "entrez le nom du jury à filtrer..." });
        } else if (value === "annee-scolaire") {
            setFiltre({ ...filtre, filtrerPar: "annee-scolaire", placeholder: "entrez l'année scolaire à filtrer..." });
        } else if (value === "filiere") {
            setFiltre({ ...filtre, filtrerPar: "filiere", placeholder: "entrez la filière à filtrer..." });
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentMemoires = memoires.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <Card>

            <div style={{ padding: '20px'}}>
                <div style={{ backgroundColor: '#BEC9CB', padding: '20px', display: 'flex' }}>
                    <Select
                        value={filtre.typeDeFiltre}
                        onChange={handleFilterChange}
                        style={{ width: '150px', marginLeft: '10px' }}
                    >
                        <Option value="tout-voir">Tout voir</Option>
                        <Option value="filtrer">Filtrer</Option>
                    </Select>
                    {filtre.typeDeFiltre === "filtrer" && (
                        <>
                            <p style={{marginTop:"5px"}}>{"Par:"}</p>
                            <Select
                                placeholder="par jury"
                                value={filtre.filtrerPar}
                                onChange={handleFilterByChange}
                                style={{ width: '150px', marginLeft: '10px' }}
                            >
                                <Option value="jury">Jury</Option>
                                <Option value="annee-scolaire">Année scolaire</Option>
                                <Option value="filiere">Filière</Option>
                            </Select>
                            <Input
                                placeholder={filtre.placeholder}
                                value={filtre.objetDuFiltre}
                                onChange={(e) => setFiltre({ ...filtre, objetDuFiltre: e.target.value })}
                                style={{ width: '300px', marginLeft: '10px' }}
                            />
                        </>
                    )}
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", maxHeight: "70%", overflow: "auto" }}>
                        {currentMemoires.map((memoire, index) => (
                            <ItemMemoire body={memoire}  />
                        ))}
                    </div>
                    <Pagination
                        current={currentPage}
                        pageSize={ITEMS_PER_PAGE}
                        total={memoires.length}
                        onChange={handlePageChange}
                        style={{ marginTop: '20px' }}
                    />
                </div>
            </div>
        </Card>
    );
}
