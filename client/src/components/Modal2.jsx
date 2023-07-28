/* 

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example({ modalTitle, modalBody, handleCloseModal=false, action }) {
    


  return (
    <>

      <Modal show={true} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          { action && 
            <Button variant="primary" onClick={action}>
                Save Changes
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
 */