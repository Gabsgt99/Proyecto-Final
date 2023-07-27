import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import EditProfile from '../../pages/EditProfile';

describe('EditProfile pages', () => {
  test('la caja de texto se encuentra el nombre', () => {
    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );
    const nombres = screen.getByLabelText('Nombres:');
    expect(nombres).toBeInTheDocument();
  });

  test('la caja de texto se encuentra el apellido', () => {
    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );
    const apellidos = screen.getByLabelText('Apellidos:');
    expect(apellidos).toBeInTheDocument();
  });

  test('la caja de texto se encuentra el email', () => {
    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );
    const correoelectronico = screen.getByLabelText('Correo electrónico:');
    expect(correoelectronico).toBeInTheDocument();
  });

  test('la caja con el texto tiene un color inicial', () => {
    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );
    const buttonCancelar = screen.getByRole('button', { name: 'cancelar' });
    expect(buttonCancelar).toHaveStyle({
      backgroundColor: 'white'
    });
  });

  test('si al pulsar el botón cambia el color de fondo', () => {
    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );
    const buttonGuardar = screen.getByRole('button', { name: 'guardar' });
    fireEvent.click(buttonGuardar);
    expect(buttonGuardar).toHaveStyle({
      backgroundColor: '#FF470'
    });
  });
});
