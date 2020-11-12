import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiLogIn, FiKey } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

// import logo from '../../assets/user.png';

export default function Register() {
    const [name, setName] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [cellNumber, setCellNumber] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            senha,
            email,
            description,
            cellNumber,
            city,
            uf
        }

        try {
            const response = await api.post('/house', data);

            alert(`Bem vindo(a): ${response.data.name}`);

            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, tente novamente');
        }

    }


    function mostrarOcultarSenha() {
        var senha = document.getElementById("password");
        if (senha.type == "password") {
          senha.type = "text";
        } else {
          senha.type = "password";
        }
      }

    return (
        <div className="register-container">
            <div className="content">
                <section>

                    <h1>Cadastro</h1>
                    <p>faça seu cadastro para ajudar nossos idosos!</p>

                    <Link className="back-link" to="/logon">
                        <FiLogIn size={16} color="#5e8dff" />
                        Faça login
                    </Link>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#5e8dff" />
                        Voltar
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da Organização"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        placeholder="Senha"
                        type="password"
                        id="password"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                        
                    <FiKey onClick={() => mostrarOcultarSenha()}/>

                    <input
                        type="email"
                        placeholder="E-Mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="Número de Contato  Ex:(xx)xxxx-xxxx"
                        value={cellNumber}
                        onChange={e => setCellNumber(e.target.value)}
                    />

                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}