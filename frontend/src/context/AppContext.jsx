import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext();

export const AppContextProvider = (props)=>{
        const [user, setUser] = useState(false);
        const [token, setToken] = useState(localStorage.getItem('token'));

        const navigate = useNavigate();

        const backendUrl= import.meta.env.VITE_BACKEND_URL;

        const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
        navigate('/')
    }

        const value = {
            user, setUser, token, setToken, backendUrl, logout
        };

        return (
            <AppContext.Provider value={value}>
                {props.children}
            </AppContext.Provider>
        )
}

