import { Outlet, NavLink } from 'react-router-dom';

const RoleLayout = () => {
    
    return (
        <div className='p-10'>
            <div className='flex gap-8'>
                <NavLink to="" className="border border-gray-800 p-1">Roles</NavLink>
                <NavLink to="create" className="border border-gray-800 p-1">New Role</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default RoleLayout;