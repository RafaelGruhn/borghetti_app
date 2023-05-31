// /src/pages/Contact.js
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import axios from 'axios'
import { Table, Button, Form } from 'react-bootstrap';
import './clientes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Delete from './delete';
import Create from './create';
import Update from './update';

const Clientes = () => {
    const [Clientes, setClientes] = useState([]);
    const [reload, setReload] = useState(false);



    const fetchClientes = async () => {
        // const response = await axios.get('https://645111d9a32219691159e344.mockapi.io/api/v1/cliente');
        // const response = await axios.get('https://6458f77c4eb3f674df82b01f.mockapi.io/api/v1/Clientes');
        const response = await axios.get('https://api.borghetti.gahlert.me/api/users/', { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}` } });
        setClientes(response.data.results);
        console.log(response.data);
    }

    if (reload) {
        setReload(false);
        console.log('reload')
        fetchClientes();
    }    
    
    useEffect(() => {
        fetchClientes();
    }, []);

    return (
        <Base>
            <h1>Clientes</h1>
            <div className='ClientesHeader'>
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
                <Table striped>
                    <thead>
                        <tr>
                            <th id='th1Clientes'>Usuário</th>
                            <th id='th3Clientes'>Nome</th>
                            <th id='th4Clientes'>Sobrenome</th>
                            <th id='th2Clientes'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
            {Clientes.map((cliente) => ( 
                    <tr key={cliente.id}>
                        <td>{cliente.username}</td>
                        <td>{cliente.first_name}</td>
                        <td>{cliente.last_name}</td>
                        <td className="text-nowrap">  <Update cliente={cliente} reload={setReload}></Update>{' '} <Delete cliente={cliente} reload={setReload}></Delete> </td>
                    </tr>
                )
                )}
                </tbody>
            </Table>
        </Base>
    )
}

export default Clientes