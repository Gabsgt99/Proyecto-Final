import React, { useState } from 'react';
import Layout from '../components/layout/Layout.jsx'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AuthStyles.css';

const Login = () => {
    const {email, setEmail} = useState("");
    const {password, setPassword} = useState("");
    const navigate = useNavigate();
  
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("/api/v1/auth/login",{
            email,
            password
        });
        if (res && res.data.success) {
            navigate("/");
        }
    } catch (error) {
        console.log(error);
        // alerta.error("Algo salió mal");
    }
  };
  
    return (
    <Layout>
        <div className='form-container'>
            <form>
                <div className="mb-3">
                    <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="inputEmail3"
                    />
                    </div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3"/>
                    </div>
                </div>
                <div className='mb-3'>
                    <Link to={'/forgot-password'}>Olvidaste la contraseña?</Link>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
        </div>
    </Layout>
  )
}

export default Login;