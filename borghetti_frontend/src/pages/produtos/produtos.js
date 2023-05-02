// /src/pages/Contact.js
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap';
import './produtos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import Delete from './delete';

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [reload, setReload] = useState(false);

    const fetchProdutos = async () => {
        const response = await axios.get('https://645111d9a32219691159e344.mockapi.io/api/v1/produto');
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
                        <td>{produto.produtoCategoria}</td>
                        <td>{produto.material}</td>
                        <td>  <Button href={'/produtos/edit/' + produto.id} variant="outline-warning"><FontAwesomeIcon icon={faPencil} /></Button>{' '} <Delete produto={produto} reload={setReload}></Delete> </td>
                    </tr>
                )
                )}
                </tbody>
            </Table>
        </Base>
    )
}

export default Produtos