import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/api'
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();

    const { setIsAuth } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [validation, setValidation] = useState([]);
    const [loginFailed, setLoginFailed] = useState([]);

    const login = async (e) => {
        e.preventDefault()

        await Api.post('/api/login', {
            email: email,
            password: password
        })
        .then((response) => {
            // set token and cookie to user
            Cookies.set('token', response.data.data.token)
            Cookies.set('user',  JSON.stringify(response.data.data.user))

            setIsAuth(true)

            navigate("/admin/dashboard" ,{ replace: true })
        })
        .catch(error => {
            setValidation(error.response.data)
            setLoginFailed(error.response.data)
        })
    }

    useEffect(() => {
        console.log(Cookies.get('user'))
    }, [])

    return (
       <div className="row justify-content-center">
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card border-0 rounded shadow-sm">
                    <div className="card-body">
                        <h4>LOGIN</h4>
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
                        {
                            loginFailed.message && (
                                <div className='alert alert-danger mt-2'>
                                    {loginFailed.message}
                                </div>
                            )
                        }
                        <form onSubmit={login}>
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
                            <button type="submit" className="btn btn-primary">LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       </div>
    )
}
