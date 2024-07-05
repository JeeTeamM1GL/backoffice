import React from 'react';
import { Input, Button } from 'antd';
import NavBar from './composants/Navbar.tsx';
import {Memoire} from '../front/composants/Items.tsx';
import { useNavigate } from 'react-router-dom';

export default function PageModifierAjouterMemoire() {
    const n = useNavigate()
    return (
        <>
            <NavBar />
            <div style={{ display: 'flex', height: '100vh' }}>

                <div style={{ flex: 4, padding: '20px' }}>
                    <h2>Liste des memoires</h2>
                    <Input placeholder="Entrez le nom d'un memoire..." style={{ width: '100%', marginBottom: '20px' }} />

                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        {Array.from({ length: 60 }).map((_, index) => (
                                <Memoire id={''} nom={''} anneeScolaire={''} classe={''} filiere={''} image={''}/>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}
