import { Outlet } from "react-router-dom";
import Navbar from './../components/Nabars/navbar'
import { useAuth } from "../context/authContext";


export default function Layout(){

    const { setIsLogoHide } = useAuth();

    return (
        <div>
            <Navbar />
            <main onClick={() => setIsLogoHide(true)} className="min-h-[50vh] mt-[66px] px-3 py-2">
                <Outlet />
            </main>
        </div>
    )
}

// This layout is just to give main content of each page(navbar, footer not included) atleast 50vh height so that we can put the footer at bottom and noticable (on empty page) even if the page has no main content.