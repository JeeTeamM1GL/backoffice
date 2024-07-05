import React from 'react';
import { Input, Button } from 'antd';
import NavBar from './composants/Navbar.tsx';
import { useNavigate } from 'react-router-dom';

export default function PageModifierAjouterMemoire() {
    const n=useNavigate()
    return (
    <><NavBar /><div style={{ display: 'flex', height: '100vh' }}>

            <div style={{ flex: 4, padding: '20px' }}>
                <h2>Liste des memoires</h2>
                <Input placeholder="Entrez le nom d'un memoire..." style={{ width: '100%', marginBottom: '20px' }} />

                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    {Array.from({ length: 60 }).map((_, index) => (
                        <div key={index} style={{ backgroundColor: '#ff9600', height: '150px', textAlign: 'center', minWidth: "100px", maxWidth: "110px", margin: "10px" }}>
                            <p>memoire1</p>
                            <p>annee scolaire</p>
                            <p>classe-filiere</p>
                        </div>
                    ))}
                </div>

            </div>
        </div></>
    );
}
