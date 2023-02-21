import axios from 'axios';
import { useLoaderData, useNavigate } from "react-router-dom";

const UserEdit = () => {
    const navigate = useNavigate();
    const user = useLoaderData().user;
    const roles = useLoaderData().roles;
    const userFields = [
        { title: "Username", nameId: "username", inputType: "text" },
        { title: "Password", nameId: "password", inputType: "password" },
        { title: "Last Name", nameId: "lastName", inputType: "text" },
        { title: "First Name", nameId: "firstName", inputType: "text" },
        { title: "Middle Name", nameId: "middleName", inputType: "text" },
        { title: "Complete Address", nameId: "address", inputType: "text" },
        { title: "E-mail Address", nameId: "email", inputType: "email" },
        
    ];

    const handleSubmit = async e => {
        e.preventDefault();

        console.log('inside submit ')
    
        //convert the checkbox nodelist into array, get the ones that are checked, and extract their values
        const roles = Array.from(e.target.role).filter(role => role.checked).map(role => role.value);

        console.log(e.target.username)
       
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${user.userId}`, {
                username: e.target.username.value,
                lastName: e.target.lastName.value,
                firstName: e.target.firstName.value,
                middleName: e.target.middleName.value,
                address: e.target.address.value,
                email: e.target.email.value,
                roles
            });
            console.log(response);
            navigate(`/dashboard/users/${user.userId}`);
        } catch (error) {
            throw error
        }

    }

    return (
        <form onSubmit={handleSubmit}>
    {userFields.map(field => {
        return (
            <label htmlFor={field.nameId} className="w-full max-w-xs">
                {field.title}
                <input type={field.inputType} name={field.nameId} id={field.nameId} className="block border border-gray-800 w-full" defaultValue={user[field.nameId]}/>
            </label>   
        )})
    }

    {roles.map(role => {
        const hasRole = user.roles.find(userRole => role._id === userRole._id)
     
        return (
            <label htmlFor="role">
                <input type="checkbox" name="role" value={role._id} defaultChecked={hasRole ? true: false} />
                {role.title}
            </label>
        )
    })}

            <input type="submit" value="Submit" />
        </form>
    )
}

export const UserEditLoader = async({ params }) => {
    try {
        const user = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${params.id}`);
        const roles = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`);

        return { user: user.data, roles: roles.data };
    } catch (error) {
        throw error
    }
}

export default UserEdit;