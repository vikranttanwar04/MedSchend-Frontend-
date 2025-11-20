import { useNavigate } from "react-router-dom"
import assets from "../assets"
import doctors from './../utils/data'
import { useFetch } from "../context/fetchContext";


export default function TopDoctors() {

    const navigate = useNavigate();
    const { allDoctors } = useFetch();
    const topEigth = [];
    let count = 0;
    for(let doctor of allDoctors){
        if(count<8 && allDoctors.length>=count){
            topEigth.push(doctor);
            count++;
        }else{
            break;
        }
    }

    return (
        <div className="max-w-[800px] h-fit mx-auto my-4 grid gap-4 place-items-center 375:place-items-stretch 375:grid-cols-2 550:grid-cols-3 730:grid-cols-4">
                {
                    topEigth.length>0 && topEigth.map((doctor, index) => {
                        return (
                            <div key={index} onClick={() => navigate(`/doc/${doctor._id}`)} className="max-w-[200px] min-w-[170px] border rounded-md cursor-pointer hover:-translate-y-2 hover:transition-all">
                                <div className="w-full"><img src={doctor.image.url} className="w-full h-[157.15px] rounded-tl-md rounded-tr-md" alt="doctor image" /></div>
                                <div className="px-3 py-2">
                                    <p className={`w-fit text-sm font-semibold flex items-center gap-1 ${doctor.isAvailable && 'text-green-700'}`}><span className="text-4xl">&middot;</span>{doctor.isAvailable?"Available":"Not available"}</p>
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