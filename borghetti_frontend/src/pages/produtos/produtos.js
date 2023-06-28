// /src/pages/Contact.jscliente
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import API from '../../api.js';
import { Table } from 'react-bootstrap';
import './produtos.css'
import Delete from './delete';
import Create from './create';
import Update from './update';
import { Accordion } from 'react-bootstrap';

const Produtos = () => {
    const [categorias, setCategorias] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [reload, setReload] = useState(false);

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
            setProdutos(response.data.results);
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
        fetchCategorias();
        fetchProdutos();
    }, []);

    return (
        <Base>
            <div className='ProductsHeader'>
            <h1>Produtos</h1>
                <Create categorias={categorias} reload={setReload}></Create>
            </div>
            <Accordion defaultActiveKey="0" alwaysOpen>
                {categorias.map((categoria, index) => (
                <Accordion.Item key={index} eventKey={index}>
                    <Accordion.Header>{categoria.name}</Accordion.Header>
                    <Accordion.Body>
                        <Table striped id='TableProdutos'>
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
                                    <td style={{width:0}} className="text-nowrap"> <div className="divTableButtons"><Update produto={produto} categorias={categorias} reload={setReload}></Update>{' '} <Delete produto={produto} reload={setReload}></Delete> </div></td>
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

export default Produtos