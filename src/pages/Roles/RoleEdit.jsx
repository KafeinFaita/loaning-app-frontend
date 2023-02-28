import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RoleEdit = () => {
    const { id } = useParams();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles/${id}`);
                setRole(response.data);
            } catch (error) {
                
            }
        }
        fetchData();
    }, []);

    return (
        <h1>{role ? role.title : id}</h1>
    )
}

export default RoleEdit;