// import React, { useState } from 'react';
// //import Layout from "../components/layout/Layout.jsx";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import * as bootstrap from 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../index.css'
// import Example from '../components/Modal2.jsx'
// import TimePickerComp from '../components/Timepicker.jsx';
// //import axios from 'axios';

// const events = [
//     {
//       id: 1,
//       title: 'event 1',
//       start: '2023-07-07T10:00:00',
//       end: '2023-07-07T12:00:00',
//     },
//     {
//       id: 2,
//       title: 'event 2',
//       start: '2023-07-10T13:00:00',
//       end: '2023-07-10T18:00:00',
//     },
//     { 
//       id: 3, 
//       title: 'event 3', 
//       start: '2023-07-17', 
//       end: '2023-07-20' },
//   ];

//   function FullCalendarApp () {
   
//     const [modalTitle, setModalTitle] = useState('Titulo');
//     const [modalBody, setModalBody] = useState('Body');
//     const [showModal, setShowModal] = useState(false);
//     const [startTP, setStartTP] = useState();

// const insertEvent = (start,end) => {
//     alert(start);
// }

//     const handleEventClick = (eventInfo) => {
//       setModalTitle('Reserva de sala');
//       setStartTP(eventInfo.start)
//       setModalBody(<>
        
//         <TimePickerComp initial={startTP}/>
//         <TimePickerComp initial={eventInfo.end}/>
//       </>);
//       setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//       };

//     return (
//         <>
//       <div className="App">
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           headerToolbar={{
//             start:"today prev,next",
//             //center:"tittle",
//             end: "dayGridMonth,timeGridWeek,timeGridDay new",
//           }}
//           views= {{
//         dayGrid: {
//           // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
//           titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' }
//         },
//         timeGrid: {
//           // options apply to timeGridWeek and timeGridDay views
//         },
//         week: {
//           // options apply to dayGridWeek and timeGridWeek views
//         },
//         day: {
//           // options apply to dayGridDay and timeGridDay views
//         }
//       }}

//           /*customButtons={{
//             new: {
//               text: 'new',
//               click: () => console.log('customButtons - new event'),
//             },
//           }}*/
//           events={events}
//           eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
//           nowIndicator
//           selectable={true}
//           select={handleEventClick}
//           eventClick={
//             (e) => {
//                 console.log('eventClick - new event');
//                 console.log(e);
//             }
//           }
          
//           height={"90vh"} 
//           eventDidMount={(info)=> {
//             return new bootstrap.Popover(info.el,{
//                 title: info.event.title,
//                 placement:"auto",
//                 trigger:"hover",
//                 customClass:"popoverstyle",
//                 html:true,
//             });
//           }}
//         />
//       </div>
//       {showModal && (
//         <Example modalTitle={modalTitle} modalBody={modalBody} handleCloseModal={handleCloseModal} action={insertEvent}/>
//       )}
//       </>
//     );
//   }
  
//   export default FullCalendarApp;


