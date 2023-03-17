import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import LoadingScreen from "../../components/LoadingScreen";
import Error from "../Error";

const UserCreate = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState(null);
    const [error, setError] = useState(null);
    const [hasFetchError, setHasFetchError] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`, { withCredentials: true });
                console.log(response.data)
        
                setRoles(response.data);
            } catch (error) {
                setHasFetchError(true)
            }
        }

        fetchData();
    }, [])

    const userFields = [
        { title: "Username", nameId: "username", inputType: "text", required: true },
        { title: "Password", nameId: "password", inputType: "password", required: true },
        { title: "Last Name", nameId: "lastName", inputType: "text", required: true },
        { title: "First Name", nameId: "firstName", inputType: "text", required: true },
        { title: "Middle Name", nameId: "middleName", inputType: "text", required: true },
        { title: "Complete Address", nameId: "address", inputType: "text" },
        { title: "E-mail Address", nameId: "email", inputType: "email" },
    ];

    const handleSubmit = async e => {
        e.preventDefault();

        setError(null);
    
        //convert the checkbox nodelist into array, get the ones that are checked, and extract their values
        const roles = Array.from(e.target.role).filter(role => role.checked).map(role => role.value);
        console.log(roles)
        if (roles.length < 1) {
            return setError('Select at least one role');
        }
       
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
                username: e.target.username.value,
                password: e.target.password.value,
                lastName: e.target.lastName.value,
                firstName: e.target.firstName.value,
                middleName: e.target.middleName.value,
                address: e.target.address.value,
                email: e.target.email.value,
                roles
            }, { withCredentials: true });

            navigate('/dashboard/users');
        } catch (error) {
            setError(error.response.data.error);
        }

    }

    if (!roles) {
        return <LoadingScreen />
    }

    if (hasFetchError) {
        return <Error />
    }

    return (
        <form className="flex flex-wrap gap-6 flex-col bg-red-100" onSubmit={handleSubmit}>
            <p className="text-red-500 italic">{error}</p>
            
    {userFields.map(field => {
        return (
            <label htmlFor={field.nameId} className="w-full max-w-xs">
                {field.title}
                <input type={field.inputType} name={field.nameId} id={field.nameId} className="block border border-gray-800 w-full" required={field.required}/>
            </label>   
        )
        })

    }
            <div>
                <p>Select roles for this user.</p>
        {roles.map(role => {
            return (
                <label htmlFor="role">
                    <input type="checkbox" name="role" value={role._id} />
                    {role.title}
                </label>
            )
        })}
            </div>

            <input type="submit" value="Submit" className="text-white bg-gray-700 p-2 w-24"/>
            
        </form>
    )
} 

export default UserCreate;