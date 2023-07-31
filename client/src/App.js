import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login.jsx';
import Rooms from './pages/Rooms.jsx';
import EachRoom from './pages/EachRoom.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PasswordReset from './components/PasswordReset.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import PrivateRoute from './components/Routes/Private.jsx';
import AdminRoute from './components/Routes/AdminRoute.jsx';
import UserPanel from './pages/User/UserPanel.jsx';
import AdminPanel from './pages/Admin/AdminPanel.jsx';
import RoomManagement from './pages/Admin/RoomManagement';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/password-reset" element={<PasswordReset />}/>
        {/* <Route path="/sendpasswordlink" element={<sendPasswordLink />}/> */}
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
       {/*  <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} /> */}
        <Route path="/panel" element={<PrivateRoute/>}>
          <Route path='user' element={<UserPanel/>}/>
          <Route path='user/profile' element={<UserPanel/>}/>
        </Route>
        <Route path="/panel" element={<AdminRoute/>}>
          <Route path='admin' element={<AdminPanel/>}/>
          <Route path='admin/gestionsalas' element={<RoomManagement/>}/>
          <Route path='admin/profile' element={<EditProfile/>}/>
        </Route>
        <Route path='/rooms' element={<Rooms/>}/>
        <Route path='/rooms/:id' element={<EachRoom/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </>
  );
}

export default App;
