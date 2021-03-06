import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css'

export default function Logon() {
    const [email, setId] = useState('');
    const [senha, setPass] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/house/auth', { email, senha });
            localStorage.setItem('houseEmail', email);
            localStorage.setItem('houseId', response.data.user[0].id);
            localStorage.setItem('houseName', response.data.user[0].name);
            localStorage.setItem('auth', response.data.token);
            history.push('/');
        } catch (error) {
            alert('Falha no login, tente novamente')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setId(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setPass(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#5e8dff" />
                        Não tenho cadastro
                    </Link>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#5e8dff" />
                        Voltar
                    </Link>
                </form>

            </section>
        </div>
    );
}