import React from 'react';
<<<<<<< HEAD
import room1 from '../Assets/ROOM1.png'
import room2 from '../Assets/ROOM2.png'
import room3 from '../Assets/ROOM3.png'
import room4 from '../Assets/ROOM4.png'
import room5 from '../Assets/Cabina0.png'
import room6 from '../Assets/Cabina1.png'
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

=======
import Layout from '../components/layout/Layout';
>>>>>>> sergio



const HomePage = () => {
  return ( <>
<<<<<<< HEAD

        <Layout>
        <div className="container-fluid">
  <div className="row">

    <div className="col-12 ">
      <div className="orange-space"></div>
    </div>
    </div>

    <div className="row">
    <div className="col-sm-6 col-lg-5 bg-success ">
      <img src={room1} className="room" alt="sala de reuniones" />
    </div>
    <div className="col-sm-6 col-lg-7 bg-white p-5 ">
      <h1 className="fw-bold">Sala De Reuniones</h1>
      <p className="p-1">Aforo máximo recomendado: 6 personas.</p>
      <p className="p-1">Esta sala íntima y acogedora proporciona el escenario perfecto para sesiones de trabajo colaborativas y productivas, brindando un espacio tranquilo y estimulante para potenciar la creatividad y la concentración del equipo.</p>
      <Link to="/">RESERVA ESTA SALA <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
    </div>

    <div className="row">
    <div className="col-12">
      <div className="orange-space"></div>
    </div>
    </div>

    <div className="row">
    <div className="col-sm-6 col-lg-7 bg-white p-5 order-sm-1 order-last">
      <h1 className="fw-bold">Sala De Equipo</h1>
      <p className="p-1">Aforo máximo: 10 personas.</p>
      <p className="p-1">Sala con diez puestos de trabajo flexibles, perfecta para la modalidad de sillas calientes. Aquí puedes elegir y adaptar tu espacio según tus necesidades y disponibilidad horaria. Con un diseño contemporáneo y funcional, esta sala ofrece un entorno dinámico que promueve la productividad y la interacción entre los equipos.</p>
      <Link to="/">RESERVA ESTA SALA <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
    <div className="col-sm-6 col-lg-5 bg-success order-sm-2 order-first">
      <img src={room2} className="room" alt="sala de reuniones" />
    </div>
    </div>

    <div className="row">
    <div className="col-12">
      <div className="orange-space"></div>
    </div>
    </div>

    <div className="row">
    <div className="col-sm-6 col-lg-5 bg-success">
      <img src={room3} className="room" alt="sala de reuniones" />
    </div>
    <div className="col-sm-6 col-lg-7 bg-white p-5">
      <h1 className="fw-bold">Sala Mary Lee Woods</h1>
      <p className="p-1">Aforo máximo recomendado: 25 personas.</p>
      <p className="p-1">Sumérgete en un entorno espacioso y tranquilo, perfecto para ver clases, estudiar y trabajar en equipo. Equipada con cómodos asientos, esta sala brinda un ambiente propicio para la concentración y el intercambio de conocimientos de nuestros alumnos de Factoria F5. El objetivo es proporcionar un espacio de estudio excepcional donde puedas explorar, crecer y alcanzar tus metas académicas.</p>
      <Link to="/">RESERVA ESTA SALA <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
    </div>

    <div className="row">
    <div className="col-12">
      <div className="orange-space"></div>
    </div>
    </div>

    <div className="row">
    <div className="col-sm-6 col-lg-7 bg-white p-5 order-sm-1 order-last">
      <h1 className="fw-bold">Sala Hedy Lamar</h1>
      <p className="p-1">Aforo máximo recomendado: 25 personas.</p>
      <p className="p-1">Esta sala de estudio te invita a adentrarte en un océano de sabiduría, rodeado de un ambiente estimulante y envolvente. El aula Hedy Lamar llevará a nuestros estudiantes de Factoria F5 a un viaje de descubrimiento intelectual, desafiando los límites de su aprendizaje.</p>
      <Link to="/">RESERVA ESTA SALA <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
    <div className="col-sm-6 col-lg-5 bg-success order-sm-2 order-first">
      <img src={room4} className="room" alt="sala de reuniones" />
    </div>
    </div>

    <div className="row">
    <div className="col-12">
      <div className="orange-space"></div>
    </div>
    </div>

    <div className="row">
    <div className="col-sm-6 col-lg-4 bg-success">
      <img src={room5} className="room cabina" alt="sala de reuniones" />
    </div>
    <div className="col-sm-6 col-lg-8 bg-white p-5">
      <h1 className="fw-bold">Cabina 0</h1>
      <p className="p-1">Aforo máximo: 1 persona.</p>
      <p className="p-1">Puesto individual para conectarse a reuniones que requieren de más privacidad y silencio.</p>
      <Link to="/">RESERVA ESTA SALA <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
    </div>

    <div className="row">
    <div className="col-12">
      <div className="orange-space"></div>
    </div>
    </div>

    <div className="row">
    <div className="col-sm-6 col-lg-8 bg-white p-5 order-sm-1 order-last">
      <h1 className="fw-bold">Cabina 1</h1>
      <p className="p-1">Aforo máximo: 1 persona.</p>
      <p className="p-1">Puesto individual para conectarse a reuniones que requieren de más privacidad y silencio.</p>
      <Link to="/">RESERVA ESTA SALA <FontAwesomeIcon icon={faArrowRight} /></Link>
    </div>
    <div className="col-sm-6 col-lg-4 bg-success order-sm-2 order-first">
      <img src={room6} className="room cabina" alt="sala de reuniones" />
    </div>
    </div>
    

  </div>

        </Layout>
=======
        <Layout/>
>>>>>>> sergio
          </> );      
};

export default HomePage