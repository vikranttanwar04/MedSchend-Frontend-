import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import assets from "../../assets";
import { useAuth } from "../../context/authContext";
import FlashMsg from "../messages/FlashMsg";
import Loader from "../loader/loader";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function DoctorSignup() {
    const navigate = useNavigate();

    const { setUser } = useAuth();
    const [data, setData] = useState({
        name: "",
        gender: "gender",
        age: "",
        degree: "",
        about: "",
        previewImage: null,
        image: null,
        speciality: "speciality",
        email: "",
        password: "",
        fee: "",
        address: "",
        experience: "",
        isAvailable: true,
        role: "doctor"
    })
    const [showLoader, setShowLoader] = useState(false);
    const [flash, setFlash] = useState({ status: "", message: "" });
    const [errors, setErrors] = useState({});

    const formHandle = (event) => {
        const { name, type, value } = event.target;
        setData((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }))
        validation1(name, value, type);
    }

    // For Input change
    const validation1 = (name, value, type) => {
        const err = {};

        if (name === "email") {
            err.email = !value.includes("@" && ".com") ? "Enter a valid email." : ""
            setErrors(prev => ({ ...prev, "email": err.email }));
            return;
        }
        if (name === "age") {
            err.age = (121 > value && value > 19) ? "" : "Age must be between 19 and 121."
            setErrors(prev => ({ ...prev, "age": err.age }));
            return
        }
        if (name === "password") {
            err.password = value.length < 8 ? "Password must be atleast of 8 characters." : ""
            setErrors(prev => ({ ...prev, "password": err.password }));
            return;
        }
        if (type === "text") {
            if(name === 'address') err.address = value.trim().length < 10 ? `Too short` : ""
            else if(name === 'about') err.about = value.trim().length < 50 ? `Minimum 50 words` : ""
            else if(name === 'name') err.name = value.trim().length < 6 ? `Too short` : ""
            else if(name === 'degree') err.degree = value.trim().length < 2 ? `Enter a valid degree` : ""
            setErrors(prev => ({ ...prev, [name]: err[name] }));
        }
        if (name === 'speciality') {
            err.speciality = value.trim().length < 5 ? `Select a speciality.` : ""
            setErrors(prev => ({...prev, 'speciality': err.speciality}))
        }
        if (name === 'gender') {
            err.gender = value === 'gender' ? `Select a gender.` : ""
            setErrors(prev => ({...prev, 'gender': err.gender}))
        }
        if (name === 'speciality') {
            err.speciality = value === 'speciality' ? `Select your speciality.` : ""
            setErrors(prev => ({...prev, 'speciality': err.speciality}))
        }
    }

    // For direct submit (empty form or any field)
    const validation2 = () => {
        const err = {};
        const { name, email, age, degree, password, address, about, speciality, gender } = data;

        if (email.trim().length < 0) err.email = "Email is required."
        if (!email.includes('@' && ".com")) err.email = "Enter a valid email."
        if (!(101 > age && age > 19)) err.age = "Enter a valid age."
        if (degree.trim().length < 2) err.degree = "Enter a valid degree."
        if (password.length < 8) err.password = "Password must be atleast of 8 characters."
        if (address.trim().length < 10) err.address = "Too short."
        if (name.trim().length < 3) err.name = "Too short."
        if (about.trim().length < 50) err.about = "Minimum 50 words."
        if (speciality === 'speciality') err.speciality = "Select your speciality."
        if (gender === 'gender') err.gender = "Select a gender."

        setErrors(prev => ({ ...prev, ...err }));
    }

    // Uploading image
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData(prev => ({ ...prev, previewImage: URL.createObjectURL(file), image: file }));
        }
    }

    // Submitting Form
    const onFormSubmit = async (event) => {
        event.preventDefault();
        validation2();
        const validationPassed = Object.keys(errors).length<9 ? false : Object.values(errors).every(value => value === "");
        if(!validationPassed) return;

        setShowLoader(true);
        const parsedData = new FormData();
        let requiredData = {};

        for (let key in data) {
            if (key !== 'image' && key !== 'previewImage') {
                requiredData = { ...requiredData, [key]: data[key] }
            }
        }

        parsedData.append('image', data.image);
        parsedData.append("data", JSON.stringify(requiredData));

        try {
            await axios.post('http://localhost:8080/doctor/auth/signup', parsedData, { withCredentials: true });

            const res = await axios.get('http://localhost:8080/getme', { withCredentials: true });
            setUser(res.data.user);
            setFlash(prev => ({ ...prev, status: "success", message: "You're successfully signed up!" }));

            navigate('/doctor/profile', { state: { user: res.data.user } });

        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            setFlash(prev => ({ ...prev, status: "failed", message: errMsg }));
            console.log(err);
            setData((prev) => ({
                ...prev,
                name: "",
                gender: "",
                age: "",
                about: "",
                degree: "",
                speciality: "",
                address: "",
                email: "",
                password: "",
                fee: "",
                experience: "",
                image: null,
                previewImage: null,
            }))
        } finally {
            setShowLoader(false);
        }
    }

    return (
        <>
            {
                flash.message && <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} />
            }
            <form className="p-3" onSubmit={onFormSubmit} noValidate>
                <div className="w-[80%] flex flex-col gap-2 mx-auto">

                    {/* Doctor image */}
                    <label htmlFor="upload_doctor_image" className="block w-[98px] h-[100px] border shadow-2xl rounded-full">
                        <div className="w-full h-full"><img src={data.previewImage ? data.previewImage : assets.upload_area} className="w-full h-full rounded-full" alt="Upload Area" /></div>
                    </label>
                    <input type="file" accept="image/*" name="image" id="upload_doctor_image" style={{ display: "none" }} onChange={handleImageChange} />

                    {/* Doctor Name  */}
                    <TextField error={errors.name} helperText={errors.name} className="border focus:outline-none px-3 py-2 rounded" type="text" name="name" placeholder="name (e.g, Dr. Peter)" value={data.name} required onChange={formHandle} />

                    <div className="flex flex-col 500:flex-row gap-2">
                        {/* Speciality */}
                        <Select error={errors.speciality} value={data.speciality} onChange={formHandle} name="speciality" className="500:w-1/2 h-[56px] focus:outline-none px-3 py-2 rounded" required>
                            <MenuItem value="speciality" className="focus:outline-none">Speciality</MenuItem>
                            <MenuItem value='General Physician' className="focus:outline-none">General Physician</MenuItem>
                            <MenuItem value='Gynocologist' className="focus:outline-none">Gynocologist</MenuItem>
                            <MenuItem value='Darmatologist' className="focus:outline-none">Darmatologist</MenuItem>
                            <MenuItem value='Cardiologist' className="focus:outline-none">Cardiologist</MenuItem>
                            <MenuItem value='Pediatric' className="focus:outline-none">Pediatric</MenuItem>
                            <MenuItem value='Neurologist' className="focus:outline-none">Neurologist</MenuItem>
                            <MenuItem value='Gastroenterologist' className="focus:outline-none">Gastroenterologist</MenuItem>
                            <MenuItem value='other' className="focus:outline-none">Other</MenuItem>
                        </Select>

                        {/* Degree */}
                        <TextField error={errors.degree} helperText={errors.degree} type="text" onChange={formHandle} value={data.degree} placeholder="degree" name="degree" className="500:w-1/2 border focus:outline-none px-3 py-2 rounded" required />
                    </div>

                    {/* Gender - age */}
                    <div className="flex gap-2">
                        {/* Gender */}
                        <Select error={errors.gender} value={data.gender} onChange={formHandle} name="gender" className="w-[50%] h-[56px] focus:outline-none px-3 py-2 rounded" required>
                            <MenuItem value="gender" className="focus:outline-none">Gender</MenuItem>
                            <MenuItem value='male' className="focus:outline-none">Male</MenuItem>
                            <MenuItem value='female' className="focus:outline-none">Female</MenuItem>
                            <MenuItem value='other' className="focus:outline-none">Other</MenuItem>
                        </Select>

                        {/* Age */}
                        <TextField error={errors.age} helperText={errors.age} className="w-[50%] border focus:outline-none px-3 py-2 rounded" type="number" min={20} max={100} name="age" placeholder="age" value={data.age} onChange={formHandle} required />
                    </div>

                    <div className="flex gap-2">
                        {/* Experience */}
                        <input type="number" onChange={formHandle} value={data.experience} placeholder="experience (in years)" min={0} max={60} name="experience" className="w-1/2 border border-black/30 hover:border-black focus:outline-none px-3 py-2 rounded" required />

                        {/* Fee */}
                        <input className="w-1/2 border border-black/30 hover:border-black focus:outline-none px-3 py-2 rounded" type="number" min={0} name="fee" placeholder="fee ($ per appointment)" value={data.fee} onChange={formHandle} required />
                    </div>


                    {/* About  */}
                    <TextField error={errors.about} helperText={errors.about} className="border focus:outline-none px-3 py-2 rounded" name="about" placeholder="about you (minimum 50 words)" value={data.about} onChange={formHandle} required />

                    {/* Address */}
                    <TextField error={errors.address} helperText={errors.address} className="border focus:outline-none px-3 py-2 rounded" type="address" value={data.address} name="address" placeholder="address" onChange={formHandle} required />

                    {/* Email */}
                    <TextField error={errors.email} helperText={errors.email} className="border focus:outline-none px-3 py-2 rounded" type="email" value={data.email} name="email" placeholder="email" onChange={formHandle} required />

                    {/* Password */}
                    <TextField error={errors.password} helperText={errors.password} className="border focus:outline-none px-3 py-2 rounded" type="password" value={data.password} name="password" placeholder="password" onChange={formHandle} required />

                    {
                        showLoader ? <button disabled={true} className="px-3 py-2 rounded border hover:bg-[#5B74F7] hover:text-amber-50"><Loader loadingText="Registering" /></button> :
                            <button className="px-3 py-2 rounded border hover:bg-[#5B74F7] hover:text-amber-50">Register as Doctor</button>
                    }
                </div>
            </form>
        </>
    )
}