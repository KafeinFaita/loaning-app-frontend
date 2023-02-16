import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login";
import Home from './pages/Home';

import Layout from './Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />}/>  
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
