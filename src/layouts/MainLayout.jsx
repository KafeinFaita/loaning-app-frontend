import { useState, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';

import MobileNav from '../components/MobileNav';
import DesktopNav from "../components/DesktopNav";
import { FaHandHoldingUsd, FaHome, FaMoneyBillWave, FaColumns, FaListAlt, FaPeopleArrows, FaUser } from "react-icons/fa";
import AuthContext from "../contexts/AuthContext";
import LoadingScreen from "../components/LoadingScreen";


const Layout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { authUser, setAuthUser } = useContext(AuthContext);
    const links = [
        { url: "", icon: FaHome, text: "Home" },
        { url: "loans", icon: FaHandHoldingUsd, text: "Loans" },
        { url: "payments", icon: FaMoneyBillWave, text: "Payments" },
        { url: "loan-grid", icon: FaColumns, text: "Loan Grid" },
        { url: "loan-types", icon: FaListAlt, text: "Loan Types" },
        { url: "roles", icon: FaPeopleArrows, text: "Roles" },
        { url: "users", icon: FaUser, text: "Users" }
    ];

    // check if user is logged in when app is re-mounted or refreshed
    useEffect(() => {
        const fetchData = async() => {
            try {
                const user = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth`, {
                    withCredentials: true
                });
                console.log(user.data)
                setLoading(false);
                setAuthUser(user.data);
            } catch (error) {
                setAuthUser(null);
                navigate('/');
            }
            
        }
        fetchData();
        
    }, [])

    const handleLogout = async e => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/auth`, { withCredentials: true });
            setAuthUser(null);
            navigate('/');
        } catch (error) {
            throw error;
        }
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className="min-h-full">
            <MobileNav links={links}/>
            <div className="App flex h-full">
                <DesktopNav links={links}/>
                <div className='w-full md:w-[70%] lg:w-[75%] xl:w-[80%] grow h-full'>
                    <div className="bg-gray-200 h-12 max-md:hidden flex items-center justify-end gap-2 pr-10">
                        <p>Welcome, <span className='font-bold'>{authUser.username}!</span></p> 
                        <button className='text-sm underline' onClick={handleLogout}>Logout</button>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
    

   
    
}

export default Layout;