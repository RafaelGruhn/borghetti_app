import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import { Form, Button } from 'react-bootstrap'
import logoBorghetti from './Logo Borghetti.png'
import axios from 'axios'


const Login = ({setToken}) => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e) => {
        try {
        e.preventDefault()
            setError('')
            setLoading(true)
            const response = await axios.post('https://api.borghetti.gahlert.me/api/token/', { username, password })
            setToken(response.data)
        setLoading(false)
        } catch (error) {
            setError('Failed to log in')
            console.log(error)
        }
    }


    return (
        <div className='loginPage'>
            <div className='loginContainer sm-9 md-3' >
                <img className='logoLogin' src={logoBorghetti} alt="Logo Borghetti" />
                <Form>
                    <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        {/* <Form.Control type="email" placeholder="name@example.com" /> */}
                        <Form.Control type="email" placeholder="nome@exemplo.com.br" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="my-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Password</Form.Label>
                        {/* <Form.Control  type="password" placeholder="password" /> */}
                        <Form.Control type="password" placeholder="senha" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    {/* <Button variant="primary" onClick={() => { setToken({logged:"true"});}} type="submit"> Login</Button> */}
                    <Button variant="primary" onClick={handleSubmit} type="submit"> Login</Button>
                </Form>
            </div>
        </div>
    )
}


export default Login