import React, { useState } from 'react';
import { Button, Input } from 'antd';
import logo from "../asset/logo.png";
import { useNavigate } from 'react-router-dom';

export default function PageAutentification() {
    const [connection, setConnection] = useState({ login: "", password: "" });
    const [nouveauCompte, setNouveauCompte] = useState({ nom: "", prenon: "", login: "", password: "" });
    const [view, setView] = useState("connction");
    const n = useNavigate()


    const handleConncetionButtonClick = () => {
        alert('Login: '+ connection.login +' Password: '+ connection.password);
        n("/bibliotheque")
    };
    const handleNouveauCompteButtonClick= () => {
        alert(JSON.stringify(nouveauCompte))
        n(0)
    }
    const newCompteOrConnection = (value) => {
        setView(value);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1, backgroundColor: '#ff9600' }}>
                <center><img src={logo} alt="logo" /></center>
                <br />
                <center><b><h1 style={{ fontSize: "50px", fontFamily: "monospace" }}>***ISI Memory***</h1></b></center>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                {view === "connction" ? (
                    <>
                        <h1 style={{ marginBottom: '50px', fontStyle: "italic", fontSize: "60px" }}>Connection:</h1>
                        <div style={{ width: '80%', marginBottom: '20px' }}>
                            <Input
                                placeholder="entrez votre login..."
                                value={connection.login}
                                onChange={(e)=>setConnection({...connection,login:e.target.value})}
                                style={{ backgroundColor: '#ff9600', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <div style={{ width: '80%', marginBottom: '20px' }}>
                            <Input
                                placeholder="entrez votre mot de passe..."
                                type="password"
                                value={connection.password}
                                onChange={(e)=>setConnection({...connection,password:e.target.value})}
                                style={{ backgroundColor: '#ff9600', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <Button
                            type="primary"
                            onClick={handleConncetionButtonClick}
                            style={{ backgroundColor: '#ff9600', borderRadius: '20px', minWidth: '30%', minHeight: '50px', padding: '10px' }}
                        >
                            connection
                        </Button>
                        <p style={{ marginTop: '50px', fontStyle: 'italic', fontSize: "15px" }}>
                            je ne suis pas d'isi , je souhaite <a onClick={() => newCompteOrConnection("newCompte")} style={{ color: '#ff9600', cursor: 'pointer' }}>creer un compte</a>
                        </p>
                    </>
                ) : (
                    <>
                        <h1 style={{ marginBottom: '50px', fontStyle: "italic", fontSize: "60px" }}>Créer un Compte:</h1>
                        <div style={{ width: '80%', marginBottom: '20px' }}>
                            <Input
                                placeholder="entrez votre nom..."
                                value={nouveauCompte.nom}
                                onChange={(e)=>setNouveauCompte({...nouveauCompte,nom:e.target.value})}
                                style={{ backgroundColor: '#ff9600', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <div style={{ width: '80%', marginBottom: '20px' }}>
                            <Input
                                placeholder="entrez votre prenom..."
                                type="text"
                                value={nouveauCompte.prenon}
                                onChange={(e)=>setNouveauCompte({...nouveauCompte,prenon:e.target.value})}
                                style={{ backgroundColor: '#ff9600', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <div style={{ width: '80%', marginBottom: '20px' }}>
                            <Input
                                placeholder="entrez votre login..."
                                value={nouveauCompte.login}
                                onChange={(e)=>setNouveauCompte({...nouveauCompte,login:e.target.value})}
                                style={{ backgroundColor: '#ff9600', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <div style={{ width: '80%', marginBottom: '20px' }}>
                            <Input
                                placeholder="entrez votre mot de passe..."
                                type="password"
                                value={nouveauCompte.password}
                                onChange={(e)=>setNouveauCompte({...nouveauCompte,password:e.target.value})}
                                style={{ backgroundColor: '#ff9600', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <Button
                            type="primary"
                            onClick={handleNouveauCompteButtonClick}
                            style={{ backgroundColor: '#ff9600', borderRadius: '20px', minWidth: '30%', minHeight: '50px', padding: '10px' }}
                        >
                            créer un compte
                        </Button>
                        <p style={{ marginTop: '50px', fontStyle: 'italic' }}>
                            Déjà un compte ? <a onClick={() => newCompteOrConnection("connction")} style={{ color: '#ff9600', cursor: 'pointer' }}>Se connecter</a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
