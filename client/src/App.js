import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de react-toastify
import Login from './pages/Login.jsx';
import Rooms from './pages/Rooms.jsx';
import RoomManagement from './pages/RoomManagement';
import EachRoom from './pages/EachRoom.jsx';
import UserBookings from './pages/UserBookings';
import AdminBookings from './components/AdminBookings';

function App() {
  return (
    <>
      <ToastContainer /> {/* Agrega ToastContainer aquí */}
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/rooms' element={<Rooms/>}/>
        <Route path='/gestiondesalas' element={<RoomManagement/>}/>
        <Route path='/rooms/:id' element={<EachRoom/>}/>
        <Route path='/mybookings' element={<UserBookings/>}/>
        <Route path='/allbookings' element={<AdminBookings/>}/>
      </Routes>
    </>
  );
}

export default App;