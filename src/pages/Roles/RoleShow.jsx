import { useLoaderData } from 'react-router-dom';
import axios from 'axios'

export const roleShowLoader = async ({ params }) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles/${params.id}`);
    return response.data;
}

const RoleShow = () => {
    const role = useLoaderData();
    return (
        <div>
            <h1>{role.roleId}</h1>
        </div>
    )
}

export default RoleShow; 