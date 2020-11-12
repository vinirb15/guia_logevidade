import React, { useState, useEffect } from 'react';
import { FiMap, FiPhone, FiMail, FiArrowLeft, FiPenTool, FiBookmark, FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css'

import Header from '../../components/Header';

export default function Profile() {

    const [house, setHouse] = useState([]);

    const houseId = localStorage.getItem('houseId');
    const auth = localStorage.getItem('auth');

    useEffect(() => {
        loadProfile()
    }, [houseId]);

    async function loadProfile() {
        await api.get(`/house/${houseId}`, {
            headers: {
                Authorization: `Bearer ${auth}`,
            }
        }).then(response => {
            setHouse(response.data[0]);
            console.log(response.data)
        })
    }

    return (

        <div className="profile-container">
            <Header />
            <Link className="back-link" to="/">
                <FiArrowLeft size={16} color="#5e8dff" />
                        Voltar
                    </Link>
            <h1>Perfil</h1>

            <ul>
                <li key={house.id}>
                    <strong>Casa: </strong>
                    <p><FiBookmark /> {house.name}</p>

                    <strong>Descrição: </strong>
                    <p><FiPenTool /> {house.description}</p>

                    <strong>Endereço: </strong>
                    <p><FiMap /> {house.city} {house.uf}</p>

                    <strong>Contato: </strong>
                    <p><FiMail /> {house.email}</p>
                    <p><FiPhone /> {house.cellNumber}</p>
                </li>
            </ul>

            <Link className="back-link" to={"/update/"+houseId}>
                <FiEdit size={16} color="#5e8dff" />
                        Editar Dados
                    </Link>

        </div>
    )
}