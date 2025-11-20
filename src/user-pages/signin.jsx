import LoginBar from "../components/auth/loginBar"
import { useNavigate } from "react-router-dom";
import AllSignin from "../components/auth/allSignIn";



export default function Signin() {

    const navigate = useNavigate();

    return (
        <section className="min-h-screen">
            <div className="min-h-screen flex items-center flex-wrap">
                <div className="max-w-[600px] flex-1 mx-auto p-3">
                    <h1 className="py-4 text-center text-2xl">Visit your account</h1>
                    <div className="flex-1 flex-col items-center rounded border pb-3">
                        <LoginBar  />
                        <AllSignin />
                    <p className="text-center">Don't have an account? <span onClick={() => navigate('/signup')} className="underline text-[#5b74f7] cursor-pointer">Register</span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}