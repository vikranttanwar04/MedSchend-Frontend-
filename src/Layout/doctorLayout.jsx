import { Outlet } from "react-router-dom"
import DoctorNavbar from "../components/Nabars/DoctorNavbar"
import DoctorSidebar from "../components/Doctor/doctorSidebar"



export default function DoctorLayout({ children }) {

    return (
        <>
            <DoctorNavbar />
            <div className="md:flex mt-[66px]">
                <DoctorSidebar />
                <main className="min-h-[50vh] md:grow p-3">
                    <Outlet />
                </main>
            </div>
        </>
    )
}