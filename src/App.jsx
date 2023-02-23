import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login";
import Home from './pages/Home';
import Loans from './pages/Loans';
import Payments from './pages/Payments';
import LoanPlans from './pages/LoanPlans';
import RoleIndex from './pages/Roles/RoleIndex';
import RoleCreate, { roleCreateLoader } from './pages/Roles/RoleCreate';
import RoleShow, { roleShowLoader } from './pages/Roles/RoleShow'
import RoleEdit from './pages/Roles/RoleEdit';
import UserIndex, { userIndexLoader } from './pages/Users/UserIndex';
import UserShow, { userShowLoader } from './pages/Users/UserShow';
import UserCreate from './pages/Users/UserCreate';
import UserEdit, { UserEditLoader } from './pages/Users/UserEdit';
import LoanTypeIndex, { loanTypeIndexLoader } from './pages/LoanTypes/LoanTypeIndex';
import LoanTypeCreate from './pages/LoanTypes/LoanTypeCreate';
import LoanTypeShow, { loanTypeShowLoader } from './pages/LoanTypes/LoanTypeShow';

import MainLayout from './layouts/MainLayout';
import RoleLayout from './layouts/RoleLayout';
import UserLayout from './layouts/UserLayout';
import LoanTypeLayout from './layouts/LoanTypeLayout';
import PageShowLayout from './layouts/PageShowLayout';
import LoanTypeEdit from './pages/LoanTypes/LoanTypeEdit';

import { AuthProvider } from './contexts/AuthContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}/> 
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="loans" element={<Loans />} />
        <Route path="payments" element={<Payments />} />
        {/* loan type routes */}
        <Route path="loan-types" element={<LoanTypeLayout />}>
          <Route index element={<LoanTypeIndex />} loader={loanTypeIndexLoader} />
          <Route path="create" element={<LoanTypeCreate />} />
          <Route path=":id" element={<PageShowLayout />}>
            <Route index element={<LoanTypeShow />} loader={loanTypeShowLoader} />
            <Route path="edit" element={<LoanTypeEdit />} loader={loanTypeShowLoader} /> 
          </Route>
        </Route>
        <Route path="loan-plans" element={<LoanPlans />} />
        {/* role routes */}
        <Route path="roles" element={<RoleLayout />} >
          <Route index element={<RoleIndex />} loader={roleCreateLoader} />
          <Route path="create" element={<RoleCreate />} />
          <Route path=":id" element={<PageShowLayout />}  >
            <Route index element={<RoleShow />} loader={roleShowLoader} />
            <Route path="edit" element={<RoleEdit />} loader={roleShowLoader}/>
          </Route>
        </Route>
        {/* user routes */}
        <Route path="users" element={<UserLayout />}>
          <Route index element={<UserIndex />} loader={userIndexLoader} />
          <Route path=":id" element={<PageShowLayout />}>
            <Route index element={<UserShow /> } />
            <Route path="edit" element={<UserEdit />} loader={UserEditLoader} />
          </Route>
          <Route path="create" element={<UserCreate /> } loader={roleCreateLoader} />
        </Route>
      </Route>
    </>
    
  )
)

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
  )
}

export default App
