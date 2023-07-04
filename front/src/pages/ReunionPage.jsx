import React from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";




function ReunionPage() {
  return ( 
  <>
  
  <Fullcalendar
  plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
  initialView={'dayGridMonth'}
  />
    
  </> );      
};

export default ReunionPage