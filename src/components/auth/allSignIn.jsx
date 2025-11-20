import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FlashMsg from "./../messages/FlashMsg";
import Loader from "../loader/loader";


export default function AllSignin() {
    const navigate = useNavigate();

    const { signUpFor, setUser } = useAuth();
    const [flash, setFlash] = useState({ status: "", message: "" });
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const [showLoader, setShowLoader] = useState(false);

    const onInputChange = (event) => {
        setData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const onFormSubmit = async (e) => {
        setShowLoader(true);
        e.preventDefault();
        const url = signUpFor.user ? 'http://localhost:8080/patient/auth/login' : 'http://localhost:8080/doctor/auth/login';
        try {
            await axios.post(url, data, { withCredentials: true, headers: { "Content-Type": "application/json" } });

            const res = await axios.get('http://localhost:8080/getme', { withCredentials: true });
            setUser(res.data.user);
            setFlash(prev => ({ ...prev, status: "success", message: "You're successfully logged in!" }));
            (res.data.user.role === "patient") ? navigate('/userprofile') : navigate('/doctor/profile');
        } catch (err) {
            let errMsg = err.response?.data?.message || err.message
            setFlash(prev => ({ ...prev, status: "failed", message: errMsg }));
            console.log(err);
        } finally {
            setShowLoader(false);
        }   
    }

    return (
        <>
            {
                flash.message && <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} />
            }
            <form action={signUpFor?.user ? 'http://localhost:8080/patient/auth/login' : signUpFor?.doctor ? 'http://localhost:8080/doctor/auth/login' : null} method="post" className="p-3" onSubmit={onFormSubmit}>
                <div className="w-[80%] flex flex-col gap-2 mx-auto">

                    <input className="border focus:outline-none px-3 py-2 rounded" type="email" name="email" placeholder="email" value={data.email} onChange={onInputChange} required />

                    <input className="border focus:outline-none px-3 py-2 rounded" type="password" name="password" placeholder="password" value={data.password} onChange={onInputChange} required />

                    {
                        showLoader ? <button disabled={true}  className="px-3 py-2 rounded border hover:bg-[#5B74F7] hover:text-amber-50"><Loader loadingText="Fetching" /></button> :
                        signUpFor.user ? <button className="px-3 py-2 rounded border hover:bg-[#5B74F7] hover:text-amber-50">Login as Patient</button> :
                        signUpFor.doctor && <button className="px-3 py-2 rounded border hover:bg-[#5B74F7] hover:text-amber-50">Login as Doctor</button>
                    }

                </div>
            </form>
        </>
    )
}