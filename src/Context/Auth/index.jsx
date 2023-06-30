import React, { useState } from 'react';
import testUsers from './lib/users';
import jwt_decode from 'jwt-decode';

export const AuthContext = React.createContext();


function AuthProvider({ children }) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);


    const _validateToken = (token) => {
        try {
            let validUser = jwt_decode(token);
            if (validUser) {
                //save cookie
                console.log('validUser', validUser);
                // cookie.save('auth', token);
                setUser(validUser);
                setLoggedIn(true);
                console.log('logged in!');
            }
        } catch (err) {
            setError(err);
            console.log('err')
        }
    }

    const login = (username, password) => {
        let user = testUsers[username];
        if (user && user.password === password) {
            try {
                _validateToken(user.token)
            } catch (err) {
                setError(err);
                console.log(err);
            }
        }
    }


    const logout = () => {
        setUser({});
        setLoggedIn(false);
        // could remove cookie here
    }


    const can = (capability) => {
        return user?.capabilities?.includes(capability)
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