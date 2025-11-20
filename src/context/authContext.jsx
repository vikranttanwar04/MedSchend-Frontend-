import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";

const authContext = createContext();

const AuthProvider = ({ children }) => {

    const [signUpFor, setSignUpFor] = useState({
        user: true,
        doctor: false
    })

    const [isLogoHide, setIsLogoHide] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(user) return;

        const fetch = async () => {
            try {
                const { data } = await axios.get('http://localhost:8080/getme', { withCredentials: true });
                setUser(data.user);
            } catch (err) {
                console.log(err);
            }
        }
        fetch();
    }, []);

    return (
        <authContext.Provider value={{ signUpFor, setSignUpFor, user, setUser, isLogoHide, setIsLogoHide }}>
            {children}
        </authContext.Provider>
    )
}

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };