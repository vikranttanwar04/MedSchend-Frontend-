import LoginBar from "../components/auth/loginBar"
import { useAuth } from "../context/authContext"
import UserSignup from "../components/auth/userSignup";
import DoctorSignup from "../components/auth/doctorSignup";
import { Link, useNavigate } from "react-router-dom";



export default function Signup() {


    const { signUpFor } = useAuth();
    const navigate = useNavigate();

    return (
        <section className="min-h-screen">
            <div className="min-h-screen flex items-center flex-wrap">
                <div className="max-w-[600px] flex-1 mx-auto p-3">
                    <h1 className="py-4 text-center text-2xl">Create Account</h1>
                    <div className="flex-1 flex-col items-center rounded border pb-3">
                        <LoginBar  />
                        { signUpFor?.user && <UserSignup /> }
                        { signUpFor?.doctor && <DoctorSignup /> }
                    <p className="text-center">Already have an account? <span onClick={() => navigate('/signin')} to="signin" className="underline text-[#5b74f7] cursor-pointer">Login</span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}