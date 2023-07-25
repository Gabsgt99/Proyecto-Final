import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout.jsx";
import { FaChevronRight } from "react-icons/fa6";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    //const [loading, setLoading] = useState(false);
    const getRooms = async () => {
        try {
            //setLoading(true);
            //console.log(data);
            const { data } = await axios.get('http://localhost:8080/api/v1/rooms/get-rooms',{
                method: "GET",
                cors: true,
            });
            //setLoading(false);
            console.log(data);
            setRooms(data.rooms);
            } catch (error) {
            //setLoading(false);
            console.log(error);
            }      
        };
        useEffect(() => {
            getRooms();
          }, []);
    return (
    <Layout>
        <div className='grid text-center'>
            <div className='g-col-2'>
            {rooms?.map((r, index) => (
                <div key={r._id} className= "card mb-3 allroom-card" style={{"maxWidth": "90vw"}}>
                    <div className= {index % 2 === 0 ? "row g-0 " : "odd-card row g-0"}>
                        <div className="col-md-4 card-image ">
                            <div>
                            <img src={`http://localhost:8080/api/v1/rooms/room-photo/${r._id}`} className="justify-content-center img-fluid rounded-start" alt={r.name}/>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body allrooms-cbody">
                                <h5 className="card-title allrooms-ctitle">{r.name}</h5>
                                <p className="card-text">{r.description.substring(0, 200)}...</p>
                                <p className="card-text">Aforo máx: {r.capacity}</p>
                                <Link
                                className="link ms-1 goroom"
                                to={(`/rooms/${r._id}`)}
                                >
                                IR A LA SALA <FaChevronRight/><FaChevronRight/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Rooms;

//{ Match.mod(i/2) == 0 ? 'aqui se pone la clase con el reverse' : ''}