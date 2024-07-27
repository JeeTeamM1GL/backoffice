import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function Autentification() {
    const [connection, setConnection] = useState({ login: "", password: "" });
    const [nouveauCompte, setNouveauCompte] = useState({ nom: "", prenon: "", login: "", password: "" });
    const [view, setView] = useState("connction");
    const n = useNavigate()


    const handleConncetionButtonClick = () => {
        alert('Login: '+ connection.login +' Password: '+ connection.password);
        n("/layout/home")
    };
    const handleNouveauCompteButtonClick= () => {
        alert(JSON.stringify(nouveauCompte))
        n(0)
    };
    const newCompteOrConnection = (value) => {
        setView(value);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1, backgroundColor: '#BEC9CB' }}>
                <center><img src={require('./../../asset/logo.png')} alt="logo" /></center>
                <br />
                <center><b><h1 style={{ fontSize: "50px", fontFamily: "monospace" }}>***ISI Memory***</h1></b></center>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                {view === "connction" ? (
                    <>
                        <h1 style={{ 
                            marginBottom: '50px', 
                            //fontStyle: "italic", 
                            fontSize: "60px" }}>Connexion</h1>
                        <div style={{ width: '50%', marginBottom: '20px' }}>
                            <Input
                                placeholder=" Entrer votre login"
                                value={connection.login}
                                size='large'
                                onChange={(e)=>setConnection({...connection,login:e.target.value})}
                                //style={{ backgroundColor: '#BEC9CB', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <br />
                        <div style={{ width: '50%', marginBottom: '20px' }}>
                            <Input
                                placeholder=" Entrer votre mot de passe"
                                type="password"
                                value={connection.password}
                                size='large'
                                onChange={(e)=>setConnection({...connection,password:e.target.value})}
                                //style={{ backgroundColor: '#BEC9CB', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <br />
                        <Button
                            type="primary"
                            size='large'
                            onClick={handleConncetionButtonClick}
                            style={{ 
                                // backgroundColor: '#BEC9CB', 
                                // borderRadius: '20px', 
                                // minWidth: '30%', 
                                // minHeight: '50px', 
                                // padding: '10px' 
                                width : "50%"
                            }}
                        >
                            Se connecter
                        </Button>
                        <p style={{ marginTop: '50px', 
                            //fontStyle: 'italic', 
                            fontSize: "15px" }}>
                            Je ne suis pas d'isi , je souhaite <Button type='link' onClick={() => newCompteOrConnection("newCompte")}>créer un compte</Button>
                        </p>
                    </>
                ) : (
                    <>
                        <h1 style={{ marginBottom: '50px', 
                            //fontStyle: "italic", 
                            fontSize: "60px" }}>Créer un Compte:</h1>
                        <div style={{ width: '80%', marginBottom: '20px' }}>
                            <Input
                                placeholder="Entrer votre nom..."
                                size='large'
                                value={nouveauCompte.nom}
                                onChange={(e)=>setNouveauCompte({...nouveauCompte,nom:e.target.value})}
                                style={{ 
                                    //backgroundColor: '#BEC9CB', borderRadius: '20px', marginBottom: '10px', padding: '10px' 
                                }}
                            />
                        </div>
                        <br />
                        <div style={{ width: '80%', marginBottom: '20px' }}>
                            <Input
                                placeholder="Entrez votre prenom..."
                                type="text"
                                value={nouveauCompte.prenon}
                                onChange={(e)=>setNouveauCompte({...nouveauCompte,prenon:e.target.value})}
                                size='large'
                                //style={{ backgroundColor: '#BEC9CB', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <br />
                        <div style={{ width: '80%', marginBottom: '20px' }}>
                            <Input
                                placeholder="Entrez votre login..."
                                value={nouveauCompte.login}
                                size='large'
                                onChange={(e)=>setNouveauCompte({...nouveauCompte,login:e.target.value})}
                                //style={{ backgroundColor: '#BEC9CB', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <br />
                        <div style={{ width: '80%', marginBottom: '20px' }}>
                            <Input
                                placeholder="Entrez votre mot de passe..."
                                type="password"
                                size='large'
                                value={nouveauCompte.password}
                                onChange={(e)=>setNouveauCompte({...nouveauCompte,password:e.target.value})}
                                //style={{ backgroundColor: '#BEC9CB', borderRadius: '20px', marginBottom: '10px', padding: '10px' }}
                            />
                        </div>
                        <br />
                        <Button
                            type="primary"
                            size='large'
                            onClick={handleNouveauCompteButtonClick}
                            style={{
                                width:"80%"
                            }}
                            //style={{ backgroundColor: '#BEC9CB', borderRadius: '20px', minWidth: '30%', minHeight: '50px', padding: '10px' }}
                        >
                            créer un compte
                        </Button>
                        <p style={{ marginTop: '50px', fontStyle: 'italic' }}>
                            Déjà un compte ? <Button type='link' onClick={() => newCompteOrConnection("connction")} style={{ color: '#BEC9CB', cursor: 'pointer' }}>Se connecter</Button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Autentification;
