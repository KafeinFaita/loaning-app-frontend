import { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';

const RoleEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    let checkboxRef = useRef([]);
    const titleRef = useRef('');
    const [role, setRole] = useState(null);
    const { privileges } = useContext(AuthContext);

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

    // handler to automatically disable and uncheck related boxes when the VIEW privilege of that page is unchecked
    const handleDisableCheckboxes = e => {
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

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const filteredPrivileges = checkboxRef.current.filter(box => box.checked).map(box => box.value);
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/roles/${id}`, {
                title: titleRef.current,
                privileges: filteredPrivileges
            }, { withCredentials: true })
            console.log(response.data)
            navigate('/dashboard/roles')
            
        } catch (error) {
            throw error
        }
    }

    const handleTitle = e => {
        titleRef.current = e.target.value;
    }

    if (!role) return <h1>PLEASE WAIT</h1>

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="role_title">
                    Role Title: <input type="text" name="title" id="role_title" className="border border-gray-800 rounded-lg" defaultValue={role.title} onChange={handleTitle} />
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
                                defaultChecked={role.privileges.includes(privilege.name) ? true : false}
                                grouphead={privilege.groupHead ? "true" : "false"}
                                group={privilege.group}
                            />
                            {privilege.description}
                        </label>
                    )
                })}
                    </div>
                </div>

                <button className="border border-black p-2">Submit</button>
            </form>
        </div>
    )
}

export default RoleEdit;