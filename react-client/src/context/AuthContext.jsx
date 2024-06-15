import React, { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(!!Cookies.get('token'));

    useEffect(() => {
        const handleTokenChange = () => {
            setIsAuth(!!Cookies.get('token'))
        };
        
        window.addEventListener('storage', handleTokenChange)
        
    }, [])

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    )
}