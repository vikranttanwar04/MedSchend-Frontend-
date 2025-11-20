import { useNavigate } from "react-router-dom"
import assets from "../assets"
import generalPhysician from "../assets/General_physician.svg"
import gyno from "../assets/Gynecologist.svg"
import derma from "../assets/Dermatologist.svg"
import pedi from "../assets/Pediatricians.svg"
import neuro from "../assets/Neurologist.svg"
import gastro from "../assets/Gastroenterologist.svg"

export default function Choose() {

    const navigate = useNavigate();

    return (
        <div className="w-[60%] flex flex-col items-center gap-2 mx-auto my-10">
            <h2 className=" text-2xl whitespace-nowrap">Find By Speciality</h2>
            <p className="500:max-w-[61.53%] text-center text-sm">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>

            <div className="flex gap-4 items-center justify-center flex-wrap mt-3">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-15 rounded-full hover:scale-115 transition-all" onClick={() => navigate('/doctors')}><img src={generalPhysician || assets.doctor_icon} className="w-full rounded-full" alt="" /></div>
                    <p className="text-xs whitespace-nowrap">General Physician</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-15 rounded-full hover:scale-115 transition-all" onClick={() => navigate('/doctors')}><img src={gyno || assets.doctor_icon} className="w-full rounded-full" alt="" /></div>
                    <p className="text-xs whitespace-nowrap">Gynocologist</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-15 rounded-full hover:scale-115 transition-all" onClick={() => navigate('/doctors')}><img src={derma || assets.doctor_icon} className="w-full rounded-full" alt="" /></div>
                    <p className="text-xs whitespace-nowrap">Dermatologist</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-15 rounded-full hover:scale-115 transition-all" onClick={() => navigate('/doctors')}><img src={pedi || assets.doctor_icon} className="w-full rounded-full" alt="" /></div>
                    <p className="text-xs whitespace-nowrap">Pediatricians</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-15 rounded-full hover:scale-115 transition-all" onClick={() => navigate('/doctors')}><img src={neuro || assets.doctor_icon} className="w-full rounded-full" alt="" /></div>
                    <p className="text-xs whitespace-nowrap">Neurologist</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-15 rounded-full hover:scale-115 transition-all" onClick={() => navigate('/doctors')}><img src={gastro || assets.doctor_icon} className="w-full rounded-full" alt="" /></div>
                    <p className="text-xs whitespace-nowrap">Gastroenterologist</p>
                </div>
            </div>
        </div>
    )
}