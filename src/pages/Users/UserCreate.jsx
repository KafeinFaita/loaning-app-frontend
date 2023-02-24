import { useLoaderData, useNavigate } from "react-router-dom";
import axios from 'axios';

const UserCreate = () => {
    const navigate = useNavigate();
    const roles = useLoaderData();

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
            console.log(response);
            navigate('/dashboard/users');
        } catch (error) {
            throw error
        }

    }

    return (
        <form className="flex flex-wrap gap-6 flex-col bg-red-100" onSubmit={handleSubmit}>
{userFields.map(field => {
    return (
        <label htmlFor={field.nameId} className="w-full max-w-xs">
            {field.title}
            <input type={field.inputType} name={field.nameId} id={field.nameId} className="block border border-gray-800 w-full"/>
        </label>   
    )
    })

}
            <div>
                <p>Select roles for this user.</p>
        {roles.data.map(role => {
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