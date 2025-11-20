import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useState } from "react";
import Logo from "./../../assets/medsched-logo.png";


export default function Navbar() {
    const navigate = useNavigate();

    const { user, setUser, isLogoHide, setIsLogoHide } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const onLogoutClick = async () => {
        try {
            await axios.post("http://localhost:8080/logout", {}, { withCredentials: true });

            setUser(null);
            setIsLogoHide(true);
            setIsMobileMenuOpen(false);
            navigate('/signin');
        } catch (err) {
            console.log(err);
        }
    }

    const onProfileClick = () => {
        user.role === 'patient' ? navigate('/userprofile') : user.role === 'doctor' ? navigate('/doctor/profile') : null;
        setIsLogoHide(true);
    }

    return (
        <header>
            <nav className="w-full fixed top-0 flex justify-between items-center p-3 bg-white z-10 border-b border-gray-400">
                <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="size-10 "><img src={Logo} alt="Website Logo" /></div>
                    <div className="flex flex-col justify-center">
                        <div className="font-semibold">MedSched</div>
                        <div className="text-xs ">Your Health, Your Choice</div>
                    </div>
                </div>

                <ul className="hidden 800:flex gap-4">
                    <li><NavLink to='/' className={({ isActive }) => isActive ? 'border-b-2 border-[#5B74F7]' : null}>HOME</NavLink></li>
                    <li><NavLink to='/doctors' className={({ isActive }) => isActive ? 'border-b-2 border-[#5B74F7]' : null}>ALL DOCTORS</NavLink></li>
                    <li><NavLink to='/about' className={({ isActive }) => isActive ? 'border-b-2 border-[#5B74F7]' : null}>ABOUT</NavLink></li>
                    <li><NavLink to='/contact' className={({ isActive }) => isActive ? 'border-b-2 border-[#5B74F7]' : null}>CONTACT</NavLink></li>
                </ul>

                <div className="flex items-center gap-4">
                    {/* Hamburger */}
                    <div onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen), setIsLogoHide(true) }} className="800:hidden cursor-default"><i className="fa-solid fa-bars"></i></div>

                    {
                        !user?.role ?
                            <Link to="/signup" className="hidden 800:flex px-3 py-2 justify-center items-center rounded-[100px] text-sm text-amber-50 bg-[#5B74F7]">Create account</Link>
                            :
                            <div className="w-[30px] h-[30px] relative flex justify-center items-center rounded-[100px] text-sm text-amber-50 bg-[#5B74F7]" onClick={() => setIsLogoHide(!isLogoHide)}>
                                <img src={user.image?.url} className="w-full h-full rounded-full" alt="profile" />
                            </div>
                    }
                </div>

                {/* Menu-Bar(Home, All Doctors, About, Contact) for mobile screens */}
                {
                    isMobileMenuOpen &&
                    <div className="flex flex-col justify-between absolute w-[180px] h-[100vh] top-0 right-0 bg-primary/50 backdrop-blur-2xl py-2 800:hidden z-50">
                        <ul>
                            <div onClick={() => setIsMobileMenuOpen(false)} className="w-fit relative left-1 bottom-1 font-semibold"><i className="fa-solid fa-xmark"></i></div>
                            <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to='/' className={({ isActive }) => isActive ? 'block px-3 py-2 border-l-2 border-black text-white font-semibold bg-primary' : 'block px-3 py-2 border-l-2 border-transparent'}>HOME</NavLink></li>
                            <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to='/doctors' className={({ isActive }) => isActive ? 'block px-3 py-2 border-l-2 border-black text-white font-semibold bg-primary' : 'block px-3 py-2 border-l-2 border-transparent'}>ALL DOCTORS</NavLink></li>
                            <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to='/about' className={({ isActive }) => isActive ? 'block px-3 py-2 border-l-2 border-black text-white font-semibold bg-primary' : 'block px-3 py-2 border-l-2 border-transparent'}>ABOUT</NavLink></li>
                            <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to='/contact' className={({ isActive }) => isActive ? 'block px-3 py-2 border-l-2 border-black text-white font-semibold bg-primary' : 'block px-3 py-2 border-l-2 border-transparent'}>CONTACT</NavLink></li>
                        </ul>
                        {
                            !user?.role ? <div onClick={() => { setIsMobileMenuOpen(false), navigate('/signup') }} className="block px-3 py-2 border-l-2 border-transparent text-center bg-black/50 text-white font-semibold cursor-pointer">Sign Up</div> : <div onClick={onLogoutClick} className="block px-3 py-2 border-l-2 border-transparent text-center bg-red-400/50 cursor-pointer">Sign Out</div>
                        }
                    </div>
                }

                {/* For Login Users */}
                {
                    !isLogoHide && <ul className="w-[150px] absolute right-1 top-12 rounded border bg-amber-50/50 z-10">
                        {
                            user?.role === 'doctor' && <li className="border-b px-3 py-2 cursor-pointer" onClick={() => navigate('/doctor/dash')}>Doctor Dashboard</li>
                        }
                        <li className="border-b px-3 py-2 cursor-pointer" onClick={onProfileClick}>Profile</li>
                        {
                            user?.role === 'patient' && <li className="px-3 py-2 cursor-pointer" onClick={() => { navigate('/myappointments'), setIsLogoHide(true) }}>My Appointments</li>
                        }
                    </ul>
                }
            </nav>
        </header>
    )
}