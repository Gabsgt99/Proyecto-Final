import React from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import room1 from "../Assets/ROOM1.png"




function ReunionPage() {
  return ( 
  <>

<div className="container-fluid">

<div className="row">
  <div className="col-sm-6 col-lg-5 bg-success">
    <img src={room1} className="room" alt="sala de reuniones" />
  </div>
  


   
  <div className="col-sm-6 col-lg-5">
  <Fullcalendar
  plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
  initialView={'dayGridMonth'}
  />
  </div>

    </div>
    </div>
  </> );      
};

export default ReunionPage