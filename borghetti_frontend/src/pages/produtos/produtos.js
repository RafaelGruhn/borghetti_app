// /src/pages/Contact.js
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

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [reload, setReload] = useState(false);

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
        fetchProdutos();
    }    
    
    useEffect(() => {
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
                <Create reload={setReload}></Create>
            </div>
                    <h3>aa</h3>
                <Table striped>
                    <thead>
                        <tr>
                            <th id='th1Produtos'>Nome</th>
                            <th id='th2Produtos'>Descrição</th>
                            <th id='th3Produtos'>Valor</th>
                            <th id='th4Produtos'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
            {produtos.map((produto) => ( 
                    <tr key={produto.id}>
                        <td>{produto.name}</td>
                        <td>{produto.kind}</td>
                    </tr>
                    )
                )
            }
                </tbody>
            </Table>
        </Base>
    )
}

export default Produtos