import React from "react";
import { Modal, ModalFooter } from 'react-bootstrap';

function AlertModal({ Title,Body,ModalButtons, ...props }) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {Title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{Body}</h4>
      </Modal.Body>
      <ModalFooter>
        {ModalButtons}
      </ModalFooter>
    </Modal>
  );
}

export default AlertModal;
