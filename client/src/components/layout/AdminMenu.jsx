import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h4>Admin Menú</h4>
                    <NavLink to="/register" className="list-group-item">Registrar un Usuario</NavLink>
                    <NavLink to="/panel/admin/gestionsalas" className="list-group-item">Gestión de Salas</NavLink>
                    <NavLink to="/panel/admin/" className="list-group-item">Mis Reservas</NavLink>
                    <NavLink to="/dashboard/admin/users" className="list-group-item">Reservas Globales</NavLink>
                </div>
            </div>
        </>
    );
};

export default AdminMenu;