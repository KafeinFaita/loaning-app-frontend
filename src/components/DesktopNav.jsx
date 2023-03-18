import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const DesktopNav = ({ links }) => {
    const { userHasPrivilege } = useContext(AuthContext)

    return (
        <div className='max-md:hidden max-h-full w-[30%] md:w-[30%] lg:w-[25%] xl:w-[20%] 2xl:w-[15%] py-8 pl-12 bg-blue-800 text-white'>
            <h1 className="text-xl mb-20">Loaning App</h1>
            <div className="flex flex-col gap-7">
                {links.map(link => {
                const Icon = link.icon;
                return(
                    <NavLink 
                        to={link.url} 
                        key={link.text} 
                        className={({ isActive }) => isActive ? `font-bold ${userHasPrivilege(link.privilege) ? null : 'hidden'}` : `${userHasPrivilege(link.privilege) ? null : 'hidden'}`}>
                        
                        <Icon className="inline-block"/> {link.text}
                    </NavLink>
                )
            })}
            </div>
            
        </div>
    )
}

export default DesktopNav;