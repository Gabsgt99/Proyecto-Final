import React, { useState } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from 'react-toastify';
//import { faCode } from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import { useAuth } from "../../context/Auth.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";

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

    return (
        <Layout>
        <div className="form-container">
            <div className="row text-center">
            <div className="col col-login py-5 fs-1 fw-bold text-white">
                Login
            </div>
            </div>

            <div className="row">
            {/*  <div className="col-sm-6 bg-white p-5 align-items-center">
                <FontAwesomeIcon icon={faCode} className="icon-code" />
            </div> */}

            <div className="col-sm-6 bg-white p-5">
                <form onSubmit={handleSubmit}>
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
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                    Contraseña
                    </label>
                    <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button type="submit" className="btn btn">
                    Inicia sesión
                </button>
                <Link to="/password-reset">
                    <p className="p-2">¿Has olvidado tu contraseña?</p>
                </Link>
                </form>
                <ToastContainer/>
            </div>
            </div>
        </div>
        </Layout>
    );
}

export default Login;
