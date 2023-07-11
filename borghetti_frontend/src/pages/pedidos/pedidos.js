// /src/pages/Contact.jscliente
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import API from '../../api.js';
import { Table, Button, Form } from 'react-bootstrap';
import './pedidos.css'
import ShowPedido from './showPedido';
import {faFileExcel, faSearch, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const status = {'pending': 'Pendente', 'approved': 'Aprovado', 'delivered': 'Finalizado'}

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [reload, setReload] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('tokenUser')));
    const [showFilter, setShowFilter] = useState(false);
    const [dataFilter, setDataFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [clienteFilter, setClienteFilter] = useState('');

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

    const handleFilter = async () => {
        fetchPedidos();
    }

    const handleCleanFilter = async () => {
        setDataFilter('');
        setStatusFilter('');
        setClienteFilter('');
    }

    const handleCriarRelatorio = async () => {
        let filter = '';
        if (currentUser.is_superuser) {
            if (dataFilter) filter += `?demand_date=${dataFilter}`;
            else filter += '?demand_date=';
            if (statusFilter) filter += `&status=${statusFilter}`;
            if (clienteFilter) filter += `&client=${clienteFilter}`;
        }
        const config = {
            method: 'get',
            responseType: 'blob',
            url: 'api/demands/reports/pdf/'+filter,
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        await API(config).then((response) => {
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL,  '_blank');
        })
        .catch((err) => {
            return Promise.reject({ Error: 'Something Went Wrong', err });
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
        var clientesPedidos = [];
        if (currentUser.is_superuser) {
            try {
                var clientesPedidos = await fetchClientes();
                setClientes(clientesPedidos);
                console.log(clientes);
            }catch(e){
                var clientesPedidos = [currentUser];
                setClientes( clientesPedidos);
            }
        }
        console.log(clientes);
        let filter = '';
        if (currentUser.is_superuser) {
            if (dataFilter) filter += `?demand_date=${dataFilter}`;
            else filter += '?demand_date=';
            if (statusFilter) filter += `&status=${statusFilter}`;
            if (clienteFilter) filter += `&client=${clienteFilter}`;
        }
        const config = {
            method: 'get',
            url: 'api/demands/'+filter,
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        await API(config).then((response) => {
            setPedidos(response.data.results.map((pedido) => {
                pedido.client = clientesPedidos ? clientesPedidos.find((cliente) => cliente.id === pedido.client) : null;
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
                <div>
                {currentUser.is_superuser ? <Button className='btnInsert' style={{marginRight:'10px'}} variant="info" 
                    onClick={() => setShowFilter(!showFilter)}>{!showFilter ? "Abrir Filtro" : "Fechar Filtro"}</Button> : null}
                <Button className='btnInsert' variant="success" onClick={() => window.location.href = '/pedidos/novo'}>Novo Pedido</Button>
                </div>
            </div>
            <div className='Filter' hidden={!showFilter}>
                <Form.Control onKeyDown={(e) => e.preventDefault()} type="date" placeholder="Data" className='inputData' 
                    onChange={e => setDataFilter(e.target.value)} value={dataFilter}/>
                <Form.Control as="select" className='inputStatus' onChange={e => setStatusFilter(e.target.value)} value={statusFilter}>
                    <option value="">Status</option>
                    <option value="pending">Pendente</option>
                    <option value="approved">Aprovado</option>
                </Form.Control>
                <Form.Control as="select" className='inputCliente' onChange={e => setClienteFilter(e.target.value)} value={clienteFilter}>
                    <option value="">Cliente</option>
                    {clientes.map((client) => {
                        return <option value={client.id}>{client.first_name + " " + client.last_name}</option>
                    })}
                </Form.Control>
                <div className='btnsFilter'>
                    <Button variant="success" onClick={handleFilter}><FontAwesomeIcon icon={faSearch} /></Button>
                    <Button variant="warning" onClick={handleCleanFilter}><FontAwesomeIcon icon={faEraser} /></Button>
                    <Button variant="info" onClick={handleCriarRelatorio}><FontAwesomeIcon icon={faFileExcel} /></Button>
                </div>
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