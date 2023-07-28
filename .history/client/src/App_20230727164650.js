import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import FullCalendarApp from './pages/FullCalendar';
import Rooms from './pages/Rooms.jsx';
import RoomManagement from './pages/RoomManagement';
import EachRoom from './pages/EachRoom.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/calendar' element={<FullCalendarApp/>}/>
        <Route path='/rooms' element={<Rooms/>}/>
        <
        <Route path='/rooms/:id' element={<EachRoom/>}/>
      </Routes>
    </>
  );
}

export default App;
