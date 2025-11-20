import { useFilter } from "../context/filterContext";


export default function Filter() {

    const { filterValue, setFilterValue } = useFilter();

    const onFilterClick = (event) => {
        const text = event.target.innerText.toLowerCase();

        if (filterValue === text) {
            setFilterValue("all")
        } else {
            setFilterValue(text)
        }
    }

    const filterHandle = (event) => {
        setFilterValue(event.target.value.toLowerCase());
    }

    return (
        <section className="max-w-fit mt-4">
            <div className="pe-3 md:pb-10 md:h-screen flex flex-col gap-2">
                <p>Filter by speciality</p>
                
                {/* For PC Screen */}
                <div className="hidden md:flex flex-col gap-2">
                    <div onClick={onFilterClick} className={`px-3 py-2 border rounded cursor-pointer hover:bg-[#5B74F7] hover:text-amber-50 ${filterValue === "general physician" ? 'bg-[#5b74f7] text-white' : null}`}>General Physician</div>
                    <div onClick={onFilterClick} className={`px-3 py-2 border rounded cursor-pointer hover:bg-[#5B74F7] hover:text-amber-50 ${filterValue === "gynocologist" ? 'bg-[#5b74f7] text-white' : null}`}>Gynocologist</div>
                    <div onClick={onFilterClick} className={`px-3 py-2 border rounded cursor-pointer hover:bg-[#5B74F7] hover:text-amber-50 ${filterValue === "darmatologist" ? 'bg-[#5b74f7] text-white' : null}`}>Darmatologist</div>
                    <div onClick={onFilterClick} className={`px-3 py-2 border rounded cursor-pointer hover:bg-[#5B74F7] hover:text-amber-50 ${filterValue === "cardiologist" ? 'bg-[#5b74f7] text-white' : null}`}>Cardiologist</div>
                    <div onClick={onFilterClick} className={`px-3 py-2 border rounded cursor-pointer hover:bg-[#5B74F7] hover:text-amber-50 ${filterValue === "pediatric" ? 'bg-[#5b74f7] text-white' : null}`}>Pediatric</div>
                    <div onClick={onFilterClick} className={`px-3 py-2 border rounded cursor-pointer hover:bg-[#5B74F7] hover:text-amber-50 ${filterValue === "neurologist" ? 'bg-[#5b74f7] text-white' : null}`}>Neurologist</div>
                    <div onClick={onFilterClick} className={`px-3 py-2 border rounded cursor-pointer hover:bg-[#5B74F7] hover:text-amber-50 ${filterValue === "gastroenterologist" ? 'bg-[#5b74f7] text-white' : null}`}>Gastroenterologist</div>
                </div>

                {/* For Mobile Screen */}
                <select value={filterValue} onChange={filterHandle} className="w-fit md:hidden border focus:outline-none px-3 py-2 rounded" required>
                    <option value='all' className="focus:outline-none">All</option>
                    <option value='general physician' className="focus:outline-none">General Physician</option>
                    <option value='gynocologist' className="focus:outline-none">Gynocologist</option>
                    <option value='darmatologist' className="focus:outline-none">Darmatologist</option>
                    <option value='cardiologist' className="focus:outline-none">Cardiologist</option>
                    <option value='pediatric' className="focus:outline-none">Pediatric</option>
                    <option value='neurologist' className="focus:outline-none">Neurologist</option>
                    <option value='gastroenterologist' className="focus:outline-none">Gastroenterologist</option>
                </select>
            </div>

        </section>
    )
}