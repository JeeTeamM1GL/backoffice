import React, { useEffect, useState } from 'react';
import { Input, Button, Pagination, Col, Row, Select, Card, Upload } from 'antd';
import { IMemoire } from '../../interfaces/interfaces';
import TextArea from 'antd/es/input/TextArea';
import { Memoire } from '../../front/composants/Items.tsx';

const { Option } = Select;

// Simulated data
const memoiresFeatures: IMemoire[] = Array.from({ length: 60 }).map((_, index) => ({
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
}));

const ITEMS_PER_PAGE = 5; // Nombre d'items par page

export default function Profil() {
    const [currentPage, setCurrentPage] = useState(1);
    const [memoires, setMemoires] = useState<IMemoire[]>([]);

    useEffect(() => {
        const recupererTousMemoires = () => {
            // fonction pour recuperer les data du back

            // simulation
            setMemoires(memoiresFeatures);
        };
        recupererTousMemoires(); // Appeler la fonction ici
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentMemoires = memoires.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <Card>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '5px' }}>
                <div style={{ flex: 4, padding: '20px' }}>
                    <h2>Liste des memoires</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', overflowX: 'auto' }}>
                        {currentMemoires.map((memoire, index) => (
                            <Memoire key={index} body={memoire} />
                        ))}
                    </div>
                    <Pagination
                        current={currentPage}
                        pageSize={ITEMS_PER_PAGE}
                        total={memoires.length}
                        onChange={handlePageChange}
                        style={{ marginTop: '20px', textAlign: 'center' }}
                    />
                    <div style={{ padding: '20px', backgroundColor: '#fda437', borderRadius: '10px', marginTop: '20px' }}>
                        <h2 style={{ textAlign: 'center' }}>Modifier ou ajouter un Memoire :</h2>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={6}>
                                <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}>
                                    <center>
                                        <img src="https://e4t5x9m6.rocketcdn.me/wp-content/uploads/2020/04/1_A4_reliure_plastique.jpg" alt="image.jpg" style={{ width: '100%',height:"80%" }} /> <br/>
                                        <Upload style={{ width: '100%', marginTop: '10px' }}>
                                            <Button style={{ width: '100%', backgroundColor: '#333', color: '#fff',marginTop:"10px" }}>Changer</Button>
                                        </Upload>
                                    </center>

                                </div>
                            </Col>
                            <Col xs={24} md={18}>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={12}>
                                        <Input placeholder="memoire1" style={{ width: '100%' }} />
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Input placeholder="annee scolaire" style={{ width: '100%' }} />
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={12}>
                                        <Select placeholder="classes" style={{ width: '100%' }}>
                                            {/* Ajoutez les options ici */}
                                        </Select>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Select placeholder="filieres" style={{ width: '100%' }}>
                                            {/* Ajoutez les options ici */}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24}>
                                        <Input placeholder="autre champ 1" style={{ width: '100%' }} />
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24}>
                                        <Input placeholder="autre champ 2" style={{ width: '100%' }} />
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24}>
                                        <Input placeholder="autre champ 3" style={{ width: '100%' }} />
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24}>
                                        <Input placeholder="autre champ 4" style={{ width: '100%' }} />
                                    </Col>
                                </Row>
                                
                            </Col>
                            <Col xs={24} md={18}>
                               <Row gutter={[16, 16]}>
                                    <Col xs={24}>
                                        <TextArea placeholder="Description" rows={4} style={{ width: '100%' }} />
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} md={12}>
                                        <Button style={{ width: '100%', backgroundColor: '#333', color: '#fff' }}>Changer</Button>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Button style={{ width: '100%', backgroundColor: '#333', color: '#fff' }}>Appliquer Toutes les Modifications</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Card>
    );
}
