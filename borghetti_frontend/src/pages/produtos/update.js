import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Form, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const Update =  ({produto ,reload}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const produtoid = produto.id;
  const [name, setName] = useState(produto.name);
  const [descricao, setDescricao] = useState(produto.descricao);
  const [preco, setPreco] = useState(produto.preco);

  const updateProduto = async () => {
    setSpin(true);
    const produto = { name, descricao, preco };
    console.log(produto);
    const response = await axios.put('https://6458f77c4eb3f674df82b01f.mockapi.io/api/v1/produtos/'+ produtoid, produto);
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
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Nome" />
                </Form.Group>
                <Form.Group controlId="formBasicDescrição">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" onChange={(e) => setDescricao(e.target.value)} value={descricao} placeholder="Descrição"  />
                </Form.Group>
                <Form.Group controlId="formBasicPreço">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="text" onChange={(e) => setPreco(e.target.value)} value={preco} placeholder="Preço"  />
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={updateProduto}>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Atualizar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Update;

