import { useNavigate } from "react-router-dom";
import assets from "../assets";
import { useAuth } from "../context/authContext";
import doctor_img from "../assets/appointment_img.png"



export default function AccountPanel() {

    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="w-[90%] max-w-[930px] mx-auto my-7 flex flex-col 450:flex-row gap-1 rounded-xl bg-[#5b74f7]">
            <div className="w-[70%] p-[7%] pe-0 680:pe-[7%]">
                <h2 className="mb-2 text-3xl text-white">Book Appointment With 100+ Trusted Doctors</h2>
                <div className="flex 550:justify-start">
                    {
                        !user?.role ?
                            <button className="w-fit px-6 py-2 text-xs 550:text-sm flex justify-center items-center bg-white border rounded-[100px] whitespace-nowrap cursor-pointer" onClick={() => navigate('/signup')}>Create account</button> :
                            <button className="w-fit px-6 py-2 text-xs 550:text-sm flex justify-center items-center bg-white border rounded-[100px] whitespace-nowrap cursor-pointer" onClick={() => navigate('/doctors')}>Book appointment &rarr;</button>
                    }
                </div>
            </div>
            {/* <div className="grow mx-3 relative bottom-5 rounded-4xl"> */}
            <div className="w-[30%] min-w-[140.4px] mx-3 relative left-20 410:left-40 450:left-0 flex items-end 650:items-start 650:bottom-5">
                <img src={doctor_img} className="w-full" alt="Doctor image" />
            </div>
        </div>
    )
}