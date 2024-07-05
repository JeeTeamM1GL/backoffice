import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Select } from 'antd';

const { Option } = Select;

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const currentUrl = location.pathname;

    useEffect(() => {
        console.log(currentUrl);
    }, [currentUrl]);

    const handleNavigationChange = (value) => {
        navigate(value);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light " style={{ boxShadow: '0 5px 20px 0px gray' }}>
            <div style={{ minHeight: "50px", display: 'flex', alignItems: 'center', padding: '10px' }}>
                <a className="navbar-brand" href="#">Navbar</a>
                <Select
                    defaultValue={currentUrl}
                    style={{ width: 200, marginLeft: 'auto' }}
                    onChange={handleNavigationChange}
                >
                    <Option value="/">Page d'Authentification</Option>
                    <Option value="/bibliotheque">Bibliothèque</Option>
                    <Option value="/memoireDetail">Mémoire Détail</Option>
                    <Option value="/memoire">Mémoire</Option>
                    <Option value="/memoire-lecture">Lecture de Mémoire</Option>
                    <Option value="/profil">Profil</Option>
                </Select>
            </div>
        </nav>
    );
}
