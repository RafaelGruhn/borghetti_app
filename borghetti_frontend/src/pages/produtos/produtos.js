// /src/pages/Contact.js
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import axios from 'axios'
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
        // const response = await axios.get('https://645111d9a32219691159e344.mockapi.io/api/v1/produto');
        const response = await axios.get('https://6458f77c4eb3f674df82b01f.mockapi.io/api/v1/produtos');
        setProdutos(response.data);
        console.log(response.data);
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
                            <th>#</th>
                            <th>#</th>
                            <th>#</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
            {produtos.map((produto) => ( 
                    <tr key={produto.id}>
                        <td>{produto.name}</td>
                        <td>{produto.descricao}</td>
                        <td>{produto.preco}</td>
                        <td className="text-nowrap">  <Update produto={produto} reload={setReload}></Update>{' '} <Delete produto={produto} reload={setReload}></Delete> </td>
                    </tr>
                )
                )}
                </tbody>
            </Table>
        </Base>
    )
}

export default Produtos