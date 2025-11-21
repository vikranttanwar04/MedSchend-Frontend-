import { useEffect, useState } from "react";
import assets from "../assets";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/loader";
import api from "../api.js";


export default function UserAppointments() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await api.get('/appointment/getUserAppointments', { params: { id: user._id }, withCredentials: true });
                setAppointments(res.data);
            } catch (err) {
                const errMsg = err.response?.data?.message || err.message
                console.log(err);
                alert(errMsg);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAppointments();
    }, []);

    return (
        <>
            <h1 className="mb-2 text-xl font-extralight">My Appointments</h1>
            {
                isLoading ? <Loader loadingText="Fetching data" /> :
                    <div className="flex flex-col gap-4">   {/* Appointments Container */}
                        {
                            appointments.length > 0 && appointments.slice().reverse().map((el, index) => {
                                return (
                                    <section key={index} className="max-w-fit 500:max-w-[810px] p-3 flex flex-col items-center 500:items-stretch 700:flex-row flex-wrap gap-2 justify-between bg-white shadow-sm">
                                        {/* Appointment Information */}
                                        <div className="flex flex-col 500:flex-row gap-3">
                                            <div className="w-[150px] mx-auto 500:mx-0 rounded"><img src={el.doctor.image.url} className="w-full rounded" alt="Doctor image" /></div>
                                            <div className="flex flex-col place-content-center gap-2">
                                                <h2 onClick={() => navigate(`/doc/${el.doctor._id}`)} className="w-fit font-semibold cursor-pointer">{el.doctor.name}</h2>
                                                <p className="text-sm">{el.doctor.speciality}</p>
                                                <p className="text-sm"><span className="font-semibold">Address: </span>{el.doctor.address}</p>
                                                <p className="text-sm"><span className="font-semibold">Date & Time: </span> {el.date} | {el.time} </p>
                                                <p className="text-sm"><span className="font-semibold">Booked on: </span> {new Date(el.bookedAt).toLocaleString("en-IN", { month: "short", day: "numeric", year: "numeric" })} | {new Date(el.bookedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false })} </p>
                                            </div>
                                        </div>

                                        {/* Booked, Pay Online, Cancel */}
                                        <div className="flex 500:justify-between 700:flex-col gap-2">
                                            <div className={`510:w-[150px] text-xs px-4 py-2 flex justify-center items-center border border-black text-white ${el.status === "booked" ? 'bg-blue-300' : el.status === "completed" ? 'bg-green-700/50' : 'bg-red-700/50'}`}>
                                                {(el.status).toUpperCase()}
                                            </div>
                                            <div className="flex 700:flex-col gap-2">
                                                {
                                                    el.status === "booked" &&
                                                    <>
                                                        <button disabled={el.payment === "COM"} className={`510:w-[150px] text-xs px-4 py-2 flex justify-center items-center border ${el.payment === "COM" && 'text-white bg-primary'} hover:text-white hover:bg-primary`}>
                                                            {el.payment === "online" ? "PAID" : "PAY ONLINE"}
                                                        </button>
                                                        <button className="510:w-[150px] text-xs px-4 py-2 flex justify-center items-center border hover:text-white hover:bg-red-900">CANCEL</button>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </section>
                                )
                            })
                        }
                    </div>
            }

        </>
    )
}
