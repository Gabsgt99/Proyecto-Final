import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h4>Admin Menú</h4>
                    <NavLink to="/" className="list-group-item">Crea una Categoría</NavLink>
                    <NavLink to="/dashboard/admin" className="list-group-item">Crea un producto</NavLink>
                    <NavLink to="/dashboard/admin/users" className="list-group-item">Usuarios</NavLink>
                </div>
            </div>
        </>
    );
};

export default AdminMenu;