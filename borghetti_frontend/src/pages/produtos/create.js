import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const Create =  ({reload}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteProduto = async () => {
    const response = await axios.delete('https://645111d9a32219691159e344.mockapi.io/api/v1/produto/' );
    console.log(response.data);
    reload(true);
    handleClose();
  }

  return (
    <>
      <Button className='btnInsert' onClick={handleShow} variant="success ">Novo Produto</Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Nome" />
                </Form.Group>
                <Form.Group controlId="formBasicDescrição">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" placeholder="Descrição"  />
                </Form.Group>
                <Form.Group controlId="formBasicPreço">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="text" placeholder="Preço"  />
                </Form.Group>
                <Form.Group controlId="formBasicQuantidade">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control type="text" placeholder="Quantidade"  />
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteProduto}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Create;

