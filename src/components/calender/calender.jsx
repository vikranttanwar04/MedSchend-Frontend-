import { useState } from "react";
import Calendar from "react-calendar";
import './calender.css';
import axios from 'axios';
import { useAuth } from "../../context/authContext";
import Loader from "../loader/loader";
import api from "../api.js";


const allSlots = ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00'];

export default function MyCalender({ flash, setFlash, setIsCalender }) {

    const { user } = useAuth();

    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString("en-CA"));
    // Slotes(Date & Time) Provided by Doctor will be stored here
    const [providedSlotes, setProvidedSlotes] = useState({ date: currentDate, slotes: [] });
    const [showLoader, setShowLoader] = useState(false);

    // Date selected by Doctor
    const onDateChange = (date) => {
        setCurrentDate(date.toLocaleDateString("en-CA"));
        setProvidedSlotes((prev) => ({ ...prev, date: date.toLocaleDateString("en-CA") }));
    }

    // Time-Slote selected(checked & Unchecked) by Doctor
    const selectTime = (event) => {
        if (event.target.checked === true) {
            setProvidedSlotes(prev => ({ ...prev, date: currentDate, slotes: [...providedSlotes.slotes, event.target.value] }));
        } else if (event.target.checked === false) {
            const updatedTimeSlote = providedSlotes.slotes.filter((el) => el !== event.target.value);
            setProvidedSlotes(prev => ({ ...prev, slotes: [...updatedTimeSlote] }));
        }
    }

    // Sends the data & time-slotes to backend to store
    const onAdd = async () => {
        if (providedSlotes.date !== null && providedSlotes.slotes.length !== 0) {
            setShowLoader(true);
            try {
                await api.post("/doctor/provide_slotes", { doctor: user._id, ...providedSlotes }, { withCredentials: true });
                setIsCalender(false);
                setFlash(prev => ({ ...prev, status: "success", message: "Time Slote Added Successfully." }));
            } catch (error) {
                const errMsg = error.response?.data?.message || error.message
                console.log(error)
                setIsCalender(false);
                setFlash(prev => ({ ...prev, status: "failed", message: errMsg }));
            } finally {
                setShowLoader(false);
            }
        } else {
            setFlash(prev => ({ ...prev, status: "warn", message: "Choose atleast a time slote!" }));
        }
    }

    return (
        <div>
            <div className="custom-calendar flex flex-col 500:flex-row gap-5 px-3 py-2 relative">
                {/* Calender */}
                <div className="flex flex-col gap-2">
                    <Calendar onChange={onDateChange} value={currentDate.date} minDate={new Date()} tileClassName={({ date, view }) => date.toLocaleDateString("en-CA") === currentDate ? "highlight" : ""} />
                    <div className="border rounded px-3 bg-white text-black">{new Date(currentDate).toDateString()}</div>
                </div>

                {/* Time-Slotes */}
                <div className="max-w-[300px] flex flex-wrap 500:flex-col 500:justify-center gap-3 ">
                    {
                        allSlots.map((el, index) => {
                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <input type="checkbox" name="free-slotes" id={el} value={el} onChange={selectTime} className="accent-primary" />
                                    <label htmlFor={el}>{el}</label>
                                </div>)
                        })
                    }
                </div>
            </div>

            {/* Add Button */}
            <div className="px-3 py-2 flex gap-2">
                {
                    showLoader ? <button disabled={true} className="border rounded px-3 bg-white text-black"><Loader loadingText="Creating slotes" /></button> :
                    <>
                        <button onClick={onAdd} className="border rounded px-3 bg-white text-black">Add</button>
                        <button onClick={() => setIsCalender(false)} className="border rounded px-3 bg-white text-black">Cancel</button>
                    </>
                }
            </div>
        </div>
    )
}

