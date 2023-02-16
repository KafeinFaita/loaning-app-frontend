import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login";
import Home from './pages/Home';
import Loans from './pages/Loans';
import Payments from './pages/Payments';
import LoanTypes from './pages/LoanTypes';
import LoanPlans from './pages/LoanPlans';
import Users from './pages/Users';

import Layout from './Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}/> 
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="loans" element={<Loans />} />
        <Route path="payments" element={<Payments />} />
        <Route path="loan-types" element={<LoanTypes />} />
        <Route path="loan-plans" element={<LoanPlans />} />
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
