import React from "react";
import { Modal, Button, ModalFooter } from 'react-bootstrap';

function RemoveAlert({ setShow, handleRemove, item, ...props }) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Remove item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to delete this item?</h4>
      </Modal.Body>
      <ModalFooter>
        <Button onClick={() => {
          setShow(false);
        }} variant="outline-primary">No</Button>
        <Button onClick={() => {handleRemove(item);
           setShow(false)}}>Yes</Button>
      </ModalFooter>
    </Modal>
  );
}

export default RemoveAlert;
