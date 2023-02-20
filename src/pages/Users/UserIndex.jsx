import axios from 'axios';
import { useNavigate, useLoaderData, Link } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();
    const users = useLoaderData();

    const handleDelete = async e => {
        e.preventDefault();
        
        const userId = e.target.getAttribute('user_id');

        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);
            navigate('/dashboard/users', { replace: true });
        } catch (error) {
            throw error
        }
    }

    return (
        <div>
            <table className='border border-collapse border-slate-500'>
                <thead>
                    <tr>
                        <th className='border border-slate-800'>Username</th>
                        <th className='border border-slate-800'>Full Name</th>
                        <th className='border border-slate-800'>Address</th>
                        <th className='border border-slate-800'>Email</th>
                        <th className='border border-slate-800'>Actions</th>
                    </tr>
                </thead>
                <tbody>
            {users.map(user => {
                return (
                    <tr className='border border-slate-800'>
                        <td className='border border-slate-800 px-2'>{user.username}</td>
                        <td className='border border-slate-800 px-2'>{user.lastName}, {user.firstName} {user.middleName}</td>
                        <td className='border border-slate-800 px-2'>{user.address}</td>
                        <td className='border border-slate-800 px-2'>{user.email}</td>
                        <td className='border border-slate-800 px-2'>
                            <Link to={user.userId} className="text-white bg-gray-700 p-1 text-xs mx-2">View Full Details</Link>
                            <button className="text-white bg-gray-700 p-1 text-xs" user_id={user.userId} onClick={handleDelete}>Delete user</button>
                        </td>
                    </tr>
                )
            })}
                </tbody>
            </table>
        </div>
    )
}

export const userIndexLoader = async () => {
    try {
        const users = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
        return users.data;
    } catch (error) {
        throw error
    }
}

export default Users;