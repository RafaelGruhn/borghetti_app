// /src/pages/Contact.jscliente
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import API from '../../api.js';
import { Table, Button } from 'react-bootstrap';
import './pedidos.css'
import ShowPedido from './showPedido';

const status = {'pending': 'Pendente', 'approved': 'Aprovado', 'delivered': 'Finalizado'}

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
                resolve(response.data.results);
            }).catch((error) => {
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
                resolve(response.data.results);
            }).catch((error) => {
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
        const produtos = await fetchProdutos();
        var clientes = null;
        if (currentUser.is_superuser) {
            try {
                clientes = await fetchClientes();
            }catch(e){
                clientes = [currentUser];
            }
        }
        const config = {
            method: 'get',
            url: 'api/demands/',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        await API(config).then((response) => {
            setPedidos(response.data.results.map((pedido) => {
                pedido.client = clientes ? clientes.find((cliente) => cliente.id === pedido.client) : null;
                pedido.products = pedido.products.map((p) => {
                    p.product = produtos.find((produto) => produto.id === p.product);
                    return p;
                });
                pedido.total = pedido.products.reduce((total, p) => total + p.product.price * p.quantity, 0);
                return pedido;
            }));
        }).catch((error) => {
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
        fetchPedidos();
    }    
    
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('tokenUser')));
        fetchPedidos();
    }, []);

    return (
        <Base>
            <div className='ProductsHeader BaseHeader'>
                <h2>Pedidos</h2>
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
                        {pedidos
                        .sort((pedido1, pedido2)=>{
                            if (pedido1.status > pedido2.status) return -1;
                            if (pedido1.status < pedido2.status) return 1;
                            return 0;
                            })
                        .sort((pedido1, pedido2)=>{
                            if (pedido1.demand_date > pedido2.demand_date) return 1;
                            if (pedido1.demand_date < pedido2.demand_date) return -1;
                            return 0;
                         })
                         .map((pedido) => ( 
                        <tr key={pedido.id}>
                            <td>{pedido.client ? pedido.client.first_name + ' ' +  pedido.client.last_name :'' }</td>
                            <td>{pedido.total ? "RS " + pedido.total.toFixed(2).replace('.',',') : 'Sem Valor'}</td>
                            <td>{pedido.demand_date.slice(8,10) + "/" + pedido.demand_date.slice(5,7) + "/" + pedido.demand_date.slice(0,4)}</td>
                            <td style={pedido.status === 'pending' ? {color:'Orange'}: {color:'Green'}}>{status[pedido.status]} </td>
                            <td style={{width:0}} className="text-nowrap"> 
                                <div className="divTableButtons">
                                    <ShowPedido pedido={pedido} reload={setReload} currentUser={currentUser}/>
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