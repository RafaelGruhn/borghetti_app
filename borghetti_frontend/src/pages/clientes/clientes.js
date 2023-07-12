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
            setClientes(response.data.results.sort( (a,b) => {
                var textA = a.first_name.toUpperCase();
                var textB = b.first_name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;                
            }));
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
            <div className='ClientesHeader BaseHeader'>
            <h2>Clientes</h2>
                <Create reload={setReload}></Create>
            </div>
                <Table responsive striped>
                    <thead className='theadClientes'>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
            {Clientes
                .filter((cliente) => cliente.username !== "admin")
                .map((cliente) => ( 
                    <tr key={cliente.id}>
                        <td>{cliente.username}</td>
                        <td>{cliente.first_name}</td>
                        <td>{cliente.last_name}</td>
                        <td style={{width:0}} className="text-nowrap"> <div className="divTableButtons">  <Update cliente={cliente} reload={setReload}></Update>{' '} <Delete cliente={cliente} reload={setReload}></Delete> </div> </td>
                    </tr>
                )
                )}
                </tbody>
            </Table>
        </Base>
    )
}

export default Clientes