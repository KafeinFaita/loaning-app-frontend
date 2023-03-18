import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login";
import Home from './pages/Home';
import Payments from './pages/Payments';
import RoleIndex from './pages/Roles/RoleIndex';
import RoleCreate from './pages/Roles/RoleCreate';
import RoleShow from './pages/Roles/RoleShow'
import RoleEdit from './pages/Roles/RoleEdit';
import UserIndex from './pages/Users/UserIndex';
import UserShow from './pages/Users/UserShow';
import UserCreate from './pages/Users/UserCreate';
import UserEdit from './pages/Users/UserEdit';
import LoanTypeIndex from './pages/LoanTypes/LoanTypeIndex';
import LoanTypeCreate from './pages/LoanTypes/LoanTypeCreate';
import LoanTypeShow from './pages/LoanTypes/LoanTypeShow';
import LoanGridIndex from './pages/LoanGrid/LoanGridIndex';
import LoanGridCreate from './pages/LoanGrid/LoanGridCreate';
import LoanMembers from './pages/Loans/LoanMembers';
import LoanIndex from './pages/Loans/LoanIndex';
import LoanCreate from './pages/Loans/LoanCreate';
import LoanShow from './pages/Loans/LoanShow';
import LoanEdit from './pages/Loans/LoanEdit';
import Profile from './pages/Profile';
import Error from './pages/Error';

import MainLayout from './layouts/MainLayout';
import PageMainLayout from './layouts/PageMainLayout';
import UserLayout from './layouts/UserLayout';
import LoanTypeLayout from './layouts/LoanTypeLayout';
import LoanGridLayout from './layouts/LoanGridLayout';
import PageShowLayout from './layouts/PageShowLayout';
import LoanTypeEdit from './pages/LoanTypes/LoanTypeEdit';

import { AuthProvider } from './contexts/AuthContext';

const links = {
  loans: [
    { url: "", title: "Your Loans", privilege: "loans_allow_view" },
    { url: "members", title: "Member Loans", privilege: "loans_allow_view_members" },
    { url: "create", title: "Apply for Loan", privilege: "loans_allow_add" },
  ],
  roles: [
    { url: "", title: "Roles", privilege: "roles_allow_view" },
    { url: "create", title: "Create New Role", privilege: "roles_allow_add" },
  ],
  loanGrids: [
    { url: "", title: "Loan Grid", privilege: "roles_allow_view" },
    { url: "create", title: "Create New Role", privilege: "roles_allow_add" },
  ],
  loanTypes: [
    { url: "", title: "Loan Types", privilege: "loantypes_allow_view" },
    { url: "create", title: "Create New Role", privilege: "loantypes_allow_add" },
  ]
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />}/> 
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="loans" element={<PageMainLayout links={links.loans}/>} >
          <Route index element={<LoanIndex />} />
          <Route path="members" element={<LoanMembers />}/>
          <Route path="create" element={<LoanCreate />} />
          <Route path=":id" element={<PageShowLayout />}>
            <Route index element={<LoanShow />} errorElement={<Error />}/>
            <Route path="edit" element={<LoanEdit />} />
          </Route>
        </Route>
        <Route path="payments" element={<Payments />} />
        {/* loan type routes */}
        <Route path="loan-types" element={<PageMainLayout links={links.loanTypes} />}>
          <Route index element={<LoanTypeIndex />} />
          <Route path="create" element={<LoanTypeCreate />} />
          <Route path=":id" element={<PageShowLayout />}>
            <Route index element={<LoanTypeShow />} />
            <Route path="edit" element={<LoanTypeEdit />} /> 
          </Route>
        </Route>
        {/* loan grid routes */}
        <Route path="loan-grid" element={<LoanGridLayout />}>
          <Route index element={<LoanGridIndex />} />
          <Route path="create" element={<LoanGridCreate />}/>
        </Route>
        {/* role routes */}
        <Route path="roles" element={<PageMainLayout links={links.roles}/>} >
          <Route index element={<RoleIndex />} />
          <Route path="create" element={<RoleCreate />} />
          <Route path=":id" element={<PageShowLayout />}  >
            <Route index element={<RoleShow />}  />
            <Route path="edit" element={<RoleEdit />} />
          </Route>
        </Route>
        {/* user routes */}
        <Route path="users" element={<UserLayout />}>
          <Route index element={<UserIndex />} />
          <Route path=":id" element={<PageShowLayout />}>
            <Route index element={<UserShow /> } />
            <Route path="edit" element={<UserEdit />} />
          </Route>
          <Route path="create" element={<UserCreate /> } />
        </Route>
        <Route path="profile" element={<Profile />}/>
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
