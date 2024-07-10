import React, { useState } from 'react';
import { Button, Input } from 'antd';

const url = "http//exemple.com"

export default function PageAutentificationDto() {
    const seConnecter = async (login, password) => {
        await fetch(`${url}/api/pageOuverture/connection`, {
            method: 'POST',
            mode: 'cors', // Ajout de l'option 'cors'
            credentials: 'include', // Ajout pour envoyer les cookies
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                loginOrTel: login,
                password: password,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la connexion : ' + response.statusText);
                }
                return response.json();
            });
    }
    const nouveauCompte = async (newUser) => {
        await fetch(`${url}/api/pageOuverture/docteur`, {
            method: 'POST',
            mode: 'cors', // Ajout de l'option 'cors'
            credentials: 'include', // Ajout pour envoyer les cookies
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ ...newUser, role: "docteur" })
        });
    }

}
