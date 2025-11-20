import DocList from "../components/docList"
import data from "../utils/data"


export default function AllDoctors() {

    return (
        <div>
            <h1>All Doctors</h1>
            {
                data.length > 0 ? <DocList doctors={data} /> : <div className="grow flex justify-center items-center"><h1 className="text-center">No Doctor Registers!</h1></div>
            }
        </div>
    )
}