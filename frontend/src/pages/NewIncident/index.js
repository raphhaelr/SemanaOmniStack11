import React, { useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import logoImage from '../../assets/logo.svg'
import api from '../../services/api'
import { FiArrowLeft } from 'react-icons/fi'

export default function NewIncident() {
    const [data, setData] = useState({
        title: '',
        description: '',
        value: ''
    })

    const ongId = localStorage.getItem('ongId')

    const history = useHistory()

    const fieldOnChange = field => e => {
        setData({
            ...data,
            [field]: e.target.value
        })
    }

    async function handleNewIncident(e){
        e.preventDefault()

        try {
            await api.post('/incidents', data, {
                headers: {
                    authorization: ongId
                }
            })
            history.push('/profile')
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt='Be The Hero' />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroí para resolver isso.</p>
                    <Link className='back-link' to='/profile'>
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder='Título do caso'
                        value={data.title}
                        onChange={fieldOnChange('title')}
                    />
                    <textarea placeholder='Descrição'
                        value={data.description}
                        onChange={fieldOnChange('description')}
                    />
                    <input placeholder='Valor em reais'
                        value={data.value}
                        onChange={fieldOnChange('value')}
                    />
                    <button type='submit' className='button'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}