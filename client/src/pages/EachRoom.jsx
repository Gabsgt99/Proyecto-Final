import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import FullCalendarApp from './FullCalendar.jsx';

const EachRoom = () => {
  const {id} = useParams();
  console.log(id, 'aquikatao');
  const [room, setRoom] = useState({});

  useEffect(() => {
    if (id) { getRoom();
    }
   // eslint-disable-next-line 
    }, [id]);
  const getRoom = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/rooms/${id}`, { 
          method: "GET",
          cors: {
            origin: "http://localhost:8080"
          }, 
        })
        
      setRoom(data.rooms);                                                                        
      console.log(data.json);
    } catch (error) {
        console.log(error);
    }
  };
  console.log(room)
  return (
    <Layout>
      <div className="container-xl cont-xl">
        <div className="card-group">
          <div className="card">
            <img
              src={`http://localhost:8080/api/v1/rooms/room-photo/${id}`}
              className="card-img-top"
              alt={room.name}
              height={"300px"}
              width={"400px"}
            />
            <div className="card-body">
              <h1 className="card-title oroom-title">{room.name}</h1>
              <hr />
              <h6 className="card-text rcard-text">{room.description}</h6>
              <h6 className="card-text rcard-text">Aforo : {room.capacity}</h6>
            </div>
          </div>
          <div className="card card-calendar">
            <FullCalendarApp/>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EachRoom;

/* <div class="card-group">
  <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
  </div>


  <div class="card">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
  </div> */