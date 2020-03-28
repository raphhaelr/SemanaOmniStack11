import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import heroesImage from '../../assets/heroes.png'
import logoImage from '../../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import './styles.css'

import api from '../../services/api'
import { useState } from 'react'



export default function Logon() {
    const [id, setID] = useState('')

    const onChange = evt => {
        setID(evt.target.value)
    }

    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault()

        try {
            const response = await api.post('/sessions', {
                id
            })

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)
            history.push('/profile')
        } catch (error) {
            alert('Falha no login, tente novamente.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt='Be The Hero' />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID"
                        value={id}
                        onChange={onChange}
                    />
                    <button className='button' type='submit'>Entrar</button>
                    <Link className='back-link' to='/register'> <FiLogIn size={16} color='#E02041' />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes" />
        </div>
    )
}