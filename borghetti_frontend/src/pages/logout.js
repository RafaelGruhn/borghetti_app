import React from 'react'
import { Navigate } from 'react-router-dom'

const Logout = ({setToken}) => {
    setToken(null)
    console.log("logout")
    return (
        <Navigate to="/login" replace/>
    )
}


export default Logout