// /src/components/Root.js
import React from 'react'
import Routes from './components/Routes'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


const setToken = (userToken) => {
    if (userToken) {
        localStorage.setItem('tokenAccess', JSON.stringify(userToken.access))
        localStorage.setItem('tokenRefresh', JSON.stringify(userToken.refresh))
        localStorage.setItem('tokenUser', JSON.stringify(userToken.user))
    } else {
        localStorage.removeItem('tokenAccess')
        localStorage.removeItem('tokenRefresh')
        localStorage.removeItem('tokenUser')
    }
    window.location.reload()
}

const getToken = () => {
    const tokenString = localStorage.getItem('tokenUser')
    const userToken = JSON.parse(tokenString)
    return userToken?.logged
}


const App = () => {
    const token = getToken()
    return (
        <BrowserRouter>
                <Routes token={token} setToken={setToken}/>  
        </BrowserRouter>
    )
}

export default App