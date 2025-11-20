import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const fetchContext = createContext();

const FetchProvider = ({ children }) => {

    const [allDoctors, setAllDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get("http://localhost:8080/getAllDoctors");
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