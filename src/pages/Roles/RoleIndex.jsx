import { useNavigate, useLoaderData, Link } from "react-router-dom";
import axios from "axios";

const Roles = () => {
    const roles = useLoaderData();
    const navigate = useNavigate();

    const handleDelete = async e => {
        const roleId = e.target.getAttribute('role_id');

        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/roles/${roleId}`);
        navigate('/dashboard/roles', { replace: true });
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Role Title</th>
                        <th>Actions (NOT FUNCTIONAL YET)</th>
                    </tr>
                </thead>
                <tbody>
            {roles.data.map(role => {
                return (
                    <tr key={role.roleId} className="bg-gray-400"> 
                        <td>{role.title}</td>
                        <td>
                            <Link to={role.roleId} className="text-white bg-gray-700 p-1 text-xs mx-2">Edit Role</Link>
                            <button className="text-white bg-gray-700 p-1 text-xs" role_id={role.roleId} onClick={handleDelete}>Delete Role</button>
                        </td>
                    </tr>
                )
            })}     
                </tbody>
            </table>
        
        </div>
    )
} 

export default Roles;