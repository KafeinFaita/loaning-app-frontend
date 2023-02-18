import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
const RoleCreate = () => {
    const navigate = useNavigate();
    const checkboxRef = useRef([]);
    const titleRef = useRef('');

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

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const filteredPrivileges = checkboxRef.current.filter(box => box.checked).map(box => box.value);
            const response = axios.post(`${import.meta.env.VITE_API_URL}/api/roles`, {
                title: titleRef.current,
                privileges: filteredPrivileges
            })
            console.log(response.data)
            navigate('/dashboard/roles')
            
        } catch (error) {
            throw error
        }

        
    }

    // handler to automatically disable and uncheck related boxes when the VIEW privilege of that page is unchecked
    const handleDisableCheckboxes = (e) => {
        checkboxRef.current.forEach((el, index) => {
            let isGroupHead = (el.getAttribute("grouphead") === "true");

            if (e.target.checked) {
                if (!isGroupHead && e.target.getAttribute("group") === el.getAttribute("group")) {
                    el.disabled = false;
                }
            } else {
                if (!isGroupHead && e.target.getAttribute("group") === el.getAttribute("group")) {
                    el.disabled = true;
                    el.checked = false;
                }
            }
        })
    }

    const handleTitle = e => {
        titleRef.current = e.target.value;
    }

    return (
        <form>
            <label htmlFor="role_title">
                Role Title: <input type="text" name="title" id="role_title" onChange={handleTitle} className="border border-gray-800 rounded-lg" />
            </label>

            <div>
                <p>Select the privileges allowed for this role.</p>

                <div className='flex flex-col'>
            {privileges.map((privilege, index) => {
                return (
                    <label htmlFor={privilege.name} key={privilege.name} className={privilege.groupHead ? "font-bold mt-4" : null}>
                        <input 
                            type="checkbox" 
                            ref={el => { checkboxRef.current[index] = el }}
                            id={privilege.name}  
                            onChange={privilege.groupHead ? handleDisableCheckboxes : null}
                            value={privilege.name}
                            defaultChecked={privilege.groupHead ? true : false}
                            grouphead={privilege.groupHead ? "true" : "false"}
                            group={privilege.group}
                        />
                        {privilege.description}
                    </label>
                )
            })}
                </div>
            </div>

            <button onClick={handleSubmit} className="border border-black p-2">Submit</button>
        </form>
    )
}

export default RoleCreate;