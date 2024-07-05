import { Input, Button } from 'antd';
import React from 'react';
import NavBar from './composants/Navbar.tsx';

export default function PageProfile() {
    return (
        <><NavBar />
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ flex: 1, backgroundColor: '#ff9600', padding: '20px', color: '#fff' }}>
                    <p>Nom</p>
                    <p>Prenom</p>
                    <p>Email</p>
                    <p>Telephone</p>
                </div>
                <div style={{ flex: 4, padding: '20px' }}>
                    <h2>Liste des memoires</h2>
                    <Input placeholder="Entrez le nom d'un memoire..." style={{ width: '100%', marginBottom: '20px' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} style={{ backgroundColor: '#ff9600', height: '150px', textAlign: 'center' }}>
                                <p>memoire1</p>
                                <p>annee scolaire</p>
                                <p>classe-filiere</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#ff9600', color: '#fff' }}>
                        <h3>Modifier ou ajouter un Memoire :</h3>
                        <Input placeholder="memoire1" style={{ marginBottom: '10px' }} />
                        <Input placeholder="annee scolaire" style={{ marginBottom: '10px' }} />
                        <Input placeholder="classes" style={{ marginBottom: '10px' }} />
                        <Input placeholder="filieres" style={{ marginBottom: '10px' }} />
                        <Input placeholder="Description" style={{ marginBottom: '10px' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button style={{ backgroundColor: '#fff', color: '#ff9600' }}>Changer</Button>
                            <Button style={{ backgroundColor: '#fff', color: '#ff9600' }}>Appliquer Toute les Modifications</Button>
                        </div>
                    </div>
                </div>
            </div></>
    );
}


// import React from 'react';
// import { Input, Button } from 'antd';

// export default function PageModifierAjouterMemoire() {
//     return (
//         <div style={{ display: 'flex', height: '100vh' }}>
//             <div style={{ flex: 1, backgroundColor: '#ff9600', padding: '20px', color: '#fff' }}>
//                 <p>Nom</p>
//                 <p>Prenom</p>
//                 <p>Email</p>
//                 <p>Telephone</p>
//             </div>
//             <div style={{ flex: 4, padding: '20px' }}>
//                 <h2>Liste des memoires</h2>
//                 <Input placeholder="Entrez le nom d'un memoire..." style={{ width: '100%', marginBottom: '20px' }} />
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
//                     {Array.from({ length: 6 }).map((_, index) => (
//                         <div key={index} style={{ backgroundColor: '#ff9600', height: '150px', textAlign: 'center' }}>
//                             <p>memoire1</p>
//                             <p>annee scolaire</p>
//                             <p>classe-filiere</p>
//                         </div>
//                     ))}
//                 </div>
//                 <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#ff9600', color: '#fff' }}>
//                     <h3>Modifier ou ajouter un Memoire :</h3>
//                     <Input placeholder="memoire1" style={{ marginBottom: '10px' }} />
//                     <Input placeholder="annee scolaire" style={{ marginBottom: '10px' }} />
//                     <Input placeholder="classes" style={{ marginBottom: '10px' }} />
//                     <Input placeholder="filieres" style={{ marginBottom: '10px' }} />
//                     <Input placeholder="Description" style={{ marginBottom: '10px' }} />
//                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                         <Button style={{ backgroundColor: '#fff', color: '#ff9600' }}>Changer</Button>
//                         <Button style={{ backgroundColor: '#fff', color: '#ff9600' }}>Appliquer Toute les Modifications</Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

