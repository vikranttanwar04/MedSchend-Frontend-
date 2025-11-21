import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets";
import { useAuth } from "../../context/authContext";
import Loader from "../loader/loader";
import FlashMsg from "../messages/FlashMsg";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import api from "../api.js";


export default function UserSignup() {

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        gender: "gender",
        age: "",
        image: null,
        imagePreview: null,
        address: "",
        mobile: "",
        email: "",
        password: "",
        role: "patient"
    })
    const [showLoader, setShowLoader] = useState(false);
    const [flash, setFlash] = useState({ status: "", message: "" });
    const [errors, setErrors] = useState({});

    const validation1 = (name, value, type) => {
        const err = {};

        if (name === "email") {
            err.email = !value.includes("@" && ".com") ? "Enter a valid email." : ""
            setErrors(prev => ({ ...prev, "email": err.email }));
            return;
        }
        if (name === "age") {
            err.age = (121 > value && value > 0) ? "" : "Enter a valid age."
            setErrors(prev => ({ ...prev, "age": err.age }));
            return
        }
        if (name === "mobile") {
            err.mobile = value.length === 10 ? "" : "Enter a 10 digit mobile number."
            setErrors(prev => ({ ...prev, "mobile": err.mobile }));
            return;
        }
        if (name === "password") {
            err.password = value.length < 8 ? "Password must be atleast of 8 characters." : ""
            setErrors(prev => ({ ...prev, "password": err.password }));
            return;
        }
        if (type === "text") {
            err[name] = name === "address" ? (value.trim().length < 10 ? `Too short` : "") : value.trim().length < 3 ? `Too short` : ""
            setErrors(prev => ({ ...prev, [name]: err[name] }));
        }
        if (name === "gender"){
            err.gender = value === "gender" ? "Select the gender" : "";
            setErrors(prev => ({...prev, "gender": err.gender}))
        }
    }

    const validation2 = () => {
        const err = {};
        const { name, email, age, mobile, password, address, gender } = data;

        if (!email.includes('@' && ".com")) err.email = "Enter a valid email."
        if (!(121 > age && age > 0)) err.age = "Enter a valid age."
        if (mobile.toString().length != 10) err.mobile = "Enter a 10 digit mobile number."
        if (password.length < 8) err.password = "Password must be atleast of 8 characters."
        if (address.length < 10) err.address = "Too short."
        if (email.trim().length < 0) err.email = "Email is required."
        if (name.trim().length < 3) err.name = "Too short."
        if (gender === 'gender') err.gender = "Select a gender."

        setErrors(prev => ({ ...prev, ...err }));
    }

    const onInputChange = (event) => {
        const { name, value, type } = event.target;
        if(name==="mobile"){
            setData((prev) => ({ ...prev, [name]: value }));
        }else{
            setData((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
        }
        validation1(name, value, type);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData(prev => ({ ...prev, 'imagePreview': URL.createObjectURL(file), 'image': file }));
        }
    }

    const onFormSubmit = async (event) => {
        event.preventDefault();
        validation2();
        const validationPassed = Object.keys(errors).length<7 ? false : Object.values(errors).every(value => value === "");
        if(!validationPassed) return;
        setShowLoader(true);

        const parsedData = new FormData();
        let requiredData = {};

        for (let key in data) {
            if (key !== 'image' && key !== 'imagePreview') {
                requiredData = { ...requiredData, [key]: data[key] };
            }
        }

        parsedData.append('image', data.image);
        parsedData.append('data', JSON.stringify(requiredData));

        try {
            await api.post('/patient/auth/signup', parsedData, { withCredentials: true });

            const res = await api.get('/getme', { withCredentials: true });
            setUser(res.data.user);
            navigate('/userprofile', { state: { user: res.data.user } });
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message
            setFlash(prev => ({ ...prev, status: "failed", message: errMsg }))
            console.log(err);
            setData(prev => ({
                ...prev,
                name: "",
                gender: "",
                age: "",
                image: null,
                imagePreview: null,
                address: "",
                mobile: "",
                email: "",
                password: "",
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
                    {/* User's image */}
                    <label htmlFor="upload_user_image" className="block w-[98px] h-[100px] border shadow-2xl rounded-full">
                        <div className="w-full h-full"><img src={data.imagePreview ? data.imagePreview : assets.upload_area} className="w-full h-full rounded-full" alt="Upload Area" /></div>
                    </label>
                    <input type="file" accept="image/*" name="image" id="upload_user_image" style={{ display: "none" }} onChange={handleImageChange} />

                    {/* User's name */}
                    <TextField error={errors.name} helperText={errors.name} className="border focus:outline-none px-3 py-2 rounded" type="text" name="name" placeholder="name" value={(data.name)} onChange={onInputChange} required />

                    {/* Gender - age */}
                    <div className="flex gap-2">
                        {/* Gender */}
                        <Select error={errors.gender} value={data.gender} onChange={onInputChange} name="gender" className="w-[50%] h-[56px] focus:outline-none py-2 px-3 rounded" required>
                            <MenuItem value="gender" className="focus:outline-none">Gender</MenuItem>
                            <MenuItem value='male' className="focus:outline-none">Male</MenuItem>
                            <MenuItem value='female' className="focus:outline-none">Female</MenuItem>
                            <MenuItem value='other' className="focus:outline-none">Other</MenuItem>
                        </Select>

                        {/* Age */}
                        <TextField error={errors.age} helperText={errors.age} className="w-[50%] border focus:outline-none px-3 py-2 rounded" type="number" min={1} max={120} name="age" placeholder="age" value={data.age} onChange={onInputChange} required />
                    </div>

                    {/* Address */}
                    <TextField error={errors.address} helperText={errors.address} className="border focus:outline-none px-3 py-2 rounded" type="text" value={data.address} name="address" placeholder="Address" onChange={onInputChange} required />

                    {/* Mobile Number */}
                    <TextField error={errors.mobile} helperText={errors.mobile} className="border focus:outline-none px-3 py-2 rounded" type="number" name="mobile" placeholder="mobile no. (10 digits)" pattern="[0-9]{10}" minLength={10} maxLength={10} value={data.mobile} onChange={onInputChange} required />

                    {/* Email */}
                    <TextField error={errors.email} helperText={errors.email} className="border focus:outline-none px-3 py-2 rounded" type="email" name="email" placeholder="email" value={data.email} onChange={onInputChange} required />

                    {/* Password */}
                    <TextField error={errors.password} helperText={errors.password} className="border focus:outline-none px-3 py-2 rounded" type="password" name="password" placeholder="password" value={data.password} onChange={onInputChange} required />

                    {
                        showLoader ? <button disabled={true} className="px-3 py-2 rounded border hover:bg-[#5B74F7] hover:text-amber-50"><Loader loadingText="Registering" /></button> :
                            <button className="px-3 py-2 rounded border hover:bg-[#5B74F7] hover:text-amber-50">Register as Patient</button>
                    }
                </div>
            </form>
        </>
    )
}
