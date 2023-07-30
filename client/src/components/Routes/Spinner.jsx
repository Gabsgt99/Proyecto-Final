import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Spinner = ({path = "/"}) => {
    const [ count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        },1000);
        count === 0 && navigate(`${path}`, {
            state: location.pathname,
        });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

  return (
    <>
        <div className="d-flex justify-content-center align-items-center" style={{ height:"100vh" }}>
            <h1 className='text-center'>Te redireccionara en {count} segundos</h1>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    </>
  );
};

export default Spinner;