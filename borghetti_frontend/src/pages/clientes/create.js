import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import API from '../../api.js';
import { Form } from 'react-bootstrap';

const Create =  ({reload}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [username, setUserName] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const createCliente = async () => {
    setSpin(true);
    const cliente = { username, first_name, last_name };
    console.log(cliente);
    // const response = await axios.post('https://6458f77c4eb3f674df82b01f.mockapi.io/api/v1/clientes', cliente);
    const config = {
      method: 'post',
      url: 'api/users/',
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
      <Button className='btnInsert' onClick={handleShow} variant="success ">Novo Cliente</Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Usuário" />
                </Form.Group>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="Nome" />
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Sobrenome" />
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={createCliente}>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Salvar'} 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Create;

