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
            setCategorias(response.data.results.sort( (a,b) => {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
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
        fetchCategorias();
    }    
    
    useEffect(() => {
        fetchCategorias();
    }, []);

    return (
        <Base>
            <div className='CategoriasHeader BaseHeader'>
                <h2>Categorias</h2>
                <Create reload={setReload}></Create>
            </div>
                <Table responsive striped>
                    <thead style={{display:'none'}}>
                        <tr>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
            {categorias.map((categoria) => ( 
                    <tr key={categoria.id}>
                        <td>{categoria.name}</td>
                        <td style={{width:0}} className="text-nowrap"> <div className="divTableButtons">  <Update categoria={categoria} reload={setReload}></Update>{' '} <Delete categoria={categoria} reload={setReload}></Delete> </div> </td>
                    </tr>
                )
                )}
                </tbody>
            </Table>
        </Base>
    )
}

export default Categorias