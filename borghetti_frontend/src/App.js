// /src/components/Root.js
import React from 'react'
import Routes from './components/Routes'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


const setToken = (userToken) => {
    if (userToken) {
        localStorage.setItem('token', JSON.stringify(userToken))
    } else {
        localStorage.removeItem('token')
    }
    console.log(userToken)
    window.location.reload()
}

const getToken = () => {
    const tokenString = localStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    console.log(!userToken)
    return userToken?.logged
}


const App = () => {
    const token = getToken()
    console.log(token)
    return (
        <BrowserRouter>
                <Routes token={token} setToken={setToken}/>  
        </BrowserRouter>
    )
}

export default App