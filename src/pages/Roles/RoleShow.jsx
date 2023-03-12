import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import LoadingScreen from '../../components/LoadingScreen';
import axios from 'axios'

const RoleShow = () => {
    const { id } = useParams();
    const { privileges, userHasPrivilege } = useContext(AuthContext);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        if (!userHasPrivilege('roles_allow_view')) {
            navigate('/');
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles/${id}`, { withCredentials: true });
                setRole(response.data);
            } catch (error) {
                throw error;
            }
        }

        fetchData();
    }, [])

    if (!role) {
        return <LoadingScreen />
    }
    
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