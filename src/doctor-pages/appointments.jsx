import { useEffect, useState } from "react";
import assets from "../assets";
import axios from "axios";
import { useAuth } from "../context/authContext";
import Loader from "../components/loader/loader";
import FlashMsg from "../components/messages/FlashMsg";
import api from "../../api.js";


export default function DoctorAppointments() {
    
    const { user } = useAuth();
    const [allAppointments, setAllAppointments] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [flash, setFlash] = useState({ status: "", message: "" });
    const [isLoading, setIsLoading] = useState(true);

    // Fetching all Appointments of Doctor
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await api.get("/doctor/getAllAppointments", { params: { id: user._id }, withCredentials: true })
                setAllAppointments(res.data);
            } catch (error) {
                const errMsg = error.response?.data?.message || error.message
                console.log(error);
                alert(errMsg);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAppointments()
    }, [refresh]);

    const onCompleteClick = async (appointment) => {
        try {
            const res = await api.post("/appointment/completed", {}, { params: { id: appointment._id }, withCredentials: true })
            res && setRefresh(!refresh);
            setFlash({ status: "warn", message: res.data.message });
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message;
            console.log(err);
            setFlash({ status: "failed", message: errMsg });
        }
    }

    const onCancelBookingClick = async (appointment) => {
        try {
            const res = await api.post("appointment/cancelled", {}, { params: { id: appointment._id }, withCredentials: true })
            res && setRefresh(!refresh);
            setFlash({ status: "warn", message: res.data.message });
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message;
            console.log(err);
            setFlash({ status: "failed", message: errMsg });
        }
    }

    return (
        <>
            {
                flash?.status === "success" ? <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} /> :
                    flash?.status === "failed" ? <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} /> :
                        flash?.status === "warn" && <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} />
            }
            {
                isLoading ? <Loader loadingText="Fetching data" /> :
                    <div>
                        <div className="w-full 1000:w-[90%]">
                            <h1 className="text-xl mb-2">All Appointments</h1>
                            {
                                allAppointments.length > 0 ?
                                    <div className="overflow-x-auto">
                                        <table className="min-w-[660px] md:w-full bg-white rounded">
                                            <thead className="border-b border-gray-400">
                                                <tr className="w-full">
                                                    <th className="p-2 text-start font-medium text-sm">#</th>
                                                    <th className="p-2 text-start font-medium text-sm">Patient</th>
                                                    <th className="p-2 text-start font-medium text-sm">Age</th>
                                                    <th className="p-2 text-start font-medium text-sm">Payment</th>
                                                    <th className="p-2 text-start font-medium text-sm">Date & Time</th>
                                                    <th className="p-2 text-start font-medium text-sm">Fees</th>
                                                    <th className="p-2 text-center font-medium text-sm">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    allAppointments.length > 0 && allAppointments.slice().reverse().map((el, index) => {
                                                        return (
                                                            <tr key={index} className="w-full border-t border-gray-400">
                                                                <td className="p-2 text-start text-sm">{index + 1}</td>
                                                                <td className="flex items-center gap-1 p-2 text-start text-sm">
                                                                    <div className="size-[30px]"><img src={el.user.image.url} alt="patient image" className="size-full rounded-full" /></div>
                                                                    <p>{el.bookingFor}</p>
                                                                </td>
                                                                <td className="p-2 text-start text-sm">{el.user.age}</td>
                                                                <td className="p-2 text-start text-sm">
                                                                    <p className={`flex justify-center items-center w-fit px-2 rounded-full border border-black ${el.payment === "online" && "bg-primary text-white"} `}>
                                                                        {el.payment === "online" ? "PAID" : "COM"}
                                                                    </p>
                                                                </td>
                                                                <td className="p-2 text-start text-sm">{new Date(el.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}, {el.time}</td>
                                                                <td className="p-2 text-start text-sm">$ {user.fee}</td>
                                                                <td className="p-2 text-center text-xs">
                                                                    <div className={`mx-auto flex justify-center items-center font-md
                                                        ${el.status === "cancelled" ? "w-fit px-2 py-1 rounded-full  bg-red-300 text-red-600" : el.status === "completed" && "w-fit px-2 py-1 rounded-full bg-primary text-amber-50"}`}>
                                                                        {
                                                                            el.status === "booked" ?
                                                                                <div className="flex gap-4">
                                                                                    <div onClick={() => onCancelBookingClick(el)} className="flex justify-center items-center size-3 p-3 bg-red-300 text-red-600 rounded-full"><i className="fa-solid fa-xmark text-xs text-red-400"></i></div>
                                                                                    <div onClick={() => onCompleteClick(el)} className="flex justify-center items-center size-3 p-3 bg-green-700 text-green-400 rounded-full"><i className="fa-solid fa-check text-xs"></i></div>
                                                                                </div> : el.status.toUpperCase()
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div> : <div className='max-w-[600px] px-3 py-2 text-center text-xl font-semibold border rounded'>No Appointments yet!</div>
                            }
                        </div>
                    </div>
            }
        </>
    )
}
