import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import FullCalendarApp from './pages/FullCalendar';
import Rooms from './pages/Rooms.jsx';
import EachRoom from './pages/EachRoom.jsx';
import UserBookings from './components/UserBookings';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/calendar' element={<FullCalendarApp/>}/>
        <Route path='/rooms' element={<Rooms/>}/>
        <Route path='/rooms/:id' element={<EachRoom/>}/>
        <Route path='/mybookings' element={<UserBookings/>}/>
      </Routes>
    </>
  );
}

export default App;
