import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import '../styles/FPassandRPass.css';
import Layout from './Layout/Layout.jsx';


const PasswordReset = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

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
            const res = await fetch("/sendpasswordlink", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.status === 201) {
                setEmail("");
                setMessage(true)
            } else {
                toast.error("Invalid User",{
                    position: "top-center"
                })
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
                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>Te hemos enviado un correo electrónico con un link</p> : ""}
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