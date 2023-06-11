import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import API from '../../api.js';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const Update =  ({categoria ,reload}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const categoriaid = categoria.id;
  const [name, setName] = useState(categoria.name);

  const updatecategoria = async () => {
    setSpin(true);
    const categoria = { name };
    console.log(categoria);
    //const response = await axios.put('https://6458f77c4eb3f674df82b01f.mockapi.io/api/v1/categorias/'+ categoriaid, categoria);
    const config = {
      method: 'patch',
      url: 'api/product-types/' + categoriaid + '/',
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
      },
      data: categoria
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
          <Modal.Title>Novo Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Nome" />
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={updatecategoria}>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Atualizar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Update;

