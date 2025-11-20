import assets from '../assets';

export default function AdminDash() {

    return (
        <div className="">
            <div className="w-full 410:w-fit">
                <section className="grid grid-cols-[minmax(210px,220px)] 410:grid-cols-[1fr_1fr] 450:grid-cols-[repeat(2,minmax(210px,220px))] 680:grid-cols-[repeat(3,minmax(210px,220px))] gap-3">
                    <div className="px-3 py-2 flex items-center gap-3 rounded-md bg-white shadow-sm">
                        <div className="w-[66px]"><img src={assets.doctor_icon} alt="" className="w-full" /></div>
                        <div className="flex flex-col grow gap-1">
                            <p className="font-medium">15</p>
                            <h3 className="text-black/50">Doctors</h3>
                        </div>
                    </div>

                    <div className="px-3 py-2 flex items-center gap-3 rounded-md bg-white shadow-sm">
                        <div className="w-[66px]"><img src={assets.doctor_icon} alt="" className="w-full" /></div>
                        <div className="flex flex-col grow gap-1">
                            <p className="font-medium">6</p>
                            <h3 className="text-black/50">Appointments</h3>
                        </div>
                    </div>

                    <div className="max-w-[220px] px-3 py-2 flex items-center gap-3 rounded-md bg-white shadow-sm">
                        <div className="w-[66px]"><img src={assets.patients_icon} alt="" className="w-full" /></div>
                        <div className="flex flex-col grow gap-1">
                            <p className="font-medium">3</p>
                            <h3 className="text-black/50">Patients</h3>
                        </div>
                    </div>
                </section>

                <section className="mt-10 rounded pb-2 bg-white shadow-sm">
                    <div className="py-2 flex gap-2 items-center border-b border-gray-300">
                        <div><img src="" alt="" /></div>
                        <h1 className="">Latest Bookings</h1>
                    </div>

                    <div>
                        <div className="p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div><img src={assets.doctor_icon} className="w-full" alt="" /></div>
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-semibold">Dr. Richard James</h2>
                                    <p className="text-sm font-semibold text-black/50">Booking on 26 Sep 2024</p>
                                </div>
                            </div>
                            <div className="text-xs 410:text-sm">Cancelled</div>
                        </div>

                        <div className="p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div><img src={assets.doctor_icon} className="w-full" alt="" /></div>
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-semibold">Dr. Richard James</h2>
                                    <p className="text-sm font-semibold text-black/50">Booking on 26 Sep 2024</p>
                                </div>
                            </div>
                            <div className="text-xs 410:text-sm">Cancelled</div>
                        </div>

                        <div className="p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div><img src={assets.doctor_icon} className="w-full" alt="" /></div>
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-semibold">Dr. Richard James</h2>
                                    <p className="text-sm font-semibold text-black/50">Booking on 26 Sep 2024</p>
                                </div>
                            </div>
                            <div className="text-xs 410:text-sm">Cancelled</div>
                        </div>

                        <div className="p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div><img src={assets.doctor_icon} className="w-full" alt="" /></div>
                                <div className="flex flex-col justify-center">
                                    <h2 className="font-semibold">Dr. Richard James</h2>
                                    <p className="text-sm font-semibold text-black/50">Booking on 26 Sep 2024</p>
                                </div>
                            </div>
                            <div className="text-xs 410:text-sm">Cancelled</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}