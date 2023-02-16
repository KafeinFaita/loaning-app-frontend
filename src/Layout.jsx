import { Outlet } from "react-router-dom";
import MobileNav from './components/MobileNav';
import DesktopNav from "./components/DesktopNav";
import { FaHandHoldingUsd, FaHome, FaMoneyBillWave, FaColumns, FaListAlt, FaUser } from "react-icons/fa";

const Layout = () => {
    const links = [
        { url: "", icon: FaHome, text: "Home" },
        { url: "loans", icon: FaHandHoldingUsd, text: "Loans" },
        { url: "payments", icon: FaMoneyBillWave, text: "Payments" },
        { url: "loan-plans", icon: FaColumns, text: "Loan Plans" },
        { url: "loan-types", icon: FaListAlt, text: "Loan Types" },
        { url: "users", icon: FaUser, text: "Users" }
    ]
    return (
        <div className="h-screen">
            <MobileNav links={links}/>
            <div className="App flex">
                <DesktopNav links={links}/>
                <div className='w-full md:w-[70%] lg:w-[75%] xl:w-[80%] h-screen'>
                    <div className="bg-red-200 h-12 max-md:hidden"></div>
                    <Outlet />
                </div>
                
            </div>
        </div>
    )
}

export default Layout;