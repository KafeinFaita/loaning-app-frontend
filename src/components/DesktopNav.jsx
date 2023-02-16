import { NavLink } from "react-router-dom";

const DesktopNav = ({ links }) => {
    return (
        <div className='max-md:hidden h-screen w-[30%] md:w-[30%] lg:w-[25%] xl:w-[20%] p-8 bg-gray-100 text-gray-800 border-r-4 border-gray-500'>
            <h1 className="text-xl mb-16">Loaning App</h1>
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