import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {

    const { id, token } = useParams();

    const history = useNavigate();

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const userValid = async () => {
        const res = await axios.get(`/forgotpassword/${id}/${token}`, {
           /*  method: "GET",
            headers: {
                "Content-Type": "application/json"
            } */
        });

        const data = await res.json()

        if (data.status == 201) {
            console.log("Usuario valido")
        } else {
            history("*")
        }
    }


    const setval = (e) => {
        setPassword(e.target.value)
    }

    const sendpassword = async (e) => {
        e.preventDefault();

        if (!password) {
            toast.error("Escribe tu contraseña!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("La contraseña de tener más de 6 caracteres!", {
                position: "top-center"
            });
        } else {
            const res = await fetch(`/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json()

            if (data.status == 201) {
                setPassword("")
                setMessage(true)
            } else {
                toast.error("! Token Expired generate new LInk",{
                    position: "top-center"
                })
            }
        }
    }

    useEffect(() => {
        userValid()
        setTimeout(() => {
            setData(true)
        }, 3000)
    }, [])

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Escribe tu nueva contraseña</h1>
                    </div>
                    <form>
                        {message ? <p style={{ color: "green", fontWeight: "bold" }}>Contraseña actualizada!</p> : ""}
                        <div className="form_input">
                            <label htmlFor="password">Nueva contraseña</label>
                            <input type="password" value={password} onChange={setval} name="password" id="password" placeholder='Enter Your new password' />
                        </div>
                        <button className='btn' onClick={sendpassword}>Enviar</button>
                    </form>
                    <p><NavLink to="/">Login</NavLink></p>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default ForgotPassword;