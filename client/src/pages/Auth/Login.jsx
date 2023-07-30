import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import { useAuth } from "../../context/Auth.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const loginImg = "/assets/LoginImg.png";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {
            email,
            password,
            });
            if (!email) {
                toast.error("Escribe tu correo electrónico!", {
                    position: "top-center"
                });
            } else if (!email.includes("@")) {
                toast.warning("Formato de email incorrecto!", {
                    position:"top-center"
                });
            } else if (!password) {
                toast.error("Escribe tu contraseña!", {
                    position:"top-center"
                });
            } 
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/rooms");
            } else {
                toast.error(res.data.message);
            }
            } catch (error) {
            console.log(error);
            toast.error("Credenciales invalidas",{
                position:"top-center"
            });
        } 
    };
    
    const [showPwd, setShowPwd] = useState(false)

    return (
        <Layout>
        <div className="container-fluid">
            <div className="row">
                <img
                    src={loginImg}
                    className="img-fluid"
                    width="100%"
                    alt="Login"
                />
            </div>
            <div className="row text-center logincol">
                <h1 className="col py-5 fs-1 fw-bold text-white">
                    Login
                </h1>
            </div>
            <div className="row form-login">
                <form className="col-sm-6 bg-white p-5" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userEmailInput" className="form-label">
                        Email
                        </label>
                        <input
                        type="email"
                        className="form-control"
                        id="userEmailInput"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div className="mb-3 form-log">
                        <label htmlFor="passwordInput" className="form-label">
                        Contraseña
                        </label>
                        <input
                        type={showPwd ? "text" : "password"}
                        className="form-control"
                        id="passwordInput"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <div className='position-icon pointer' onClick={() => setShowPwd(!showPwd)}>
                            {showPwd ? <FaEye/> : <FaEyeSlash/>}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-form">
                        Inicia sesión
                    </button>
                    <Link to="/password-reset">
                        <p className="p-2">¿Has olvidado tu contraseña?</p>
                    </Link>
                    </form>
                    <ToastContainer/>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
