import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import room1 from '../Assets/ROOM1.png'
import room2 from '../Assets/ROOM2.png'
import room3 from '../Assets/ROOM3.png'
import room4 from '../Assets/ROOM4.png'



const HomePage = () => {
  return ( <>

        <Header />

        <div className="container-fluid">

            <div className="row">
              <div className="col-sm-6 col-lg-5 bg-success">
                <img src={room1} className="room" alt="sala de reuniones" />
              </div>
              <div className="col-sm-6 col-lg-7 bg-white">
                <h1>Sala De Reuniones</h1>
                <p>Aforo máximo recomendado: 6 personas.<br/>Esta sala íntima y acogedora proporciona el escenario perfecto para sesiones de trabajo colaborativas y productivas, brindando un espacio tranquilo y estimulante para potenciar la creatividad y la concentración del equipo.</p>

              </div>

              <div className="col-sm-6 col-lg-7 bg-white">
              <h1>Sala De Equipo</h1>
                <p>Aforo máximo recomendado: 12 personas.<br/>Sala con doce puestos de trabajo flexibles, perfecta para la modalidad de sillas calientes. Aquí puedes elegir y adaptar tu espacio según tus necesidades y disponibilidad horaria. Con un diseño contemporáneo y funcional, esta sala ofrece un entorno dinámico que promueve la productividad y la interacción entre los equipos. </p>
              </div>
              <div className="col-sm-6 col-lg-5 bg-success">
              <img src={room2} className="room" alt="sala de reuniones" />
              </div>

              <div className="col-sm-6 col-lg-5 bg-success">
              <img src={room3} className="room" alt="sala de reuniones" />
              </div>
              <div className="col-sm-6 col-lg-7 bg-white">
              <h1>Sala Mary Lee Woods</h1>
                <p>Aforo máximo recomendado: 30 personas.<br/>Sumérgete en un entorno espacioso y tranquilo, perfecto para ver clases, estudiar y trabajar en equipo. Equipada con cómodos asientos, esta sala brinda un ambiente propicio para la concentración y el intercambio de conocimientos. El objetivo es proporcionarte un espacio de estudio excepcional donde puedas explorar, crecer y alcanzar tus metas académicas. </p>
              </div>

              <div className="col-sm-6 col-lg-7 bg-white">
              <h1>Sala Hedy Lamar</h1>
                <p>Aforo máximo recomendado: 30 personas.<br/>Esta sala de estudio te invita a adentrarte en un océano de sabiduría, rodeado de un ambiente estimulante y envolvente. Con su diseño vanguardista y dinámico, Hedy Lamar te lleva en un viaje de descubrimiento intelectual, desafiando los límites de tu aprendizaje.</p>
              </div>
              <div className="col-sm-6 col-lg-5 bg-success">
              <img src={room4} className="room" alt="sala de reuniones" />
              </div>
            </div>
        </div>
        
      


        <Footer />

          </> );      
};

export default HomePage