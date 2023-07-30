import React from 'react'
import Layout from '../../components/Layout/Layout.jsx';
import UserMenu from '../../components/Layout/UserMenu.jsx';
import { useAuth } from '../../context/Auth.jsx';

const UserPanel = () => {
    const [ auth ] = useAuth();
    return (
        <Layout title={'User Panel'}>
        <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu/>
                    </div>
                    <div className='col-md-9'>
                    <div className='card w-75 p-3'>
                    <h3>{auth?.user?.name}</h3>
                    </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default UserPanel;