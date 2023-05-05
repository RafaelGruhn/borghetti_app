import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import { Form, Button } from 'react-bootstrap'
import logoBorghetti from './Logo Borghetti.png'

const Login = ({setToken}) => {
    return (
        <div className='loginPage'>
            <div className='loginContainer sm-9 md-3' >
                <img className='logoLogin' src={logoBorghetti} alt="Logo Borghetti" />
                <Form>
                    <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" />
                    </Form.Group>
                    <Button variant="primary" onClick={() => { setToken({logged:"true"});}} type="submit"> Login</Button>
                </Form>
            </div>
        </div>
    )
}


export default Login