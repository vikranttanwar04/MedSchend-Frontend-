import { useState } from "react"
import assets from "../assets"
import { useNavigate } from "react-router-dom"



export default function AddDoctor() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        gender: "",
        age: "",
        speciality: "",
        email: "",
        password: "",
        fee: "",
        address: "",
        experience: "",
        status: "available",
        role: "doctor"
    })

    const formHandle = (event) => {
        setData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/docregister', data);
            navigate('/');
        } catch (err) {
            console.log(err);
            alert("Something went wrong! Try again later.")
            setData((prev) => ({
                ...prev,
                name: "",
                gender: "",
                age: "",
                speciality: "",
                address: "",
                email: "",
                password: "",
                fee: "",
                experience: "",
            }))
        }
    }

    return (
        <>
            <h1 className="mb-2">Add Doctor</h1>

            <form action="/docregister" method="post" className="max-w-[500px] flex flex-col gap-2 bg-white p-3 shadow-md" onSubmit={onFormSubmit}>
                <div>
                    <div className="w-[200px] flex items-center gap-3">
                        <div><img src={assets.doctor_icon}className="w-full rounded-full shadow-md" alt="" /></div>
                        <p>Upload doctor picture</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="docName">Doctor Name</label>
                        <input className="w-full px-3 py-2 rounded border border-gray-400" type="text" id="docName" placeholder="Name" value={data.name} onChange={formHandle} name="name" required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="docSpeciality">Speciality</label>
                        <select className="w-full px-3 py-2 rounded border border-gray-400" id="docSpeciality" value={data.speciality} onChange={formHandle} name="speciality" required>
                            <option value="" className="focus:outline-none">Speciality</option>
                            <option value='General Physician' className="focus:outline-none">General Physician</option>
                            <option value='Gynocologist' className="focus:outline-none">Gynocologist</option>
                            <option value='Darmatologist' className="focus:outline-none">Darmatologist</option>
                            <option value='Cardiologist' className="focus:outline-none">Cardiologist</option>
                            <option value='Pediatric' className="focus:outline-none">Pediatric</option>
                            <option value='Neurologist' className="focus:outline-none">Neurologist</option>
                            <option value='Gastroenterologist' className="focus:outline-none">Gastroenterologist</option>
                            <option value='other' className="focus:outline-none">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="docEmail">Doctor Email</label>
                        <input className="w-full px-3 py-2 rounded border border-gray-400 " type="text" id="docEmail" placeholder="Email" value={data.email} onChange={formHandle} name="email" required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="docGender">Gender</label>
                        <select value={data.gender} id="docGender" onChange={formHandle} name="gender" className="w-full px-3 py-2 rounded border border-gray-400" required>
                            <option value="" className="focus:outline-none">Gender</option>
                            <option value='male' className="focus:outline-none">Male</option>
                            <option value='female' className="focus:outline-none">Female</option>
                            <option value='other' className="focus:outline-none">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="docPassword">Set Password</label>
                        <input className="w-full px-3 py-2 rounded border border-gray-400 " type="password" id="docPassword" placeholder="Password" value={data.password} onChange={formHandle} name="password" required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="docAdress">Address</label>
                        <input className="w-full px-3 py-2 rounded border border-gray-400 " type="text" id="docAdress" placeholder="Address" value={data.address} onChange={formHandle} name="address" required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="docAge">Age</label>
                        <input className="w-full px-3 py-2 rounded border border-gray-400" type="number" min={20} max={100} id="docAge" placeholder="Age" value={data.age} onChange={formHandle} name="age" required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="docExperience">Experience</label>
                        <input className="w-full px-3 py-2 rounded border border-gray-400 " type="number" min={0} max={60} id="docExperience" placeholder="Experience" value={data.experience} onChange={formHandle} name="experience" required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="docFee">Fee</label>
                        <input className="w-full px-3 py-2 rounded border border-gray-400" type="number" min={0} id="docFee" placeholder="Fee" value={data.fee} onChange={formHandle} name="fee" required />
                    </div>
                </div>
                <div><button className="px-3 py-2 border rounded bg-primary text-white cursor-pointer">Submit</button></div>
            </form>
        </>
    )
}