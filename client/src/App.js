import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login.jsx';
import FullCalendarApp from './pages/FullCalendar';
import Rooms from './pages/Rooms.jsx';
import EachRoom from './pages/EachRoom.jsx';
import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/calendar' element={<FullCalendarApp/>}/>
        <Route path='/rooms' element={<Rooms/>}/>
        <Route path='/rooms/:id' element={<EachRoom/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </>
  );
}

export default App;
