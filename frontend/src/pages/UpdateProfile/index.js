import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiKey } from 'react-icons/fi';

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

    const [house, setHouse] = useState([]);

    const history = useHistory();

    const houseId = localStorage.getItem('houseId');
    const auth = localStorage.getItem('auth');

    useEffect(() => {
        loadProfile()
    }, []);

    async function loadProfile() {
        await api.get(`/house/${houseId}`,
            {
                headers: {
                    Authorization: `Bearer ${auth}`,
                }
            }).then(response => {
                setHouse(response.data[0]);
                console.log(response.data[0])
            })
    }

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
            const response = await api.put(`/house/${houseId}`, data, {
                headers: {
                    Authorization: `Bearer ${auth}`,
                }
            });

            alert(`Dados Atualizados!`);

            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, tente novamente');
        }

    }


    function mostrarOcultarSenha() {
        var senha = document.getElementById("password");
        if (senha.type === "password") {
            senha.type = "text";
        } else {
            senha.type = "password";
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>

                    <h1>Atualizar Dados</h1>
                    <p>preencha todos os campos antes de atualizar!</p>

                    <Link className="back-link" to={"/house/" + houseId}>
                        <FiArrowLeft size={16} color="#5e8dff" />
                        Voltar
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder={house.name}
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

                    <FiKey onClick={() => mostrarOcultarSenha()} />

                    <input
                        type="email"
                        placeholder={house.email}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        placeholder={house.cellNumber}
                        value={cellNumber}
                        onChange={e => setCellNumber(e.target.value)}
                    />

                    <textarea
                        placeholder={house.description}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder={house.city}
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input
                            placeholder={house.uf}
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Atualizar Dados</button>
                </form>
            </div>
        </div>
    );
}