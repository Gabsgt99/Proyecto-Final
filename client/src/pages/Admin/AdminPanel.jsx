import React from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import AdminMenu from '../../components/Layout/AdminMenu.jsx';
import { useAuth } from '../../context/Auth.jsx';

const AdminPanel = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                <AdminMenu/>
                </div>
                <div className='col-md-9'>
                <div className='card w-75 p-3'>
                    <h3>Nombre del Admin: {auth?.user?.name}</h3>
                </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}

export default AdminPanel;