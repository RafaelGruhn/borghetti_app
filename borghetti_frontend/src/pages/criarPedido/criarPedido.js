// /src/pages/Contact.jscliente
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import API from '../../api.js';
import { Table } from 'react-bootstrap';
import './criarPedido.css'
import { Accordion, Form } from 'react-bootstrap';
import PromptCreatePedidos from './promptCreatePedidos.js';

const CriarPedido = () => {
    const [categorias, setCategorias] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [reload, setReload] = useState(false);
    const [data, setData] = useState('');

    const fetchCategorias = async () => {
        
        const config = {
            method: 'get',
            url: 'api/product-types/',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        
        API(config).then((response) => {
            console.log(response.data);
            setCategorias(response.data.results);
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

    const fetchProdutos = async () => {
        const config = {
            method: 'get',
            url: 'api/products/',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        // let response = await API(config);
        // console.log(response.data);
        // setProdutos(response.data.results);


        API(config).then((response) => {
            console.log(response.data);
            setProdutos(response.data.results.map((produto) => ({...produto, quantidade: 0})));
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
        fetchCategorias();
        fetchProdutos();
    }    
    
    useEffect(() => {
        setData(getMinDate());
        fetchCategorias();
        fetchProdutos();
    }, []);

    const getMinDate = ()=>{
        let today = new Date();
        let tomorrow = new Date();
        if(today.getHours() < 6){
            return today.toISOString().split('T')[0];
        }else{
            return new Date(tomorrow.setDate(tomorrow.getDate() + 1)).toISOString().split("T")[0]
        }
    }

    return (
        <Base>
            <div className='ProductsHeader'>
                <h1>Criar Pedido</h1>
                <div style={{display:'flex'}}>
                    <Form.Control type="date" placeholder="Data" className='inputData' min={getMinDate()}
                        onChange={e => setData(e.target.value)} value={data}/>
                    <PromptCreatePedidos produtos={produtos} date={data}/>
                </div>
            </div>
            <Accordion defaultActiveKey="0" alwaysOpen>
                {categorias.map((categoria, index) => (
                <Accordion.Item key={index} eventKey={index}>
                    <Accordion.Header>{categoria.name}</Accordion.Header>
                    <Accordion.Body>
                        <Table striped id='TableCriaPedido'>
                            <thead>
                                <tr>
                                    <th id='th1Produtos'>Nome</th>
                                    <th id='th2Produtos'>Descrição</th>
                                    <th id='th3Produtos'>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.filter(produto => produto.kind === categoria.id).map((produto) => ( 
                                <tr key={produto.id}>
                                    <td className='td1Produtos'>{produto.name}</td>
                                    <td className='td2Produtos text-nowrap'>{produto.price ? "RS " + produto.price.toFixed(2).replace('.',',') : 'Sem Valor'}</td>
                                    <td style={{width:0}} className="text-nowrap"> 
                                        <div className="divTableButtons">
                                            <text style={{paddingRight:'20px'}}>Quantidade: </text> 
                                            <Form.Control style={{width:'80px'}} className='inputQuantidade' type='number'
                                            onChange={e => (setProdutos(
                                                produtos.map((produtoMap) => {
                                                    if (produtoMap.id === produto.id) {
                                                        if (e.target.value >= 0) {
                                                            console.log(e.target.value);
                                                            produtoMap.quantidade = e.target.value;
                                                        }
                                                    }
                                                    return produtoMap;
                                                }
                                                )))} 
                                                value={produto.quantidade}>
                                            </Form.Control>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
))}
            </Accordion>


        </Base>
    )
}

export default CriarPedido