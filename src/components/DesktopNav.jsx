import { NavLink } from "react-router-dom";

const DesktopNav = () => {
    return (
        <div className='max-md:hidden h-screen w-[30%] md:w-[30%] lg:w-[25%] xl:w-[20%]'>
            <NavLink to="" className="text-white">Home</NavLink>
            <NavLink to="login">Login</NavLink>
        </div>
    )
}

export default DesktopNav;