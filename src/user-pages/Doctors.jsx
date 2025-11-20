import { useEffect, useState } from "react";
import Filter from "../components/docFilter"
import DocList from "../components/docList"
// import data from "./../utils/data"
import { useFilter } from "../context/filterContext";
import axios from "axios";
import { useFetch } from "../context/fetchContext";


export default function Doctors() {

    const { filterValue } = useFilter('all');
    const { allDoctors } = useFetch();

    let filteredDoctors;
    if (filterValue === 'all') {
        filteredDoctors = allDoctors;
    } else {
        filteredDoctors = allDoctors.filter((el) => el.speciality.toLowerCase() == filterValue);
    }

    return (
        <div className="min-h-screen pt-0 flex flex-col md:flex-row gap-1">
            <Filter />
            {
                filteredDoctors?.length > 0 ? <DocList doctors={filteredDoctors} /> : <div className="grow flex justify-center items-center"><h1 className="text-center">No doctor in this speciality yet!</h1></div>
            }
        </div>
    )
}