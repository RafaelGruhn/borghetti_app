// /src/pages/Contact.jscliente
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import API from '../../api.js';
import { Table, Button } from 'react-bootstrap';
import './pedidos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencil, faTrash, faPrint } from '@fortawesome/free-solid-svg-icons'


const status = {'pending': 'Pendente', 'in_progress': 'Em andamento', 'done': 'Finalizado'}

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [reload, setReload] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('tokenUser')));

    const fetchProdutos = async () => {
        const config = {
            method: 'get',
            url: 'api/products/',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        
        return new Promise((resolve, reject) => {
            API(config).then((response) => {
                console.log(response.data);
                resolve(response.data.results);
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 403) {
                    localStorage.removeItem("tokenAccess");
                    localStorage.removeItem("tokenUser");
                    localStorage.removeItem("tokenRefresh");
                    window.location.href = '/login';
                }
                reject(error);
            });
        });
    }

    const fetchClientes = async () => {
        const config = {
            method: 'get',
            url: 'api/users/',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        return new Promise((resolve, reject) => {
            API(config).then((response) => {
                console.log(response.data);
                resolve(response.data.results);
            }).catch((error) => {
                console.log(error);
                if (error.response.status === 403) {
                    // localStorage.removeItem("tokenAccess");
                    // localStorage.removeItem("tokenUser");
                    // localStorage.removeItem("tokenRefresh");
                    // window.location.href = '/login';
                }
                reject(error);
            });
        });
    }

    const fetchPedidos = async () => {
        var clientes = null;
        if (currentUser.is_superuser) {
            try {
                clientes = await fetchClientes();
            }catch(e){
                clientes = [currentUser];
            }
        }
        const produtos = await fetchProdutos();
        console.log(produtos)
        console.log(clientes);
        const config = {
            method: 'get',
            url: 'api/demands/',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        await API(config).then((response) => {
            console.log(response.data);
            setPedidos(response.data.results.map((pedido) => {
                pedido.client = clientes ? clientes.find((cliente) => cliente.id === pedido.client) : null;
                pedido.products = pedido.products.map((p) => {
                    p.product = produtos.find((produto) => produto.id === p.product);
                    return p;
                });
                pedido.total = pedido.products.reduce((total, p) => total + p.product.price * p.quantity, 0);
                return pedido;
            }));
            console.log(pedidos);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
                localStorage.removeItem("tokenAccess");
                localStorage.removeItem("tokenUser");
                localStorage.removeItem("tokenRefresh");
                window.location.href = '/login';
            }
        });
    }



    if (reload) {
        setReload(false);
        console.log('reload')
        fetchPedidos();
    }    
    
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('tokenUser')));
        fetchPedidos();
    }, []);

    return (
        <Base>
            <div className='ProductsHeader'>
                <h1>Pedidos</h1>
                <Button className='btnInsert' variant="success" onClick={() => window.location.href = '/pedidos/novo'}>Novo Pedido</Button>
            </div>
                <Table responsive striped id='TablePedidos'>
                    <thead>
                        <tr>
                            <th id='th1Pedidos'>Nome</th>
                            <th id='th2Pedidos'>Descrição</th>
                            <th id='th3Pedidos'>Ações</th>
                            <th id='th4Pedidos'>Ações</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody >
                        {pedidos.map((pedido) => ( 
                        <tr key={pedido.id}>
                            <td>{pedido.client ? pedido.client.first_name + ' ' +  pedido.client.last_name :'' }</td>
                            <td>{pedido.total ? "RS " + pedido.total.toFixed(2).replace('.',',') : 'Sem Valor'}</td>
                            <td>{pedido.demand_date.slice(8,10) + "/" + pedido.demand_date.slice(5,7) + "/" + pedido.demand_date.slice(0,4)}</td>
                            <td>{status[pedido.status]} </td>
                            <td style={{width:0}} className="text-nowrap"> 
                                <div className="divTableButtons">
                                    <Button onClick={null} variant="outline-warning"><FontAwesomeIcon icon={faPencil} /></Button>
                                    <Button onClick={null} variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                    {currentUser.is_superuser ? <Button onClick={null} variant="outline-success"><FontAwesomeIcon icon={faPrint} /></Button> : ''}
                                </div>  
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
        </Base>
    )
}

export default Pedidos