// /src/components/Routes.js
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Pedidos from '../pages/pedidos'
import Produtos from '../pages/produtos'
import Login from '../pages/login'
import Logout from '../pages/logout'
import Categorias from '../pages/categorias'
import Clientes from '../pages/clientes'
import CriarPedido from '../pages/criarPedido'

const AppRoutes = ({token, setToken}) => {
    const tokenUser = JSON.parse(localStorage.getItem('tokenUser'))
    console.log(tokenUser)
    if (tokenUser?.is_superuser === true) {
        return (
            <Routes>
                <Route path="pedidos" element={<Pedidos />} />
                <Route path="pedidos/novo/" element={<CriarPedido />} />
                <Route path="produtos" element={<Produtos />} />
                <Route path="categorias" element={<Categorias />} />
                <Route path="clientes" element={<Clientes />} />
                <Route path="logout" element={<Logout setToken={setToken}/>} />
                <Route path="*" element={<Navigate to="/pedidos" replace/>} />
            </Routes>
        )
    } else if (tokenUser?.is_superuser === false) {
        return(
        <Routes>
            <Route path="pedidos" element={<Pedidos />} />
            <Route path="pedidos/novo/" element={<CriarPedido />} />
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
