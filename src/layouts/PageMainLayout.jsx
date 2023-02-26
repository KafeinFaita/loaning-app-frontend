import { Outlet, NavLink } from 'react-router-dom';

const PageMainLayout = ({ indexTitle, createTitle }) => {
    return (
        <div className='p-10'>
            <div className='flex gap-8'>
                <NavLink to="" className="border border-gray-800 p-1">{indexTitle}</NavLink>
                <NavLink to="create" className="border border-gray-800 p-1">{createTitle}</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default PageMainLayout;