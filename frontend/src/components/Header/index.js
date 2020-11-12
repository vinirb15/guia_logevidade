import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiLogIn } from 'react-icons/fi';
import Logo from '../../assets/user.png'

import './styles.css'

export default function Header() {

    const [loading, setLoading] = useState(true)

    const houseId = localStorage.getItem('houseId');

    useEffect(() => {
        if(!houseId){
            setLoading(false)
        }
    }, [houseId]);

    const history = useHistory();

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    const loged = (
        <header className="top">
            <img src={Logo} className="logo" alt="logo" />
            <span>Bem vindo</span>


            <button onClick={handleLogout} type="button">
                <FiLogIn size={18} color="#5e8dff" />
            </button>

            <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#5e8dff" />
            </button>
        </header>
    )

    const unloged = (
        <header className="top">
            <span>Cadastre-se</span>

            <button onClick={handleLogout} type="button">
                <FiLogIn size={18} color="#5e8dff" />
            </button>
        </header>
    )

    return (loading ? loged : unloged)
}