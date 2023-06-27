// /src/pages/Contact.js
import React, { useEffect , useState} from 'react'
import Base from '../../components/Base'
import API from '../../api.js';
import { Table } from 'react-bootstrap';
import './categorias.css'
import Delete from './delete';
import Create from './create';
import Update from './update';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [reload, setReload] = useState(false);



    const fetchCategorias = async () => {
        const config = {
            method: 'get',
            url: 'api/product-types/',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenAccess'))}`,
            },
        };
        // const response = await API(config);
        // setCategorias(response.data.results);
        // console.log(response.data);
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
            <div className='CategoriasHeader'>
            <h1>Categorias</h1>
                <Create reload={setReload}></Create>
            </div>
                <Table striped>
                    <thead style={{display:'none'}}>
                        <tr>
                            <th id='th1Categorias'>Nome</th>
                            <th id='th2Categorias'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
            {categorias.map((categoria) => ( 
                    <tr key={categoria.id}>
                        <td className='td1Categorias'>{categoria.name}</td>
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