import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import API from '../../api.js';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const Update =  ({produto ,reload, categorias}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const produtoid = produto.id;
  const [name, setName] = useState(produto.name);
  const [kind, setKind] = useState(produto.kind);
  const [preco, setPreco] = useState(produto.preco);

  const updateProduto = async () => {
    setSpin(true);
    const produto = { name, kind, preco };
    console.log(produto);
    const config = {
      method: 'patch',
      url: `api/products/${produtoid}/`,
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
      },
      data: produto
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
          <Modal.Title>Novo Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Nome" />
                </Form.Group>
                <Form.Group controlId="formBasicDescrição">
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select defaultValue={produto.kind} aria-label="Default select example" onChange={(e) => setKind(e.target.value)}>
                    {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {/* <Form.Group controlId="formBasicPreço">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="text" onChange={(e) => setPreco(e.target.value.replace('RS','').replace(' ','').replace(',','.'))} value={'RS ' + preco.replace('.',',')} placeholder="Preço"  />
                </Form.Group> */}
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

