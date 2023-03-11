import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import LoadingScreen from "../../components/LoadingScreen";
import axios from "axios";

const Roles = () => {
    const navigate = useNavigate();
    const { userHasPrivilege } = useContext(AuthContext);
    const [roles, setRoles] = useState(null);

    useEffect(() => {
        if (!userHasPrivilege("roles_allow_view")) {
            navigate('/')
        }

        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`, { withCredentials: true });
                console.log(response.data)
                setRoles(response.data);
            } catch (error) {
                throw error
            }
        }

        fetchData()
        
    }, [])

    const handleDelete = async e => {
        const roleId = e.target.getAttribute('role_id');

        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/roles/${roleId}`, { withCredentials: true });
            console.log(response.data)
            
            // remove the deleted role from the table
            setRoles(prevRoles => prevRoles.filter(role => role.roleId !== roleId));
            
        } catch (error) {
            throw error
        } 
    }

    if (!roles) {
        return <LoadingScreen />
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Role Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
            {roles.map(role => {
                return (
                    <tr key={role.roleId} className="bg-gray-400"> 
                        <td>{role.title}</td>
                        <td>
                            <Link to={role.roleId} className="text-white bg-gray-700 p-1 text-xs mx-2">View Role Details</Link>
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