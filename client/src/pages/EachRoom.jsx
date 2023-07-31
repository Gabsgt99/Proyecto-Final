import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import CalendarComponent from "../components/CalendarComponent.jsx";

const EachRoom = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});
 
  useEffect(() => {
    if (id) {
      getRoom();
    }
  
  }, [id]);

  const getRoom = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/rooms/${id}`);
      setRoom(data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  

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
            <CalendarComponent roomId={id} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EachRoom;

