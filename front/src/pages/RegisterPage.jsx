import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


 
function RegisterPage() {
  /* const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    isAdmin: false,
  });
   */

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /* const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); */

  /* const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
	      lastname,
        email,
        password
      });
      if (res && res.data.success) {
        /* alert.success(res.data && res.data.message); */ //<===aqui va un mensaje popup de exito en el registro ======
        navigate("/"); //Aqui poner a donde va despues del registro==========
      } else {
     //<===aqui va un mensaje popup
     console.log(name,lastname,email,password)
      }
    } catch (error) {
      console.log(error);
      //<===aqui va un mensaje popup
    }



    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor
    /* setSuccessMessage('Ha registrado correctamente al usuario');
    setModalVisible(true); */
  };

  /* const closeModal = () => {
    setModalVisible(false);
    setSuccessMessage('');
  }; */

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5 px-5 ">
          <form onSubmit={handleSubmit} >
            <div className="form-group py-3">
              <label htmlFor="firstName">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group py-3">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group py-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group py-3">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>
           {/*  <div className="form-group form-check py-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="isAdmin"
                name="isAdmin"
                checked={isAdmin}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="isAdmin">
                ¿Es Admin?
              </label>
            </div> */}
            <button type="submit" className="btn btn-register">
              Registrarse
            </button>
          </form>
        </div>
      </div>

      {/* Modal de éxito */}
      {/* {modalVisible && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Éxito</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{successMessage}</p>
              </div>
            </div>
          </div>
        </div> */}
      
    </div>
  );
}

export default RegisterPage;