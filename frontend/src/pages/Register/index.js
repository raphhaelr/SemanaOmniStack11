import React, { useState } from 'react'
import './styles.css'
import logoImage from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'


export default function Register() {

    const [data, setData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        city: '',
        uf: ''
    })

    const fieldOnChange = field => e => {
        setData({
            ...data,
            [field]: e.target.value
        })
    }

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()
        try {
            const response = await api.post('/ongs', data)
            alert(`Seu ID de acesso: ${response.data.id}`)
            history.push('/')
        } catch (error) {
            alert('Erro no cadastro, tente novamente.')
        }
        
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt='Be The Hero' />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={16} color='#E02041' />
                        Não tenho cadastro
                    </Link>
                    <pre>{JSON.stringify(data)}</pre>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder='Nome da ONG'
                        value={data.name}
                        onChange={fieldOnChange('name')}
                    />
                    <input type='email' placeholder='Email'
                        value={data.email}
                        onChange={fieldOnChange('email')}
                    />
                    <input placeholder='Whatsapp'
                        value={data.whatsapp}
                        onChange={fieldOnChange('whatsapp')}
                    />
                    <div className="input-group">
                        <input placeholder='Cidade'
                            value={data.city}
                            onChange={fieldOnChange('city')}
                        />
                        <input placeholder='UF' style={{ width: 80 }}
                            value={data.uf}
                            onChange={fieldOnChange('uf')}
                        />
                    </div>
                    <button type='submit' className='button'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}