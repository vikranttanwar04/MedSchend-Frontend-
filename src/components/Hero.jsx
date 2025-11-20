import { useNavigate } from "react-router-dom"
import assets from "../assets"
import header_img from "../assets/header_img.png"
import { useFetch } from "../context/fetchContext";


export default function Hero() {

    const navigate = useNavigate();
    const { allDoctors } = useFetch();

    return (
        <div className="w-[90%] max-w-[930px] mx-auto pt-4 flex flex-col-reverse justify-center 820:flex-row items-center 820:items-end gap-4 820:gap-10 rounded-xl bg-[#5b74f7]">

            <div className="w-[90%] 820:w-1/2 pb-[5%] 820:py-[5%] flex flex-col gap-4">
                <h1 className="text-2xl 500:text-3xl text-white text-center 630:text-start">Book Appointment With Trusted Doctors</h1>
                <div className="w-full flex flex-col 550:flex-row justify-center items-center text-white">
                    <div className="w-[20%] mb-2 550:mb-0 flex items-center">
                        <img onClick={() => window.open(`/doc/${allDoctors[0]?._id}`, "_blank")} src={allDoctors[0]?.image?.url || assets.doctor_icon} className="w-1/3 aspect-square rounded-full hover:scale-105" />
                        <img onClick={() => window.open(`/doc/${allDoctors[1]?._id}`, "_blank")} src={allDoctors[1]?.image?.url || assets.doctor_icon} className="relative right-2 w-1/3 rounded-full hover:scale-105" />
                        <img onClick={() => window.open(`/doc/${allDoctors[2]?._id}`, "_blank")} src={allDoctors[2]?.image?.url || assets.doctor_icon} className="relative right-4 w-1/3 rounded-full hover:scale-105" />
                    </div>
                    <p className="w-[80%] text-xs text-justify">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                </div>
                <div className="flex justify-center 550:justify-start">
                    <button className="w-fit px-6 py-2 text-xs 550:text-sm flex justify-center items-center bg-white border rounded-[100px] whitespace-nowrap cursor-pointer" onClick={() => navigate('/doctors')}>Book appointment &rarr;</button>
                </div>
            </div>

            <div className="w-[40%] 820:w-[25%] min-w-[140.4px]">
                <img src={header_img} className="w-full" alt="Doctor Image" />
            </div>
        </div>
    )
}