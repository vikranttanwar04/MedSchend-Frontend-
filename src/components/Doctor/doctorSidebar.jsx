import { NavLink } from "react-router-dom";


export default function DoctorSidebar () {

    return (
        <aside className="hidden md:block min-h-screen min-w-[180px] max-w-[180px] border-r">
            <div>
                <ul className="flex flex-col gap-2">
                    <li><NavLink to='/doctor/dash' className={({isActive}) => isActive ? 'block px-3 py-2 border-r-2 bg-[#c0cafd] border-primary' : 'block px-3 py-2'}>Dashboard</NavLink></li>
                    <li><NavLink to='/doctor/appointments' className={({isActive}) => isActive ? 'block px-3 py-2 border-r-2 bg-[#c0cafd] border-primary' : 'block px-3 py-2'}>Appointments</NavLink></li>
                    <li><NavLink to='/doctor/profile' className={({isActive}) => isActive ? 'block px-3 py-2 border-r-2 bg-[#c0cafd] border-primary' : 'block px-3 py-2'}>Profile</NavLink></li>
                </ul>
            </div>
        </aside>
    )
}