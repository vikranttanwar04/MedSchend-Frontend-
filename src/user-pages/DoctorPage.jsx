import { useNavigate, useParams } from "react-router-dom";
import DocDetails from "../components/docDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFetch } from "../context/fetchContext";
import Book from "./Book";
import FlashMsg from "../components/messages/FlashMsg";
import api from "../../api.js";


export default function DoctorPage() {

    const navigate = useNavigate();
    const { id } = useParams()
    const { allDoctors } = useFetch();
    const [doctor, setDoctor] = useState({ info: "", slotes: "" });
    const [isBookingWindowOpen, setIsBookingWindowOpen] = useState(false);
    const [selectedDateAndTime, setSelectedDateAndTime] = useState({ date: "", time: "", bookingtimeSloteId: "" })
    const [flash, setFlash] = useState({message: "", status: ""});

    // Fetching the information of the specific doctor
    useEffect(() => {
        const doctorById = async () => {
            try {
                const res = await api.get("/getTheDoctor", { params: { id: id }, withCredentials: true });
                setDoctor(prev => ({ ...prev, info: res.data.doctor, slotes: res.data.slotes }))
            } catch (err) {
                const errMsg = err.response?.data?.message || err.message
                alert(errMsg);
                console.log(err);
            }
        }

        doctorById()
    }, [id]);

    // If doctor id is wrong or invalid
    if (!doctor.info) return <div className="h-screen flex justify-center items-center"><h1 className="text-center">No Doctor found with this ID!</h1></div>

    // Related Doctors
    const related = [];
    for (let el of allDoctors) {
        // We want only maximum 10 related doctors even if there are more than 10
        if (related.length < 10) {
            if (el.speciality === doctor.info.speciality && el._id != id) {
                related.push(el);
            }
        }else if(related.length>=10){
            break;
        }
    }

    return (
        <>  
            {
                flash.message && <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} />
            }
            {
                isBookingWindowOpen && <Book setIsBookingWindowOpen={setIsBookingWindowOpen} selectedDateAndTime={selectedDateAndTime} doctor={doctor.info} setFlash={setFlash} />
            }
            <DocDetails doctor={doctor} setIsBookingWindowOpen={setIsBookingWindowOpen} selectedDateAndTime={selectedDateAndTime} setSelectedDateAndTime={setSelectedDateAndTime} />
            <div>
                <div className="430:w-[90%] mx-auto mt-4 flex flex-col items-center gap-2">
                    <h2 className="text-2xl text-center">Related Doctors</h2>
                    <p className="text-sm text-center">Simply browse through our extensive list of trusted doctors.</p>
                    <div className="px-3 py-10 mx-auto grid grid-cols-2 550:grid-cols-3 700:grid-cols-4 875:grid-cols-5 gap-4">
                        {
                            related &&
                            related.map((doctor, index) => {
                                return (
                                    <div key={index} onClick={() => {setIsBookingWindowOpen(false), navigate(`/doc/${doctor._id}`)}} className="w-full min-w-[141.4px] border rounded-md cursor-pointer hover:-translate-y-2 hover:transition-all">
                                        <div className="w-full min-w-[154.82px]"><img src={doctor.image.url} className="w-full h-[157.15px]" alt="Doctor Image" /></div>
                                        <div className="px-3 py-2">
                                            <p className={`w-fit text-sm font-semibold flex items-center gap-1 ${doctor.isAvailable && 'text-green-700'}`}><span className="text-4xl">&middot;</span>{doctor.isAvailable ? "Available" : "Not Available"}</p>
                                            <h2 className="text-lg whitespace-nowrap">{doctor.name}</h2>
                                            <h3 className="text-sm">{doctor.speciality}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
