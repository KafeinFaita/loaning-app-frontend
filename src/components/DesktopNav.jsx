import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import { useContext } from 'react';
import axios from 'axios';

const DesktopNav = ({ links }) => {
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useContext(AuthContext);

    const handleLogout = async e => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/auth`, { withCredentials: true });
            setAuthUser(null);
            navigate('/');
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className='max-md:hidden h-screen w-[30%] md:w-[30%] lg:w-[25%] xl:w-[20%] p-8 bg-gray-100 text-gray-800 border-r-4 border-gray-500'>
            <h1 className="text-xl mb-5">Loaning App</h1>
            {authUser &&
                <>
                    <p>Welcome, <span className='font-bold'>{authUser.username}!</span></p> 
                    <button className='mb-20 text-sm underline' onClick={handleLogout}>Logout</button>
                </>
            }
            <div className="flex flex-col gap-5">
                {links.map(link => {
                const Icon = link.icon;
                return(
                    <NavLink to={link.url} key={link.text}><Icon className="inline-block"/> {link.text}</NavLink>
                )
                
            })}
            </div>
            
        </div>
    )
}

export default DesktopNav;