import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {

    const [filterValue, setFilterValue] = useState("all");

    return(
        <FilterContext.Provider value={{filterValue, setFilterValue}}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilter = () => useContext(FilterContext);

export {FilterProvider, useFilter};