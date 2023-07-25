import React from 'react';
import room3 from './../Assets/ROOM3.png';
import FullCalendarComponent from '../components/FullCalendarComponent/FullCalendarComponent.jsx';


function MaryLeePage() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-lg-5 bg-success">
            <img src={room3} className="room" alt="sala de reuniones" />
          </div>
          <div className="col-sm-6 col-lg-5">
            <FullCalendarComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default MaryLeePage;