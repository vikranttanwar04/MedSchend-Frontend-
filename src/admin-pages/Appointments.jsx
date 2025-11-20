import assets from "../assets";


export default function Appointments() {

    return (
        <div>
            <div className="w-full 1000:w-[90%]">
                <h1 className="text-xl mb-2">All Appointments</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-[660px] md:w-full bg-white rounded">
                        <thead className="border-b border-gray-400">
                            <tr className="w-full">
                                <th className="p-2 text-start font-medium text-sm">#</th>
                                <th className="p-2 text-start font-medium text-sm">Patient</th>
                                <th className="p-2 text-start font-medium text-sm">Age</th>
                                <th className="p-2 text-start font-medium text-sm">Date & Time</th>
                                <th className="p-2 text-start font-medium text-sm">Doctor</th>
                                <th className="p-2 text-start font-medium text-sm">Fees</th>
                                <th className="p-2 text-center font-medium text-sm">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="w-full border-t border-gray-400">
                                <td className="p-2 text-start text-sm">1</td>
                                <td className="flex items-center gap-1 p-2 text-start text-sm">
                                    <div className="w-[30px]"><img src={assets.patients_icon} alt="" /></div>
                                    <p>Avinash Kr</p>
                                </td>
                                <td className="p-2 text-start text-sm">31</td>
                                <td className="p-2 text-start text-sm">5 Oct 2024, 12:00 PM</td>
                                <td className="flex gap-1 items-center p-2 text-start text-sm">
                                    <div className="w-[30px]"><img src={assets.doctor_icon} className="w-full" alt="" /></div>
                                    <p>Dr. Richard James</p>
                                </td>
                                <td className="p-2 text-start text-sm">$50</td>
                                <td className="p-2 text-center text-xs"><button className="w-3 h-3 p-3 mx-auto flex justify-center items-center rounded-full bg-red-300 text-red-600">x</button></td>
                            </tr>

                            <tr className="w-full border-t border-gray-400">
                                <td className="p-2 text-start text-sm">2</td>
                                <td className="flex items-center gap-1 p-2 text-start text-sm">
                                    <div className="w-[30px]"><img src={assets.patients_icon} alt="" /></div>
                                    <p>Avinash Kr</p>
                                </td>
                                <td className="p-2 text-start text-sm">31</td>
                                <td className="p-2 text-start text-sm">5 Oct 2024, 12:00 PM</td>
                                <td className="flex gap-1 items-center p-2 text-start text-sm">
                                    <div className="w-[30px]"><img src={assets.doctor_icon} className="w-full" alt="" /></div>
                                    <p>Dr. Richard James</p>
                                </td>
                                <td className="p-2 text-start text-sm">$50</td>
                                <td className="p-2 text-center text-xs text-red-600 font-medium">Cancelled</td>
                            </tr>

                            <tr className="w-full border-t border-gray-400">
                                <td className="p-2 text-start text-sm">3</td>
                                <td className="flex items-center gap-1 p-2 text-start text-sm">
                                    <div className="w-[30px]"><img src={assets.patients_icon} alt="" /></div>
                                    <p>Avinash Kr</p>
                                </td>
                                <td className="p-2 text-start text-sm">31</td>
                                <td className="p-2 text-start text-sm">5 Oct 2024, 12:00 PM</td>
                                <td className="flex gap-1 items-center p-2 text-start text-sm">
                                    <div className="w-[30px]"><img src={assets.doctor_icon} className="w-full" alt="" /></div>
                                    <p>Dr. Richard James</p>
                                </td>
                                <td className="p-2 text-start text-sm">$50</td>
                                <td className="p-2 text-center text-xs text-green-600 font-medium">Completed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}