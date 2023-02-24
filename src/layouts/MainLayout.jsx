import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';

import MobileNav from '../components/MobileNav';
import DesktopNav from "../components/DesktopNav";
import { FaHandHoldingUsd, FaHome, FaMoneyBillWave, FaColumns, FaListAlt, FaPeopleArrows, FaUser } from "react-icons/fa";
import AuthContext from "../contexts/AuthContext";


const Layout = () => {
    const navigate = useNavigate();
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

    // useEffect(() => {
    //     const fetchData = async() => {
    //         try {
    //             const user = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth`, {
    //                 withCredentials: true
    //             });
            
    //             if (user.data.error) {
                
    //                 return navigate('/');
    //             }
    //             setAuthUser(user.data);
    //         } catch (error) {
    //             throw error;
    //         }
            
    //     }
    //     if (!authUser) {
    //         fetchData()
    //     }
        
    // }, [])

    if (authUser) {
        return (
            <div className="min-h-full">
                <MobileNav links={links}/>
                <div className="App flex h-full">
                    <DesktopNav links={links}/>
                    <div className='w-full md:w-[70%] lg:w-[75%] xl:w-[80%] grow h-full'>
                        <div className="bg-red-200 h-12 max-md:hidden"></div>
                        <Outlet />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <h1>PLEASE WAIT</h1>
    )
    
}

export default Layout;