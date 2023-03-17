import { Outlet, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const PageMainLayout = ({ links }) => {
    const { userHasPrivilege } = useContext(AuthContext);
    return (
        <div className='p-10'>
            <div className='flex gap-8'>

                {/* <NavLink to="" className="border border-gray-800 p-1">{indexTitle}</NavLink>
                <NavLink to="create" className="border border-gray-800 p-1">{createTitle}</NavLink> */}
                {links.map(link => {
                    return <NavLink to={link.url} className={`border border-gray-800 p-1 ${userHasPrivilege(link.privilege) ? null : 'hidden'}`}>{link.title}</NavLink>
                })}
            </div>
            <Outlet />
        </div>
    )
}

export default PageMainLayout;