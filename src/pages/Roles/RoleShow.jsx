import { useLoaderData, Link } from 'react-router-dom';
import axios from 'axios'

export const roleShowLoader = async ({ params }) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles/${params.id}`);
    return response.data;
}

const RoleShow = () => {
    const role = useLoaderData();

    const privileges = [
        // payments group
        { name: "payments_allow_view", description: "Allow users with this role to view the Payments page", groupHead: true, group: "payments" },
        { name: "payments_allow_add", description: "Allow users with this role to add a new payment in the database", group: "payments" },
        { name: "payments_allow_edit", description: "Allow users with this role to edit a payment", group: "payments" },
        { name: "payments_allow_delete", description: "Allow users with this role to delete payments from the database", group: "payments" },

        // loan plans group
        { name: "loanplans_allow_view", description: "Allow users with this role to view the Loan Plans page", groupHead: true, group: "loanplans" },
        { name: "loanplans_allow_add", description: "Allow users with this role to add a new loan plan in the database", group: "loanplans" },
        { name: "loanplans_allow_edit", description: "Allow users with this role to edit a loan plan", group: "loanplans" },
        { name: "loanplans_allow_delete", description: "Allow users with this role to delete loan plans from the database", group: "loanplans" },

        // loan types group
        { name: "loantypes_allow_view", description: "Allow users with this role to view the Loan Types page", groupHead: true, group: "loantypes" },
        { name: "loantypes_allow_add", description: "Allow users with this role to add a new loan type in the database", group: "loantypes" },
        { name: "loantypes_allow_edit", description: "Allow users with this role to edit a loan type", group: "loantypes" },
        { name: "loantypes_allow_delete", description: "Allow users with this role to delete loan types from the database", group: "loantypes" },

        // user group
        { name: "users_allow_view", description: "Allow users with this role to view the Users page", groupHead: true, group: "user" },
        { name: "users_allow_add", description: "Allow users with this role to add a new user in the database", group: "user" },
        { name: "users_allow_edit", description: "Allow users with this role to edit a user's profile details", group: "user" },
        { name: "users_allow_delete", description: "Allow users with this role to delete user accounts from the database", group: "user" },

        //role group
        { name: "roles_allow_view", description: "Allow users with this role to view the Roles page", groupHead: true, group: "role" },
        { name: "roles_allow_add", description: "Allow users with this role to add a new roles in the database", group: "role" },
        { name: "roles_allow_edit", description: "Allow users with this role to edit an existing role", group: "role" },
        { name: "roles_allow_delete", description: "Allow users with this role to delete roles from the database", group: "role" }
    ];
    return (
        <div>
            <h1 className='font-bold text-2xl'>{role.title}</h1>
            <h2 className='font-medium'>Privileges allowed to this role:</h2>
            <ul>       
    {role.privileges.map(priv => {
        let privObject = privileges.find(x => x.name === priv)
        return (
                <li className='list-disc list-item' key={priv}>{privObject ? privObject.description : null}</li>
        )
    })}
            </ul>

            <Link to="edit">Edit this role</Link>
        </div>
    )
}

export default RoleShow; 