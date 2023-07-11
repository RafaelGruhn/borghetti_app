import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import API from '../../api.js';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const ShowPedido =  ({pedido, reload}) => {
  const [show, setShow] = useState(false);
  const [spinDelete, setSpinDelete] = useState(false);
  const [spinAprove, setSpinAprove] = useState(false);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('tokenUser')));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleAprove = async (e) => {
    setSpinAprove(true);
    const config = {
      method: 'patch',
      url: `api/demands/${pedido.id}/`,
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
      },
      data: {"status": "approved"},
    };
    API(config).then((response) => {
      console.log(response.data);
      setSpinAprove(false);
      reload(true);
      handleClose();
    }
    ).catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
            localStorage.removeItem("tokenAccess");
            localStorage.removeItem("tokenRefresh");
            localStorage.removeItem("tokenUser");
            window.location.href = '/login';
        }
        setSpinAprove(false);
    }
    );
  }

  const getMinDate = ()=>{
    if (pedido.status === 'approved')
      return true
    let today = new Date();
    let demand_date = new Date(new Date(pedido.demand_date).setHours(18,0,0,0))
    console.log(today)
    console.log(demand_date)
    const diffTime = (today - demand_date);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 
    console.log(diffTime / (1000 * 60 * 60))
    console.log(diffHours)
    if(diffHours < 1){
        return false
    }else{
        return true
    }
  }



  const handleDelete = async (e) => {
    if (getMinDate()) {
      alert('Não é possível excluir um pedido depois das 18h do dia anterior')
      return
    }
    setSpinDelete(true);
    const config = {
      method: 'delete',
      url: `api/demands/${pedido.id}/`,
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
      },
    };
    API(config).then((response) => {
      console.log(response.data);
      setSpinDelete(false);
      reload(true);
      handleClose();
    }).catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
            localStorage.removeItem("tokenAccess");
            localStorage.removeItem("tokenRefresh");
            localStorage.removeItem("tokenUser");
            window.location.href = '/login';
        }
        setSpinDelete(false);
    });
  }

  return (
    <>
      <Button  onClick={handleShow} className='text-nowrap' variant="success"><FontAwesomeIcon icon={faEye} /></Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vizualizar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="table table-striped">
            <tbody>
              {pedido.products?.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.product.name}</td>
                    <td>{produto.quantity}</td>
                    <td style={{color:'green',width:0}}><div className="divTableButtons">{'RS ' + (produto.product.price*produto.quantity).toFixed(2)}</div></td>
                  </tr>
                ))}
                <tr>
                  <td><b>Total</b></td>
                  <td></td>
                  <td style={{color:'green',width:0}} className="text-nowrap"> <b className="divTableButtons">{'RS ' + pedido.products?.reduce((total, produto) => total + (produto.product.price*produto.quantity), 0).toFixed(2)}</b></td>
                </tr>
                <tr>
                  <td><b>Data de Entrega</b></td>
                  <td></td>
                  <td style={{width:0}} className="text-nowrap"> <b className="divTableButtons">{pedido.demand_date}</b></td>
                </tr>
            </tbody>
          </Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="danger" disabled={getMinDate()} onClick={handleDelete} >
            {spinDelete ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Remover Pedido'}
          </Button>
          {currentUser.is_superuser && pedido.status === 'pending' ?  
            <Button variant="success"  onClick={handleAprove}>
              {spinAprove ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Aprovar Pedido'}
            </Button>
          : ''}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ShowPedido;

