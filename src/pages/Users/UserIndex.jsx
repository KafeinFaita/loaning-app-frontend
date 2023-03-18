import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../../components/LoadingScreen';
import Table from '../../components/Table';


const Users = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, { withCredentials: true })
                setUsers(response.data);
            } catch (error) {
                throw error;
            }
        }

        fetchData();
    }, [])

    const handleDelete = async e => {
        e.preventDefault();
        
        const userId = e.target.getAttribute('user_id');

        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true });
            setUsers(prevUsers => prevUsers.filter(user => user.userId !== userId));
        } catch (error) {
            throw error
        }
    }

    const headers = ['Username', 'Full Name', 'Address', 'Email', 'Actions'];

    if (!users) {
        return <LoadingScreen />
    }

    return (
        <div>
            <Table 
                headers={headers}
                body={users.map(user => {
                    const links = <>
                        <Link to={user.userId} className="text-white bg-gray-700 p-1 text-xs mx-2">View Full Details</Link>
                        <button className="text-white bg-gray-700 p-1 text-xs" user_id={user.userId} onClick={handleDelete}>Delete user</button>
                    </>    
                    return [
                        user.username, 
                        `${user.lastName}, ${user.firstName} ${user.middleName}`,
                        user.address,
                        user.email,
                        links
                    ]
                })}
            />
        </div>
    )
}

export default Users;