import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const MobileNav = () => {

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <nav className="flex justify-between p-7 bg-green-100">
            <h1>LOGO</h1>

            <div onClick={handleNav}>
                {nav ? <AiOutlineClose className='md:hidden'/> : <AiOutlineMenu className='md:hidden'/>}
            </div>

            <div className={nav ? "fixed h-full border-r border-r-gray-800 w-[60%] bg-slate-800 -left-1 top-20 z-10 md:hidden" : "fixed -left-96"}>
                <p>Welcome, User!</p>

                <div>
                    <NavLink to="" className="text-white">Home</NavLink>
                    <NavLink to="login">Login</NavLink>
                </div>
                
            </div>
            {/* <div className="flex gap-4">
                <NavLink index>Home</NavLink>
                <NavLink to="login">Login</NavLink>
            </div> */}
        </nav>
    )
}

export default MobileNav;