import React, { useState } from 'react';
import testUsers from './lib/users';
import jwt_decode from "jwt-decode";
import cookie from 'react-cookies';

export const AuthContext = React.createContext();

// useEffect to load cookie here!!

function AuthProvider({ children }){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    const _validateToken = (token) => {
        try {
            let validUser = jwt_decode(token);
            if(validUser){
                // save cookie
                cookie.save('auth', token);
                setUser(validUser);
                setIsLoggedIn(true);
            }
        } catch(err){
            setError(err);
            console.log(err);
        }
    }

    const login = (username, password) => {
        let user = testUsers[username];
        if(user && user.password === password){
            try {
                _validateToken(user.token);
            } catch(e){
                setError(e);
                console.log(e);
            }
        }
    }

    const logout = () => {
        setUser({});
        setIsLoggedIn(false);
    }

    const can = (capability) => {
        return user?.capabilities?.includes(capability);
    }

    const values = {
        isLoggedIn,
        user,
        error,
        login,
        logout,
        can,
    }

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;