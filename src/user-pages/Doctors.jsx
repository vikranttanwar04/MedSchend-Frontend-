import Filter from "../components/docFilter"
import DocList from "../components/docList"
import { useFilter } from "../context/filterContext";
import { useFetch } from "../context/fetchContext";
import Loader from "../components/loader/loader";


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
                allDoctors.length===0 && <div className="flex grow justify-center items-center"><Loader loadingText="Fetching Doctors" /></div>
            }
            {
                allDoctors.length!=0 && filteredDoctors.length > 0 && <DocList doctors={filteredDoctors} />
            }
            {
                allDoctors.length>0 && filteredDoctors.length === 0 && <div className="grow flex justify-center items-center"><h1 className="text-center">No doctor in this speciality yet!</h1></div>
            }
        </div>
    )
}
