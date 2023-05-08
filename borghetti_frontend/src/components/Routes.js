// /src/components/Routes.js
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Pedidos from '../pages/pedidos'
import Produtos from '../pages/produtos'
import Login from '../pages/login'
import Logout from '../pages/logout'
import Categorias from '../pages/categorias'

const AppRoutes = ({token, setToken}) => {
    if (token) {
        return (
            <Routes>
                <Route path="pedidos" element={<Pedidos />} />
                <Route path="produtos" element={<Produtos />} />
                <Route path="categorias" element={<Categorias />} />
                <Route path="logout" element={<Logout setToken={setToken}/>} />
                <Route path="*" element={<Navigate to="/pedidos" replace/>} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path="/login" element={<Login setToken={setToken}/>} />
                <Route path="*" element={<Navigate to="/login" replace/>} />
            </Routes>
        )
    }
}

export default AppRoutes
