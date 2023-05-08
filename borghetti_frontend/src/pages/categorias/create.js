import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const Create =  ({reload}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');


  const createCategoria = async () => {
    setSpin(true);
    const categoria = { name };
    console.log(categoria);
    const response = await axios.post('https://6458f77c4eb3f674df82b01f.mockapi.io/api/v1/categorias', categoria);
    console.log(response.data);
    setSpin(false);
    reload(true);
    handleClose();
  }

  return (
    <>
      <Button className='btnInsert' onClick={handleShow} variant="success ">Nova Categoria</Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Nome" />
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={createCategoria}>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Salvar'} 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Create;

