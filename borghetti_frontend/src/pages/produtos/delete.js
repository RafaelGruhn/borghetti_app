import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import API from '../../api.js';

const Delete =  ({produto, reload}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteProduto = async () => {
    setSpin(true);
    console.log(produto.id);
    const config = {
      method: 'delete',
      url: `api/products/${produto.id}/`,
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
      <Button onClick={handleShow} variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Deletar ' + produto.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Não pode ser desfeito!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteProduto}>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Deletar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Delete;

