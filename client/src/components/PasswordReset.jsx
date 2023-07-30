import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/FPassandRPass.css';
import Layout from './Layout/Layout.jsx';
import axios from 'axios';


const PasswordReset = () => {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const setVal = (e) => { setEmail(e.target.value) }

    const sendLink = async (e) => {
        e.preventDefault();
        if (email === "") {
            toast.error("Escribe un correo!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("El correo debe incluir una @!", {
                position: "top-center"
            });
        } else {
            const response = await axios.post("/api/v1/auth/sendpasswordlink", { email: email });
            if (response.status === 201) {
                setEmail("");
                toast.success("Te hemos enviado un correo electrónico con un link",{ position: "top-center" });
                setTimeout(() => {
                    navigate(location.state || "/");
                }, 2000);
            } else {
                toast.error("Invalid User",{ position: "top-center" });
            }
        }
    }

    return (
        <Layout>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h3>RESETEA TU CONTRASEÑA</h3>
                    </div>
                    <ToastContainer 
                        position="top-center"
                    />
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Escribe tu correo electrónico</label>
                            <input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Email' />
                        </div>

                        <button className='btn-form' onClick={sendLink}>Enviar</button>
                    </form>

                </div>
            </section>
        </Layout>
    )
}

export default PasswordReset;