import React, { useState, useEffect } from 'react';
import { FiMap, FiPhone, FiMail } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import Header from '../../components/Header';

export default function Profile() {

    const [houses, setHouses] = useState([]);

    useEffect(() => {
        loadIndex()
    }, []);

    async function loadIndex(event) {
        await api.get('/house').then(response => {
            setHouses(response.data);
            console.log(response)
        })
    }

    async function searchHouse(event) {
        try {
            let val = event.target.value;
            if (val === "") {
                loadIndex()
            }
            const response = await api.get(`/find/${val}`);

            setHouses(response.data)
        } catch (error) {
            loadIndex()
        }

    }

    return (

        <div className="profile-container">
            <Header />

            <h1>Casas cadastrados</h1>
            <input
                placeholder="Digite Sua Cidade"
                onChange={searchHouse}
            />

            <ul>
                {houses.map(house => (
                    <li key={house.id}>
                        <strong>Casa: </strong>
                        <p>{house.name}</p>

                        <strong>Endereço: </strong>
                        <p><FiMap /> {house.city} {house.uf}</p>

                        <strong>Contato: </strong>
                        <p><FiMail /> {house.email}</p>
                        <p><FiPhone /> {house.cellNumber}</p>
                    </li>
                ))}
            </ul>



        </div>
    )
}