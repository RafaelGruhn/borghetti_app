// /src/pages/Contact.jscliente
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import API from '../../api.js';
import { Table, Button, Form } from 'react-bootstrap';
import './produtos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
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
        let response = await API(config);
        console.log(response.data);
        setCategorias(response.data.results);
    }

    const fetchProdutos = async () => {
        const config = {
            method: 'get',
            url: 'api/products/',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        let response = await API(config);
        console.log(response.data);
        setProdutos(response.data.results);
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
            <h1>Produtos</h1>
            <div className='ProductsHeader'>
                <Form className="searchForm d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="mr-2"
                    aria-label="Search"
                    />
                <Button variant="outline-success"><FontAwesomeIcon icon={faMagnifyingGlass}/></Button>
            </Form>
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
                                    <th id='th3Produtos'>Valor</th>
                                    <th id='th4Produtos'>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.filter(produto => produto.kind === categoria.id).map((produto) => ( 
                                <tr key={produto.id}>
                                    <td>{produto.name}</td>
                                    <td>{produto.kind}</td>
                                    <td>{produto.kind}</td>
                                    <td className="text-nowrap">  <Update produto={produto} categorias={categorias} reload={setReload}></Update>{' '} <Delete produto={produto} reload={setReload}></Delete> </td>
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