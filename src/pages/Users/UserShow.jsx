import axios from 'axios';
import { useLoaderData, Link } from 'react-router-dom';

const UserShow = () => {
    const user = useLoaderData();
    return (
        <div>
            <h1>Viewing {user.username}'s profile</h1>
            <div>
                <p>Full name: {user.firstName} {user.middleName} {user.lastName}</p>
                <p>Address: {user.address}</p>
                <p>Email: {user.email}</p>
                <p>Member Since: {new Date(user.createdAt).toLocaleString()}</p>
            </div>
            <Link to="edit" className='bg-gray-700 text-white p-2 mt-5 inline-block'>Edit this user</Link>
        </div>
    )
}

export const userShowLoader = async ({ params }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${params.id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default UserShow;