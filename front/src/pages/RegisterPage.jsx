import {React, useState} from 'react';


 
function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si hay campos vacíos
    const { firstName, lastName, email } = formData;
    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '') {
      return;
    }

    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor
    setSuccessMessage('Ha registrado correctamente al usuario');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSuccessMessage('');
  };

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
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group py-3">
              <label htmlFor="lastName">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group py-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group form-check py-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="isAdmin"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="isAdmin">
                ¿Es Admin?
              </label>
            </div>
            <button type="submit" className="btn btn-register">
              Registrarse
            </button>
          </form>
        </div>
      </div>

      {/* Modal de éxito */}
      {modalVisible && (
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
        </div>
      )}
    </div>
  );
}

export default RegisterPage;