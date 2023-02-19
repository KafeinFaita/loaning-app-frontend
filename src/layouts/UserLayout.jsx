import { Outlet, NavLink } from 'react-router-dom';

const UserLayout = () => {
    
    return (
        <div className='p-10'>
            <div className='flex gap-8'>
                <NavLink to="" className="border border-gray-800 p-1">Users</NavLink>
                {/* <NavLink to="create" className="border border-gray-800 p-1">New Role</NavLink> */}
            </div>
            <Outlet />
        </div>
    )
}

export default UserLayout;