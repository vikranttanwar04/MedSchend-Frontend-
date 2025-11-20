import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import Logo from "./../../assets/medsched-logo.png";


export default function DoctorNavbar() {
    const navigate = useNavigate();

    const { setUser, setIsLogoHide } = useAuth();

    const onLogoutClick = async () => {
        try {
            await axios.post("http://localhost:8080/logout", {}, { withCredentials: true });

            setUser(null);
            setIsLogoHide(true);
            navigate('/signin');
        } catch (err) {
            console.log(err);
        }
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header>
            <nav className="w-full fixed top-0 flex justify-between items-center p-3 bg-white z-10 border-b border-gray-400">
                <div className="flex gap-2 justify-center items-center cursor-pointer" onClick={() => navigate('/doctor/dash')}>
                    <div className="size-10"><img src={Logo} alt="Website Logo" /></div>
                    <div className="flex flex-col justify-center items-center">
                        <div>MedSched</div>
                        <span className="w-fit px-2 text-xs rounded-full flex justify-center items-center text-white bg-primary border border-black">Doctor</span>
                    </div>
                </div>
                <div className="hidden md:flex px-3 py-1 justify-center items-center text-sm rounded-[100px] text-amber-50 bg-[#5B74F7] cursor-pointer" onClick={onLogoutClick}>Log out</div>

                {/* Hamburger */}
                <div onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen), setIsLogoHide(true) }} className="md:hidden cursor-default"><i className="fa-solid fa-bars"></i></div>

                {
                    isMobileMenuOpen &&
                    <div className="flex flex-col justify-between absolute w-[180px] h-[100vh] top-0 right-0 bg-primary/50 backdrop-blur-2xl py-2 md:hidden z-50">
                        <ul>
                            <div onClick={() => setIsMobileMenuOpen(false)} className="w-fit relative left-1 bottom-1 font-semibold"><i className="fa-solid fa-xmark"></i></div>
                            <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to='/doctor/dash' className={({ isActive }) => isActive ? 'block px-3 py-2 border-l-2 border-black text-white font-semibold bg-primary' : 'block px-3 py-2 border-l-2 border-transparent'}>Dashboard</NavLink></li>
                            <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to='/doctor/appointments' className={({ isActive }) => isActive ? 'block px-3 py-2 border-l-2 border-black text-white font-semibold bg-primary' : 'block px-3 py-2 border-l-2 border-transparent'}>Appointments</NavLink></li>
                            <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to='/doctor/profile' className={({ isActive }) => isActive ? 'block px-3 py-2 border-l-2 border-black text-white font-semibold bg-primary' : 'block px-3 py-2 border-l-2 border-transparent'}>Profile</NavLink></li>
                        </ul>
                    </div>
                }
            </nav>
        </header>
    )
}