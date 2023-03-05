import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    // function to check if user is authorized to access a route
    const checkUserPrivilege = (privilege) => {
        const userRole = authUser.roles.find(role => role.privileges.includes(privilege))
    
        if (userRole) {
            return true;
        }
        return false;
    }

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, checkUserPrivilege }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;