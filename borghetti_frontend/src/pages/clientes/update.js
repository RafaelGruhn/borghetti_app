import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import API from '../../api.js';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const Update =  ({cliente ,reload}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clienteid = cliente.id;
  const [username, setUserName] = useState(cliente.username);
  const [first_name, setFirstName] = useState(cliente.first_name);
  const [last_name, setLastName] = useState(cliente.last_name);

  const updatecliente = async () => {
    setSpin(true);
    const cliente = { username, first_name, last_name };
    console.log(cliente);
    const config = {
      method: 'patch',
      url: `api/users/${clienteid}/`,
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
      },
      data: cliente
    };
    let response = await API(config);
    console.log(response.data);
    setSpin(false);
    reload(true);
    handleClose();
  }

  return (
    <>
      <Button onClick={handleShow} variant="outline-warning"><FontAwesomeIcon icon={faPencil} /></Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Usuário</Form.Label>
                <Form.Control type="text" onChange={(e) => setUserName(e.target.value)} value={username} placeholder="Usuário" />
            </Form.Group>
            <Form.Group controlId="formBasicFirstName">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)} value={first_name} placeholder="Nome" />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} value={last_name} placeholder="Sobrenome" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={updatecliente}>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Atualizar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Update;

