import { useAuth } from "../../context/authContext";


export default function LoginBar() {

    const { signUpFor, setSignUpFor } = useAuth();

    const handleAdmin = (event) => {
        if (event.target.id === 'user') {
            setSignUpFor((prev) => ({ ...prev, user: true, doctor: false }))
        } else if (event.target.id === 'doctor') {
            setSignUpFor((prev) => ({ ...prev, user: false, doctor: true }))
        }
    }

    return (
        <div className="min-w-full flex items-center bg-blue-300/25 rounded-t">
            <h2 className={`w-[50%] px-3 py-2 text-center rounded-r-full rounded-tl cursor-pointer ${signUpFor.user && "bg-[#5B74F7] text-amber-50"}`} id='user' onClick={handleAdmin}>Patient</h2>
            <h2 className={`w-[50%] px-3 py-2 text-center rounded-l-[100px] rounded-tr-2xl cursor-pointer ${signUpFor.doctor && "bg-[#5B74F7] text-amber-50"}`} id="doctor" onClick={handleAdmin}>Doctor</h2>
        </div>
    )
}