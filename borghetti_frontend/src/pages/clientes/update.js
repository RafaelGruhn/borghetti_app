import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import API from '../../api.js';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const Update =  ({cliente ,reload}) => {
  const [show, setShow] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clienteid = cliente.id;
  const [username, setUserName] = useState(cliente.username);
  const [first_name, setFirstName] = useState(cliente.first_name);
  const [last_name, setLastName] = useState(cliente.last_name);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [validated, setValidated] = useState(false);

  const updatecliente = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setSpin(false);
      setValidated(true);
      return;
    }
    if (password !== password2) {
      alert('Senhas não conferem!');
      setSpin(false);
      return;
    }
    setSpin(true);
    var newcliente = { clienteid, username, first_name, last_name };
    if (password !== '') {
      newcliente = { ...newcliente, password };
    }
      console.log(cliente);
    const config = {
      method: 'patch',
      url: `api/users/${clienteid}/`,
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
      },
      data: newcliente
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
      <Button onClick={handleShow} variant="outline-warning"><FontAwesomeIcon icon={faPencil} /></Button>{' '}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form id='FormUpdateClient' noValidate validated={validated} onSubmit={updatecliente}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control required type="text" onChange={(e) => setUserName(e.target.value)} value={username} placeholder="Usuário" />
                </Form.Group>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control required type="text" onChange={(e) => setFirstName(e.target.value)} value={first_name} placeholder="Nome" />
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control required type="text" onChange={(e) => setLastName(e.target.value)} value={last_name} placeholder="Sobrenome" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Deixe vazio para não alterar" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword2">
                    <Form.Label>Confirme a Senha</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword2(e.target.value)} value={password2} placeholder="Deixe vazio para não alterar"  />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type='submit' variant="warning" form='FormUpdateClient'>
            {spin ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Atualizar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Update;

