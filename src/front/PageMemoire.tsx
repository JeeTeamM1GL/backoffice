import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import NavBar from './composants/Navbar.tsx';
import { Memoire } from './composants/Items.tsx';

const { Option } = Select;

export default function PageMemoire() {
    const [filtre, setFiltre] = useState({
        typeDeFiltre: "tout-voir",
        filtrerPar: "jury",
        objetDuFiltre: "",
        placeholder: "entrez le nom du jury à filtrer..."
    });

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

    return (
        <>
            <NavBar />
            <div>
                <div style={{ backgroundColor: '#ff9600', padding: '20px', display: 'flex' }}>
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
                <div style={{ display: 'flex', flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        {Array.from({ length: 15 }).map((_, index) => (
                            <Memoire key={index} id={index} nom={''} anneeScolaire={''} classe={''} filiere={''} image={''} />
                        ))}
                    </div>
                    <div style={{ flex: 2, backgroundColor: '#ff9600', padding: '20px', color: '#fff', minWidth: "450px" }}>
                        <h2>TITRE MEMOIRE</h2>
                        <p>Note sur 20</p>
                        <h3>Résumé du mémoire</h3>
                        <p>Résumé du mémoire...</p>
                        <h3>Commentaire jury</h3>
                        <p>Commentaire du jury...</p>
                        <Button style={{ backgroundColor: '#fff', color: '#ff9600' }}>OUVRIR</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
