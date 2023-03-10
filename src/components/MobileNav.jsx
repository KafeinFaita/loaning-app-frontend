import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import AuthContext from '../contexts/AuthContext';
import { useContext } from 'react';

const MobileNav = ({ links }) => {
    const { authUser } = useContext(AuthContext);
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <nav className="flex justify-between p-7 bg-green-100 md:hidden">
            <h1>LOGO</h1>

            <div onClick={handleNav}>
                {nav ? <AiOutlineClose className='md:hidden'/> : <AiOutlineMenu className='md:hidden'/>}
            </div>

            <div className={nav ? "fixed h-full border-r border-r-gray-800 w-[60%] bg-gray-200 -left-1 top-20 z-10 md:hidden p-8" : "fixed -left-96"}>
                {authUser ? <p>Welcome, <span className='font-bold'>{authUser.username}!</span></p> : null}
                <button className='mb-20 text-sm underline'>Logout</button>


                <div className='flex flex-col gap-4'>
            {links.map(link => {
                const Icon = link.icon;
                return(
                    <NavLink to={link.url} end={link.url === '/'? true : false} onClick={handleNav} key={link.text}><Icon className="inline-block"/> {link.text}</NavLink>
                )
                
            })}
                </div>
                
            </div>
        </nav>
    )
}

export default MobileNav;