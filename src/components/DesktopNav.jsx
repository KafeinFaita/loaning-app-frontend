import { NavLink } from "react-router-dom";
import { FaHandHoldingUsd, FaHome, FaMoneyBillWave, FaColumns, FaListAlt, FaUser } from "react-icons/fa";

const DesktopNav = () => {
    return (
        <div className='max-md:hidden h-screen w-[30%] md:w-[30%] lg:w-[25%] xl:w-[20%] p-8 flex flex-col gap-5'>
            <NavLink to=""><FaHome className="inline-block"/> Home</NavLink>
            <NavLink to="loans"><FaHandHoldingUsd className="inline-block"/> Loans</NavLink>
            <NavLink to="payments"><FaMoneyBillWave className="inline-block"/> Payments</NavLink>
            <NavLink to="loan-plans"><FaColumns className="inline-block"/> Loan Plans</NavLink>
            <NavLink to="loan-types"><FaListAlt className="inline-block"/> Loan Types</NavLink>
            <NavLink to="users"><FaUser className="inline-block"/> Users</NavLink>
        </div>
    )
}

export default DesktopNav;