import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import LoadingScreen from "../../components/LoadingScreen";
import Table from "../../components/Table";
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

    const tableHeaders = ['Role Title', 'Actions'];

    if (!roles) {
        return <LoadingScreen />
    }

    return (
        <div>
            <Table 
                headers={tableHeaders}
                body={roles.map(role => {
                    const links = <>
                        <Link to={role.roleId} className="text-white bg-gray-700 p-1 text-xs mx-2">View Role Details</Link>
                        <button className="text-white bg-gray-700 p-1 text-xs" role_id={role.roleId} onClick={handleDelete}>Delete Role</button>
                    </>
                    return [
                        role.title,
                        links
                    ]
                })}
            />
        
        </div>
    )
} 

export default Roles;