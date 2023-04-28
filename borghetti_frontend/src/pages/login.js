import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'

const Login = ({setToken}) => {
    return (
        <div>
            <h1>Login</h1>
            <Link onClick={() => { setToken({logged:"true"});}} to="/">Login</Link>
        </div>
    )
}


export default Login