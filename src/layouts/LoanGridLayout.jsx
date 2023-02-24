import { Outlet, NavLink } from 'react-router-dom';

const LoanGridLayout = () => {
    
    return (
        <div className='p-10'>
            <div className='flex gap-8'>
                <NavLink to="" className="border border-gray-800 p-1">Loan Grid</NavLink>
                <NavLink to="create" className="border border-gray-800 p-1">New Loan Grid</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default LoanGridLayout;