import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Layout from './Layout/Layout.jsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const ForgotPassword = () => {
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const token = searchParams.get("token");
    
    const navigate = useNavigate();
    const location = useLocation();

    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");


    const userValid = async () => {
        const res = await axios.get(`/api/v1/auth/forgotpassword?id=${id}&token=${token}`,{});
        if (res.status === 200) {
            console.log("Usuario valido")
        } else {
            toast.error("Usuario no registrado!", {
                position: "top-center"
            });
            navigate(location.state || "/");
        }
    }


    const sendpassword = async (e) => {
        e.preventDefault();

        if (!password || !cpassword) {
            toast.error("Debes completar todos los campos!", {
                position: "top-center"
            });
        } else if (password.length && cpassword.length < 6) {
            toast.error("La contraseña de tener más de 6 caracteres!", {
                position: "top-center"
            });
        } else if (password !== cpassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        } else {
            const res = await axios.post("/api/v1/auth/newPassword", { id, token, password });
            if (res.status === 201) {
                setPassword("");
                setCPassword("");
                toast.success("Contraseña actualizada!",{ position: "top-center" });
                setTimeout(() => {
                    navigate(location.state || "/");
                }, 1000);
            } else {
                toast.error("El link ha expirado, debes generar un nuevo email",{
                    position: "top-center"
                })
            }
        }
    }

    useEffect(() => {
        userValid();
        setTimeout(() => {
        }, 3000)
    });

    //Show password
    const [showPwd1, setShowPwd1] = useState(false)
    const [showPwd2, setShowPwd2] = useState(false)

    return (
        <Layout>
            <section>
                <div className="form_data">
                    <div className="form_heading form-forgot">
                        <h3>Crea tu nueva contraseña</h3>
                    </div>
                    <form>
                        <div className="mb-3 form-pass">
                            <label htmlFor="formGroupExampleInput" className="form-label">Nueva contraseña</label>
                            <input 
                            type={showPwd1 ? "text" : "password"} 
                            className="form-control" 
                            id="formGroupExampleInput" 
                            placeholder="Contraseña" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='position-absolute pointer' onClick={() => setShowPwd1(!showPwd1)}>
                                {showPwd1 ? <FaEye/> : <FaEyeSlash/>}
                            </div>
                        </div>
                            <div className="mb-3 form-pass">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Repite la contraseña</label>
                            <input 
                            type={showPwd2 ? "text" : "password"} 
                            className="form-control" 
                            id="formGroupExampleInput2" 
                            placeholder="Contraseña"
                            value={cpassword}
                            onChange={(e) => setCPassword(e.target.value)}
                            />
                            <div className='position-absolute pointer' onClick={() => setShowPwd2(!showPwd2)}>
                                {showPwd2 ? <FaEye/> : <FaEyeSlash/>}
                            </div>
                        </div>
                        <button className='btn btn-form' onClick={sendpassword}>Enviar</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </Layout>
    )
}

export default ForgotPassword;