import { useNavigate } from "react-router-dom";
import DoctorNavbar from "../components/Nabars/DoctorNavbar";
import Navbar from "../components/Nabars/navbar";


const ProtectedRoutes = ({ user, children, roles }) => {

    const navigate = useNavigate();

    if (!user) {
        return (
            <>
                <div className="min-h-[70vh] flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-2xl">You need to login first!</h1>
                    <div className="flex gap-3 flex-wrap">
                        <button onClick={() => navigate('/signin')} className="px-7 py-1 rounded-full bg-primary text-white">Login</button>
                        <button onClick={() => navigate('/')} className="px-7 py-1 rounded-full bg-primary text-white">Back to home</button>
                    </div>
                </div>
            </ >
        )
    }

    if (user && roles.includes(user.role)) {
        return children
    }

    if (user && !roles.includes(user.role)) {
        return (
            <>
                {
                    user.role==='doctor' && <DoctorNavbar />
                }
                <div className="min-h-[70vh] flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-2xl">You are not allowed to access this page.</h1>
                    <div className="flex gap-3 flex-wrap">
                        <button onClick={() => navigate('/')} className="px-7 py-1 rounded-full bg-primary text-white">Back to home</button>
                    </div>
                </div>
            </>
        )
    }
}

export default ProtectedRoutes;