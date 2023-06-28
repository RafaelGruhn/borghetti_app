import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './Logo Borghetti.png'
import campainha from './campainha.png'
import './header.css'

import './header.css'

var pages=[]
if (JSON.parse(localStorage.getItem('tokenUser'))?.is_superuser){
    pages=[ "Pedidos", "Produtos", "Categorias", "Clientes" ]
}else{
    pages=[ "Pedidos", "Novo Pedido"]
}

export default function Header() {
    return (
        <Navbar id='NavBar' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <img src={logo} alt="Logo" id='Logo' />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {pages.map((page) => { 
                    if (page === "Novo Pedido") {
                        return <Nav.Link key={page} href={"/pedidos/novo"}>{page}</Nav.Link>
                    }else{
                        return <Nav.Link key={page} href={"/"+page.toLowerCase()}>{page}</Nav.Link>
                    }
                })}
            </Nav>
            </Navbar.Collapse>
            <Nav id='Nav2'>
                {/* <Nav.Link eventKey={2} href="/logout"><img src={sair}/></Nav.Link> */}
                <Nav.Link eventKey={2} href="/logout">Sair </Nav.Link>
                <Nav.Link><img id='Campainha' src={campainha} alt="Notificações"/></Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    )
}