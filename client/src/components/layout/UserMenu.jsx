import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
        <div className='text-center'>
            <div className="list-group">
                <h4>Menú de Usuario</h4>
                <NavLink to="/dashboard/user/profile" className="list-group-item">Perfil de Usuario</NavLink>
                <NavLink to="/dashboard/user" className="list-group-item">X</NavLink>
            </div>
        </div>
    </>
    )
}

export default UserMenu;