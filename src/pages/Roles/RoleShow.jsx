import { useLoaderData, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios'

export const roleShowLoader = async ({ params }) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles/${params.id}`, { withCredentials: true });
    console.log(response)
    return response.data;
}

const RoleShow = () => {
    const role = useLoaderData();
    const { privileges } = useContext(AuthContext);
    
    return (
        <div>
            <h1 className='font-bold text-2xl'>{role.title}</h1>
            <h2 className='font-medium'>Privileges allowed to this role:</h2>
            <ul>       
    {role.privileges.map(priv => {
        let privObject = privileges.find(x => x.name === priv)
        return (
                <li className='list-disc list-item' key={priv}>{privObject ? privObject.description : null}</li>
        )
    })}
            </ul>

            <Link to="edit" className='p-2 bg-gray-700 inline-block text-white mt-5'>Edit this role</Link>
        </div>
    )
}

export default RoleShow; 