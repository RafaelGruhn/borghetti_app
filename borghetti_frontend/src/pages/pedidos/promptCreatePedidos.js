import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import API from '../../api.js';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const PromptCreatePedidos =  ({produtos}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    const handleCriarPedido = () => {
        const user = JSON.parse(localStorage.getItem('tokenUser'))
        console.log(user)
        const produtctsList = produtos.filter(produto => produto.quantidade > 0).map((produto) => ({product: produto.id, quantity: produto.quantidade}));
        const newPedido = {"client": user.id, "products": produtctsList}
        console.log(newPedido);
        const config = {
            method: 'post',
            url: 'api/demands/',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
            data: newPedido,
        };
        API(config).then((response) => {
            console.log(response.data);
            window.location.href = '/pedidos';
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
      <Button onClick={handleShow} variant="success"><FontAwesomeIcon icon={faPlus} /> Criar Pedido</Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja Confirmar o Pedido?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h1>Novo Pedido</h1>
            {produtos.filter(produto => produto.quantidade > 0).map((produto) => (
                <div key={produto.id}>
                    <h3>{produto.name}</h3>
                    <p>Quantidade: {produto.quantidade}</p>
                </div>
            ))}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleCriarPedido}>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Criar Pedido'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default PromptCreatePedidos;

