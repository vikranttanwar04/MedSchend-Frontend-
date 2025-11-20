import { useState } from 'react';
import assets from './../assets';
import MyCalender from '../components/calender/calender';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import FlashMsg from '../components/messages/FlashMsg';
import Loader from '../components/loader/loader';

export default function DoctorDash() {

    const [isCalenderOn, setIsCalender] = useState(false);
    const [slotes, setSlotes] = useState([]);
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState("");
    const [flash, setFlash] = useState({
        status: "",
        message: ""
    })
    const [doctorPatientData, setDoctorPatientData] = useState({ fiveAppointments: "", currentAppointments: "", totalPatients: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);

    // Fetching Alloted-Slotes Data from server
    useEffect(() => {
        async function fetchSlotes() {
            try {
                const res = await axios.get("http://localhost:8080/doctor/getAllSlotes", { params: { id: user._id }, withCredentials: true });
                const futureDatesOnly = res?.data?.filter((el) => new Date(el.date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0))
                futureDatesOnly.length > 0 &&
                    setSlotes(futureDatesOnly);
                setSelectedDate(futureDatesOnly[0]?.date);
            } catch (error) {
                const errMsg = error.response?.data?.message || error.message;
                alert(errMsg);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSlotes();
    }, [refresh])

    // Fetching all Appointments of Doctor
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get("http://localhost:8080/doctor/getAllAppointments", { params: { id: user._id }, withCredentials: true })
                const appointments = [];
                for (let i = 0; i < 5; i++) {
                    appointments.push(res.data[i]);
                    if (res.data.length === i + 1) break
                }
                const completed = res.data?.filter((el) => el.status === "completed");
                const current = res.data?.filter((el) => el.status === "booked");
                setDoctorPatientData({ fiveAppointments: appointments, currentAppointments: current, appointmentsCompleted: completed, totalPatients: res.data.length });
            } catch (error) {
                const errMsg = error.response?.data?.message || error.message
                console.log(error);
            }
        }
        fetchAppointments()
    }, [refresh]);

    const timeSlotesForCurrentDate = slotes?.find((el) => el.date === selectedDate);

    const onAddMoreClick = (event) => {
        event.stopPropagation();
        setIsCalender(true);
    }

    const onCompleteClick = async (appointment) => {
        try {
            const res = await axios.post("http://localhost:8080/appointment/completed", {}, { params: { id: appointment._id }, withCredentials: true })
            res && setRefresh(!refresh);
            setFlash({ status: "success", message: res.data.message });
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message;
            console.log(err);
            setFlash({ status: "failed", message: errMsg });
        }
    }

    const onCancelBookingClick = async (appointment) => {
        try {
            const res = await axios.post("http://localhost:8080/appointment/cancelled", {}, { params: { id: appointment._id }, withCredentials: true })
            res && setRefresh(!refresh);
            setFlash({ status: "warn", message: res.data.message });
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message;
            console.log(err);
            setFlash({ status: "failed", message: errMsg });
        }
    }

    return (
        <div className="min-h-full" onClick={() => setIsCalender(false)}>
            {
                flash?.status === "success" ? <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} /> :
                    flash?.status === "failed" ? <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} /> :
                        flash?.status === "warn" && <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} />
            }
            <div className="w-full flex flex-col gap-3 410:w-fit">
                <section className="grid grid-cols-[minmax(210px,220px)] 410:grid-cols-[1fr_1fr] 450:grid-cols-[repeat(2,minmax(210px,220px))] 680:grid-cols-[repeat(3,minmax(210px,220px))] gap-3">
                    <div className="px-3 py-2 flex items-center gap-3 rounded-md bg-white shadow-sm">
                        <div className="w-[66px]"><img src={assets.doctor_icon} alt="Money logo" className="w-full" /></div>
                        <div className="flex flex-col grow gap-1">
                            <p className="font-medium">&#8377; {doctorPatientData.appointmentsCompleted?.length * user.fee}</p>
                            <h3 className="text-black/50">Earnings</h3>
                        </div>
                    </div>

                    <div className="px-3 py-2 flex items-center gap-3 rounded-md bg-white shadow-sm">
                        <div className="w-[66px]"><img src={assets.doctor_icon} alt="appointment logo" className="w-full" /></div>
                        <div className="flex flex-col grow gap-1">
                            <p className="font-medium">{doctorPatientData.currentAppointments.length}</p>
                            <h3 className="text-black/50">Appointments</h3>
                        </div>
                    </div>

                    <div className="max-w-[220px] px-3 py-2 flex items-center gap-3 rounded-md bg-white shadow-sm">
                        <div className="w-[66px]"><img src={assets.patients_icon} alt="doctor logo" className="w-full" /></div>
                        <div className="flex flex-col grow gap-1">
                            <p className="font-medium">{doctorPatientData.totalPatients}</p>
                            <h3 className="text-black/50">Patients</h3>
                        </div>
                    </div>
                </section>

                {/* Opened Appointment Slotes */}
                <section className='max-w-[750px] bg-white shadow-sm rounded py-2 relative'>
                    <div className='flex justify-between items-center border-b px-3 pb-1'>
                        <p>Current Openings</p>
                        <button onClick={onAddMoreClick} className='px-2 py-1 text-sm border rounded-full bg-primary text-white'>ADD SLOTES</button>
                    </div>
                    <div className='px-3 py-2 border-b'>
                        <div className='flex flex-wrap gap-2'>
                            {
                                isLoading ? <Loader loadingText="Fetching data..." /> :
                                    slotes?.length > 0 ? slotes.map((el, index) => {
                                        return (
                                            <p className={(selectedDate === el.date) ? 'w-fit px-3 py-2 text-sm border rounded-full cursor-pointer bg-primary text-amber-50' : 'w-fit px-3 py-2 text-sm border rounded-full cursor-pointer'} key={index} onClick={() => setSelectedDate(el.date)}>{new Date(el.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</p>
                                        )
                                    }) :
                                        <h2 className='w-full text-center'>No slotes alloted yet!</h2>
                            }
                        </div>
                    </div>
                    <div className='px-3 py-2'>
                        <div className='flex flex-wrap gap-2'>
                            {
                                isLoading && <Loader loadingText="Fetching data..." />
                            }
                            {
                                timeSlotesForCurrentDate && timeSlotesForCurrentDate.slotes.map((el, index) => {
                                    return (
                                        <p key={index} className={`w-fit px-3 py-2 text-sm border rounded-full ${el.isBooked && 'bg-primary/50 text-black/50'}`}>{el.time}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>

                {/* Appears only after clicking 'Add More' */}
                {
                    isCalenderOn && <div className='absolute top-20 left-0 px-2 mx-5 bg-black/90 text-white' onClick={(event) => event.stopPropagation()}><MyCalender flash={flash} setFlash={setFlash} setIsCalender={setIsCalender} /></div>
                }

                {/* All Bookings */}
                <section className="rounded pb-2 bg-white shadow-sm">
                    <div className="py-2 flex gap-2 items-center border-b border-gray-300">
                        {/* <div><img src="" alt="" /></div> */}
                        <h1 className="">&nbsp;&nbsp;&nbsp;Latest Bookings</h1>
                    </div>

                    <div>
                        {
                            doctorPatientData.totalPatients > 0 ? doctorPatientData.fiveAppointments.slice().reverse().map((el, index) => {
                                return (
                                    <div key={index} className="p-3 flex gap-2 justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className='size-[60px]'><img src={el.user.image.url} className="size-full rounded-full" alt="patient image" /></div>
                                            <div className="flex flex-col justify-center">
                                                <h2 className="font-semibold">{el.bookingFor}</h2>
                                                <p className="text-sm font-semibold text-black/50">Booking on {new Date(el.date).toLocaleString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</p>
                                                <p className='font-semibold text-sm text-black/50'>{el.time}</p>
                                            </div>
                                        </div>
                                        <div className={`flex justify-center items-center font-md
                                                ${el.status === "cancelled" ? "w-fit px-2 py-1 rounded-full  bg-red-300 text-red-600" : el.status === "completed" && "w-fit px-2 py-1 rounded-full bg-primary text-amber-50"}`}>
                                            {
                                                el.status === "booked" ?
                                                    <div className="flex flex-wrap gap-4">
                                                        <button onClick={() => onCancelBookingClick(el)} className="flex justify-center items-center size-3 p-3 bg-red-300 text-red-400 rounded-full"><i className="fa-solid fa-xmark text-xs "></i></button>
                                                        <button onClick={() => onCompleteClick(el)} className="flex justify-center items-center size-3 p-3 bg-green-700 text-green-400 rounded-full"><i className="fa-solid fa-check text-xs"></i></button>
                                                    </div> : el.status.toUpperCase()
                                            }
                                        </div>
                                    </div>
                                )
                            }) :
                                <div className='px-3 py-2 text-center'>No Patients yet!</div>
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}