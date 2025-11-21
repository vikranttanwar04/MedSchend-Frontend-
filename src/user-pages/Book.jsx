import { useState } from "react";
import { useAuth } from "../context/authContext"
import axios from "axios";
import api from "../api.js";


export default function Book({ setIsBookingWindowOpen, doctor, selectedDateAndTime, setFlash }) {

    const { user } = useAuth();

    const [bookingData, setBookingData] = useState({
        user: user._id,
        bookingFor: user.name,
        doctor: doctor._id,
        date: selectedDateAndTime.date,
        time: selectedDateAndTime.time,
        payment: "",
    })

    const onInputChange = (e) => {
        setBookingData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    // const loadScript = (src) => {
    //     return new Promise(resolve => {
    //         const script = document.createElement("script");
    //         script.src = src;
    //         script.onload = () => resolve(true);
    //         script.onerror = () => resolve(false);
    //         document.body.appendChild(script);
    //     })
    // }

    // const onFormSubmit = async(e) => {
    //     e.preventDefault();
        
    //     try {
    //         await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    //         const { data } = await axios.post('http://localhost:8080/payment/createOrder', { fee: doctor.fee, withCredentials: true })
    
    //         const options = {
    //             key: khkhhkhkh,     // Need to change with real razor-pay key
    //             amount: data.fee,
    //             currency: data.currency,
    //             name: doctor.name,
    //             description: "Appointment Booking",
    //             order_id: data.id,
    //             handler: async function (response) {
    //                 console.log("Payment Success: ", response);
    
    //                 await axios.post('http://localhost:8080/appointment/book', { bookingData }, { withCredentials: true })
    //                 alert(`Appointment booking is done from your side, just ${doctor.name} has to approve it!`);
    //             },
    //             prefill: {
    //                 name: user.name,
    //                 email: user.email,
    //                 contact: "9876543210",
    //             }
    //         }

    //         const razor = new window.Razorpay(options);
    //         razor.open();
    //     } catch (error) {
    //         const errMsg = error.response?.message || error.message
    //         console.log(error);
    //         alert(errMsg);
    //     }
    // }

    const onFormSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await api.post('/appointment/book', { bookingData }, { params: { id: selectedDateAndTime.bookingtimeSloteId }, withCredentials: true });
            res && setIsBookingWindowOpen(false);  // close booking window
            res && setFlash(prev => ({...prev, status: "success", message: "Appointment Booked Successfully."}));
        }catch(err){
            const errMsg = err.response?.data?.message || err.message
            setFlash(prev => ({...prev, status: "failed", message: errMsg }))
            console.log(err);
        }
    }

    return (
        <>
            <form onSubmit={onFormSubmit} method="post" className="w-full max-w-[400px] absolute left-0 top-140 910:left-[40%] 450:left-[8%] 450:top-100 500:left-[15%] 650:top-50 910:top-30 inline-flex flex-col gap-3 border rounded-md px-5 py-5 bg-black/90 text-white z-9">
                <div onClick={() => setIsBookingWindowOpen(false)} className="absolute right-2 top-1 cursor-default"><i className="fa-solid fa-xmark"></i></div>
                <h2 className="text-center font-semibold text-2xl">Appointment with {doctor.name}</h2>
                <div className="max-w-[300px] flex items-center gap-2">
                    <label htmlFor="patient" className="whitespace-nowrap">Patient <span className="text-xs">(Editable)</span>:</label>
                    <input onChange={onInputChange} className="w-full px-3 py-2 border-1 focus:outline-none rounded" type="text" id="patient" value={bookingData.bookingFor.trim()} name="bookingFor" required/>
                </div>
                <div className="max-w-[240px] flex items-center gap-2">
                    <label>Doctor: </label>
                    <input className="w-full px-3 py-2 rounded bg-gray-700/50 cursor-not-allowed" disabled={true} type="text" value={doctor.name} name="doctor" required/>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Date & Time</label>
                    <div className="flex items-center gap-2">
                        <input className="max-w-[110px] p-1 rounded bg-gray-700/50 cursor-not-allowed" disabled={true} type="text" value={selectedDateAndTime.date} name="date" required/>
                        <input className="max-w-[110px] p-1 rounded bg-gray-700/50 cursor-not-allowed" disabled={true} type="text" value={selectedDateAndTime.time} name="time" required/>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label>Fee <span className="text-xs">(in $)</span>: </label>
                    <input className="max-w-[80px] p-1 rounded bg-gray-700/50 cursor-not-allowed" disabled={true} type="number" value={doctor.fee} name="fee" required/>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Payment: </p>
                    <div className="flex gap-2">
                        <input type="radio" onChange={onInputChange} id="online" value="online" name="payment" required />
                        <label htmlFor="online">Online</label>
                    </div>
                    <div className="flex gap-2">
                        <input type="radio" onChange={onInputChange} id="COM" value="COM" name="payment" required />
                        <label htmlFor="COM">Cash On Meeting</label>
                    </div>
                </div>
                <button className="w-full px-3 py-2 rounded text-white bg-primary">Book</button>
            </form>
        </>
    )
}
