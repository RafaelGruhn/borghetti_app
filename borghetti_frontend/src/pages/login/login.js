import React from 'react'
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
            const response = await axios.post(process.env.REACT_APP_API_URL+'token/', { username, password })
            setToken(response.data)
        } catch (error) {
            setError('Erro ao fazer login')
            console.log(error)
            setLoading(false)
        }
    }


    return (
        <div className='loginPage'>
            <div className='loginContainer sm-9 md-3' >
                <img className='logoLogin' src={logoBorghetti} alt="Logo Borghetti" />
                <Form>
                    <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control type="text" placeholder="nome" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="my-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="senha" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <div id="txtLoginError" className="text-danger">{error}</div>
                    <Button variant="primary" onClick={handleSubmit} type="submit">
                        {loading ? <span className="spinner-border spinner-border-sm mr-2"></span> : 'Login'}
                    </Button>
                </Form>
            </div>
        </div>
    )
}


export default Login