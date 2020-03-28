import React from 'react';
import { Link } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg'

function Profile() {

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, </span>
                <Link to="/incidents/new" className='button'>
                    Cadastrar novo caso
                </Link>
                <button>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {[1, 2, 3, 4].map( (test, index) =>
                    <li key={index}>
                        <strong>CASO:</strong>
                        <p>Caso teste</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>Descrição teste</p>

                        <strong>VALOR:</strong>
                        <p>120</p>

                        <button>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Profile