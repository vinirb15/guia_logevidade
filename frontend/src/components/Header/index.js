import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiLogIn, FiEdit } from 'react-icons/fi';
import Logo from '../../assets/user.png'

import './styles.css'

export default function Header() {

    const [loading, setLoading] = useState(true)

    const houseEmail = localStorage.getItem('houseEmail');
    const houseId = localStorage.getItem('houseId');
    const houseName = localStorage.getItem('houseName');

    useEffect(() => {
        if (!houseEmail) {
            setLoading(false)
        }
    }, [houseEmail]);

    const history = useHistory();

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    function handleLogin() {
        localStorage.clear();

        history.push('/logon');
    }

    function handleRegister() {
        localStorage.clear();

        history.push('/register');
    }

    function handleProfile() {
        history.push('/register');
    }

    const loged = (
        <header className="top">
            <Link to={"/house/"+ houseId}>
            <img src={Logo} className="logo" alt="logo" />
            </Link>
            <span>Bem vindo, {houseName}</span>

            <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#5e8dff" />
            </button>
        </header>
    )

    const unloged = (
        <header className="top">
            <span>Cadastre-se</span>

            <button onClick={handleLogin} type="button">
                <FiLogIn size={18} color="#5e8dff" />
            </button>

            <button onClick={handleRegister} type="button">
                <FiEdit size={18} color="#5e8dff" />
            </button>
        </header>
    )

    return (loading ? loged : unloged)
}