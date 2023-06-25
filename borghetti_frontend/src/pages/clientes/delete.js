import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import API from '../../api.js';

const Delete =  ({cliente, reload}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteCliente = async () => {
    setSpin(true);
    console.log(cliente.id);
    const config = {
      method: 'delete',
      url: `api/users/${cliente.id}/`,
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
      },
      data: cliente
    };
    API(config).then((response) => {
      console.log(response.data);
      setSpin(false);
      reload(true);
      handleClose();
    }).catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
            localStorage.removeItem("tokenAccess");
            localStorage.removeItem("tokenUser");
            localStorage.removeItem("tokenRefresh");
            window.location.href = '/login';
        }
    });
  }

  return (
    <>
      <Button onClick={handleShow} variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Deletar ' + cliente.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Não pode ser desfeito!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteCliente}>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Deletar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Delete;

