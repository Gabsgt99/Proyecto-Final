import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de react-toastify
import Login from './pages/Auth/Login.jsx';
import Rooms from './pages/Rooms.jsx';
import RoomManagement from './pages/RoomManagement';
import EachRoom from './pages/EachRoom.jsx';
import UserBookings from './pages/UserBookings';
import AdminBookings from './components/AdminBookings';
import RegisterPage from './pages/RegisterPage.jsx';
import PasswordReset from './components/PasswordReset.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import PrivateRoute from './components/Routes/Private.jsx';
import AdminRoute from './components/Routes/AdminRoute.jsx';
import UserPanel from './pages/User/UserPanel.jsx';
import AdminPanel from './pages/Admin/AdminPanel.jsx';

function App() {
  return (
    <>
      <ToastContainer /> {/* Agrega ToastContainer aquí */}
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/password-reset" element={<PasswordReset />}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
        <Route path="/user-panel" element={<PrivateRoute/>}>
          <Route path='user' element={<UserPanel/>}/>
        </Route>
        <Route path="admin" element={<AdminRoute/>}>
          <Route path='/admin-panel' element={<AdminPanel/>}/>
        </Route>
        <Route path='/rooms' element={<Rooms/>}/>
        <Route path='/gestiondesalas' element={<RoomManagement/>}/>
        <Route path='/rooms/:id' element={<EachRoom/>}/>
        <Route path='/mybookings' element={<UserBookings/>}/>
        <Route path='/allbookings' element={<AdminBookings/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </>
  );
}

export default App;