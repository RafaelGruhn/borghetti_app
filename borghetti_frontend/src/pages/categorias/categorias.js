// /src/pages/Contact.js
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import axios from 'axios'
import { Table, Button, Form } from 'react-bootstrap';
import './categorias.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Delete from './delete';
import Create from './create';
import Update from './update';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [reload, setReload] = useState(false);

    const fetchCategorias = async () => {
        // const response = await axios.get('https://645111d9a32219691159e344.mockapi.io/api/v1/categoria');
        const response = await axios.get('https://6458f77c4eb3f674df82b01f.mockapi.io/api/v1/categorias');
        setCategorias(response.data);
        console.log(response.data);
    }

    if (reload) {
        setReload(false);
        console.log('reload')
        fetchCategorias();
    }    
    
    useEffect(() => {
        fetchCategorias();
    }, []);

    return (
        <Base>
            <h1>Categorias</h1>
            <div className='CategoriasHeader'>
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
                            <th id='th1Categorias'>Nome</th>
                            <th id='th2Categorias'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
            {categorias.map((categoria) => ( 
                    <tr key={categoria.id}>
                        <td>{categoria.name}</td>
                        <td className="text-nowrap">  <Update categoria={categoria} reload={setReload}></Update>{' '} <Delete categoria={categoria} reload={setReload}></Delete> </td>
                    </tr>
                )
                )}
                </tbody>
            </Table>
        </Base>
    )
}

export default Categorias