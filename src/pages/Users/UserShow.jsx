import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';


const UserShow = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`, { withCredentials: true });
                setLoading(false);
                setUser(response.data);
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, [])

    if (loading) {
        return (
            <LoadingScreen />
        )
    } else {
        return (
            <div>
                <h1>Viewing {user.username}'s profile</h1>
                <div>
                    <p>Full name: {user.firstName} {user.middleName} {user.lastName}</p>
                    <p>Address: {user.address}</p>
                    <p>Email: {user.email}</p>
                    <p>Member Since: {user.createdAt}</p>
                </div>
                <Link to="edit" className='bg-gray-700 text-white p-2 mt-5 inline-block'>Edit this user</Link>
            </div>
        )
    }
}


export default UserShow;