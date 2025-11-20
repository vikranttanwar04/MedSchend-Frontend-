import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';

export default function DocDetails({ doctor, selectedDateAndTime, setSelectedDateAndTime, setIsBookingWindowOpen }) {   
    const { user } = useAuth();
    // All the dates greater than or equal to today (Future slotes only)
    const allFutureDatesOnly = doctor?.slotes?.filter((el) => new Date(el.date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0));
    // When page loads or reloads which date will be selected automatically
    const defaultSelectedDate = allFutureDatesOnly[0]?.date;
    const timeSlotesForDefaultSelectedDate = allFutureDatesOnly?.find((el) => el.date === defaultSelectedDate);
    const [timeSlotesForSelectedDate, setTimeSlotesForSelectedDate] = useState(timeSlotesForDefaultSelectedDate);
    const defaultSelectedTime = timeSlotesForSelectedDate?.slotes.find(el => !el.isBooked );
    
    useEffect(() => {
        setSelectedDateAndTime(prev => ({ ...prev, date: allFutureDatesOnly[0]?.date, time: defaultSelectedTime?.time, bookingtimeSloteId: timeSlotesForSelectedDate?.slotes[0]?._id}));
    }, []);

    const dateAndTime = (res) => {
        setSelectedDateAndTime(prev => ({ ...prev, date: res.date, time: res.slotes.find(el => !el.isBooked ).time, bookingtimeSloteId: res.slotes[0]._id }));
        const updatedSlotes = allFutureDatesOnly?.find((el) => el.date === res.date);
        setTimeSlotesForSelectedDate(updatedSlotes);
    }

    const onTimeChange = (el) => {
        setSelectedDateAndTime(prev => ({ ...prev, time: el.time, bookingtimeSloteId: el._id }));
    }

    return (
        <div>
            <section className='w-[90%] relative px-3 py-10 mx-auto grid grid-cols-1 650:grid-cols-[auto_1fr] gap-4'>
                {/* Doctor's image */}
                <div className='w-full place-items-center h-[243.27px] row-span-2 rounded-xl'><img className="w-[243.27px] h-full rounded-xl" src={doctor?.info?.image?.url} alt="Doctor image" /></div>

                {/* Doctor's information */}
                <div className='max-w-[670px] min-h-[240px] px-3 py-2 flex flex-col gap-2 rounded-xl border'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl'>{doctor.info?.name}</h1>
                        <h2>{doctor.info?.degree || "No Degree"} - {doctor.info?.speciality} - {doctor.info?.experience} years</h2>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-semibold'>About</p>
                        <p>{doctor.info?.about || "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam debitis, veritatis autem tenetur doloremque pariatur at nihil repudiandae maiores quae et iste sint dignissimos voluptatum velit ut nostrum quod sunt!ctetur adipisicing elit."}</p>
                    </div>
                    <div>
                        <p className='font-semibold'>Appointment Fee: ${doctor.info?.fee}</p>
                    </div>
                </div>
                
                {/* Opening slotes */}
                <div className='max-w-[670px] flex flex-col gap-3'>
                    <h3>Booking slots</h3>
                    <div className='flex flex-col gap-2 border rounded'>
                        {/* Date Slotes */}
                        <div className='flex gap-2 px-3 py-2 flex-wrap'>
                            {
                                allFutureDatesOnly.length > 0 ? allFutureDatesOnly.map((el, index) => {
                                    return (
                                        <p key={index} onClick={() => dateAndTime(el)} className={`${selectedDateAndTime.date === el.date && `bg-primary text-white`} px-3 py-2 whitespace-nowrap border cursor-pointer rounded-full hover:bg-primary hover:text-white`}>
                                            {new Date(el.date).toLocaleString("en-IN", { month: "short", day: "numeric" })}
                                        </p>
                                    )
                                }) : <div>No slotes opened yet! Try again after sometime when doctor opens some slotes.</div>
                            }
                        </div>
                        {/* Time Slotes */}
                        {
                            allFutureDatesOnly?.length > 0 && <>
                                <hr />
                                <div className='px-3 py-2'>
                                    <div className='flex flex-wrap gap-2'>
                                        {
                                            timeSlotesForSelectedDate?.slotes?.map((el, index) => {
                                                return (
                                                    <button onClick={() => onTimeChange(el)} disabled={el.isBooked} className={`w-fit px-3 py-2 text-sm border rounded-full ${!el.isBooked && 'cursor-pointer hover:bg-primary hover:text-white'} ${selectedDateAndTime.time === el.time && `bg-primary text-white border-black`} ${el.isBooked && 'bg-primary/10 text-black/50 cursor-not-allowed'}`} key={index}>
                                                        {el.time}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    {
                        user.role==='doctor' && allFutureDatesOnly?.length>0 && <div className='font-medium text-red-900'>
                            Note: you need to login as patient to book an appointment.
                        </div>
                    }
                    <button onClick={() => setIsBookingWindowOpen(true)} className={`w-fit px-8 py-2 rounded-full cursor-pointer text-white  ${allFutureDatesOnly?.length === 0 || user.role==="doctor" ? 'bg-primary/50' : 'bg-primary'}`} disabled={allFutureDatesOnly?.length === 0 || user.role === "doctor"}>Book an appointement</button>
                </div>

            </section>
        </div>
    )
}