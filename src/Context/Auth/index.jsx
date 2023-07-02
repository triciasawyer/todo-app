import React, { useEffect, useState } from 'react';
// import testUsers from './lib/users';
import jwt_decode from "jwt-decode";
import cookie from 'react-cookies';
import axios from 'axios';

export const AuthContext = React.createContext();


function AuthProvider({ children }){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        let cookieToken = cookie.load('auth')
        _validateToken(cookieToken);
    }, []);

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
    };

    const login = async (username, password) => {
        let config = {
          baseURL: 'https://api-js401.herokuapp.com',
          url: '/signin',
          method: 'post',
          auth: { username, password },
        }
        let response = await axios(config);
        console.log('user---------', response.data);
        let token = response.data.token
        if (token){
          try {
            _validateToken(token)
          } catch(err){
            setError(err);
            console.log(err);
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