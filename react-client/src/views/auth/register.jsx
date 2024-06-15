import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/api'

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [validation, setValidation] = useState([]);

    const register = async (e) => {
        e.preventDefault()

        await Api.post('/api/register', {
            name: name,
            email: email,
            password: password
        })
        .then(() => {
            console.log({ name, email, password })

            navigate('/login')
        })
        .catch(error => {
            setValidation(error.response.data)
        })
    }

    return (
       <div className="row justify-content-center">
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card border-0 rounded shadow-sm">
                    <div className="card-body">
                        <h4>REGISTER</h4>
                        <hr />
                        {
                            validation.errors && (
                                <div className='alert alert-danger mt-2 pb-0'>
                                    {
                                        validation.errors.map((error, index) => (
                                            <p key={index}>{error.path} : {error.msg}</p>
                                        ))
                                    }
                                </div>
                            )
                        }
                        <form onSubmit={register}>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <div className="form-group">
                                        <label className='mb-1 fw-bold' htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan name" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label className='mb-1 fw-bold' htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <label className='mb-1 fw-bold' htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">REGISTER</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       </div>
    )
}