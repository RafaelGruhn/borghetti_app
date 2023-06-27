// /src/pages/Contact.js
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import API from '../../api.js';
import { Table } from 'react-bootstrap';
import './clientes.css'
import Delete from './delete';
import Create from './create';
import Update from './update';

const Clientes = () => {
    const [Clientes, setClientes] = useState([]);
    const [reload, setReload] = useState(false);



    const fetchClientes = async () => {
        // const response = await axios.get('https://645111d9a32219691159e344.mockapi.io/api/v1/cliente');
        // const response = await axios.get('https://6458f77c4eb3f674df82b01f.mockapi.io/api/v1/Clientes');
        const config = {
            method: 'get',
            url: 'api/users/',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        // let response = await API(config);
        // setClientes(response.data.results);
        // console.log(response.data);
        API(config).then((response) => {
            console.log(response.data);
            setClientes(response.data.results);
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
        fetchClientes();
    }    
    
    useEffect(() => {
        fetchClientes();
    }, []);

    return (
        <Base>
            <div className='ClientesHeader'>
            <h1>Clientes</h1>
                <Create reload={setReload}></Create>
            </div>
                <Table striped>
                    <thead className='theadClientes'>
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
                        <td className='td1Clientes'>{cliente.username}</td>
                        <td className='td2Clientes'>{cliente.first_name}</td>
                        <td className='td3Clientes'>{cliente.last_name}</td>
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