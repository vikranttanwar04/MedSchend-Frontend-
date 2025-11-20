
export default function DocList({ doctors }) {

    return (
        <div className="grow h-fit grid grid-cols-1 place-items-center 575:place-items-stretch 410:grid-cols-2 575:grid-cols-3 750:grid-cols-4 768:grid-cols-3 910:grid-cols-4 1100:grid-cols-5 1300:grid-cols-6 gap-4 overflow-y-scroll pt-3 md:pt-11">
                {
                    doctors.map((doctor, index) => {
                        return (
                            <div key={index} onClick={() => window.open(`/doc/${doctor._id}`, "_blank")} className="max-w-[200px] min-w-[170px] border-1 rounded-md cursor-pointer hover:-translate-y-2 hover:transition-all">
                                <div className="w-full"><img src={doctor.image.url} className="w-full h-[157.15px] rounded-tl-md rounded-tr-md" alt="Doctor Image" /></div>
                                <div className="px-3 py-2">
                                    <p className={`w-fit text-sm font-semibold flex items-center gap-1 ${doctor.isAvailable && 'text-green-700'}`}><span className="text-4xl">&middot;</span>{doctor.isAvailable ? "Available" : "Not Available"}</p>
                                    <h2 className="text-lg">{doctor.name}</h2>
                                    <h3 className="text-sm">{doctor.speciality}</h3>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    )
}