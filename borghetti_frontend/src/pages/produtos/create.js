import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import API from '../../api.js';
import { Form } from 'react-bootstrap';

const Create =  ({reload, categorias}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [kind, setKind] = useState('');
  const [preco, setPreco] = useState('');

  const createProduto = async () => {
    setSpin(true);
    const produto = { name, kind, preco };
    const config = {
      method: 'post',
      url: 'api/products/',
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
      },
      data: produto,
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
      <Button className='btnInsert' onClick={handleShow} variant="success ">Novo Produto</Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Nome" />
                </Form.Group>
                <Form.Group controlId="formBasicDescrição">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={(e) => setKind(e.target.value)}>
                      <option>Selecione uma categoria</option>
                      {categorias.map((categoria) => (
                          <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formBasicPreço">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="text" onChange={(e) => setPreco(e.target.value.replace('RS','').replace(' ','').replace(',','.'))} value={'RS ' + preco.replace('.',',')} placeholder="Preço"  />
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={createProduto}>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Salvar'} 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Create;

