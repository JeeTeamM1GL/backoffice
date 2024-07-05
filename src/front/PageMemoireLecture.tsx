import { Button } from 'antd';
import React from 'react';
import NavBar from './composants/Navbar.tsx';

export default function PageMemoireLecture() {
    return (
        <><NavBar /><div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ backgroundColor: '#ff9600', padding: '20px', textAlign: 'right' }}>
                <Button style={{ backgroundColor: '#fff', color: '#ff9600' }}>Enregistrer</Button>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ fontSize: '50px', fontFamily: 'monospace' }}>Titre Mémoire</h1>
                <p>PAGE1 - page2 - page3 - ...</p>
            </div>
        </div></>
    );
}