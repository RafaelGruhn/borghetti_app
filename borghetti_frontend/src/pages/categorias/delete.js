import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Delete =  ({categoria, reload}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteCategoria = async () => {
    setSpin(true);
    console.log(categoria.id);
    const response = await axios.delete('https://6458f77c4eb3f674df82b01f.mockapi.io/api/v1/categorias/' + categoria.id);
    console.log(response.data);
    setSpin(false);
    reload(true);
    handleClose();
  }

  return (
    <>
      <Button onClick={handleShow} variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Deletar ' + categoria.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Não pode ser desfeito!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteCategoria}>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Deletar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Delete;
