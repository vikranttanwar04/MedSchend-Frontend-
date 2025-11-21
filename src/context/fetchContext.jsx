import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../../api.js";


const fetchContext = createContext();

const FetchProvider = ({ children }) => {

    const [allDoctors, setAllDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await api.get("/getAllDoctors");
                setAllDoctors(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchDoctors();
    }, [])

    return (
        <fetchContext.Provider value={{ allDoctors, setAllDoctors }}>
            {children}
        </fetchContext.Provider>
    )
}

const useFetch = () => useContext(fetchContext);

export {FetchProvider, useFetch};
