import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login";
import Home from './pages/Home';
import Loans from './pages/Loans';
import Payments from './pages/Payments';
import LoanTypes from './pages/LoanTypes';
import LoanPlans from './pages/LoanPlans';
import RoleIndex from './pages/Roles/RoleIndex';
import RoleCreate, { roleCreateLoader } from './pages/Roles/RoleCreate';
import RoleShow, { roleShowLoader } from './pages/Roles/RoleShow'
import Users from './pages/Users';

import MainLayout from './layouts/MainLayout';
import RoleLayout from './layouts/RoleLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}/> 
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="loans" element={<Loans />} />
        <Route path="payments" element={<Payments />} />
        <Route path="loan-types" element={<LoanTypes />} />
        <Route path="loan-plans" element={<LoanPlans />} />
        <Route path="roles" element={<RoleLayout />} >
          <Route index element={<RoleIndex />} loader={roleCreateLoader} />
          <Route path="create" element={<RoleCreate />} />
          <Route path=":id" element={<RoleShow />} loader={roleShowLoader} />
        </Route>
        <Route path="users" element={<Users />} />
      </Route>
    </>
    
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
