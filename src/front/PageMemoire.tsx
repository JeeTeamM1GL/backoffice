import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';

const { Option } = Select;

export default function PageMemoire() {
    const [jury, setJury] = useState('');

    const handleJuryChange = (value) => {
        setJury(value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ backgroundColor: '#ff9600', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Button style={{ backgroundColor: '#fff' }}>Filtrer</Button>
                <Select
                    placeholder="par jury"
                    value={jury}
                    onChange={handleJuryChange}
                    style={{ width: '150px', marginLeft: '10px' }}
                >
                    <Option value="jury1">Jury 1</Option>
                    <Option value="jury2">Jury 2</Option>
                </Select>
                <Input placeholder="entrez le nom du jury a filtrer..." style={{ width: '300px', marginLeft: '10px' }} />
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
                <div style={{ flex: 4, padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                    {Array.from({ length: 15 }).map((_, index) => (
                        <div key={index} style={{ backgroundColor: '#ff9600', height: '150px', textAlign: 'center' }}>
                            <p>memoire1</p>
                            <p>annee scolaire</p>
                            <p>classe-filiere</p>
                        </div>
                    ))}
                </div>
                <div style={{ flex: 2, backgroundColor: '#ff9600', padding: '20px', color: '#fff' }}>
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
    );
}
