import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"
import { useState } from "react";
import axios from "axios";
import FlashMsg from "../components/messages/FlashMsg";
import Loader from "../components/loader/loader";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import api from "../../api.js";

export default function UserProfile() {

    const location = useLocation();
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const { user: contextUser } = useAuth();
    const user = location?.state?.user || contextUser;

    if (!user) return <p>Login First!</p>

    const [isEditable, setIsEditable] = useState(false);
    const [data, setData] = useState(user);
    const [flash, setFlash] = useState({ status: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const onEditClick = () => {
        setFlash({ status: "", message: "" });
        setIsEditable(true);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setData(prev => ({ ...prev, [event.target.name]: URL.createObjectURL(file), image: file }));
        }
    }

    const onInputChange = (event) => {
        const { name, type, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
        validation(name, value, type);
    }

    const onCancelClick = () => {
        setData(user);
        setErrors({});
        setIsEditable(false);
    }

    const onSaveClick = async (e) => {
        e.preventDefault();
        const validationPassed = Object.keys(errors).length === 0 ? true : Object.values(errors).every(value => value === "");
        if (!validationPassed) return;

        setIsLoading(true);

        try {
            const parsedData = new FormData();
            let requiredData = {};

            for (let key in data) {
                if (key === 'previewImage') {
                    continue;
                } else if (key === 'image') {
                    (data.previewImage) ? parsedData.append('image', data.image) : requiredData = { ...requiredData, [key]: data[key] }
                } else {
                    requiredData = { ...requiredData, [key]: data[key] }
                }
            }

            parsedData.append("data", JSON.stringify(requiredData));
            const res = await api.put("/patient/profileUpdate", parsedData, { withCredentials: true });
            setFlash({ status: "success", message: res.data.message });
        } catch (error) {
            setData(user);
            const errMsg = error.response?.data?.message || error.message
            setFlash({ status: "failed", message: errMsg });
            console.log(error);
        } finally {
            setErrors({});
            setIsEditable(false);
            setIsLoading(false);
        }
    }

    const onLogoutClick = async () => {
        try {
            await api.post("/logout", {}, { withCredentials: true });

            setUser(null);
            navigate('/signin');
        } catch (err) {
            console.log(err);
        }
    }

    const validation = (name, value, type) => {
        const err = {};

        if (type === "text") {
            if (name === 'address') err.address = value.trim().length < 10 ? `Too short` : ""
            else if (name === 'name') err.name = value.trim().length < 6 ? `Too short` : ""
        }
        if (name === 'email')
            {   err.email = !value.includes('@' && '.com') ? `Enter a valid email` : "" }
        if (type === 'number') {
            if (name === 'mobile') err.mobile = (value.toString().length != 10) ? "Enter a 10 digit mobile number." : ""
            else if (name === 'age') err.age = (121 > value && value > 0) ? "" : "Enter a valid age."
        }
        setErrors(prev => ({ ...prev, [name]: err[name] }));
    }


    return (
        <>
            {
                flash.message && <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} />
            }

            {

                // Non-updatable profile
                !isEditable ?
                    <div className="px-8 py-2 max-w-[500px] border rounded">

                        {/* User's name & image */}
                        <section className="py-3 px-2 flex flex-col gap-2">
                            <div className="w-fit h-fit shadow shadow-black"><img src={data.image.url} alt="profile pic" className="w-[100px] h-[100px]" /></div>
                            <h1 className="text-xl font-semibold">{data.name}</h1>
                        </section><hr />

                        <section className="py-3 px-2 flex flex-col gap-4">
                            {/* Contact Information */}
                            <div className="flex flex-col gap-3">
                                <div className="underline">Contact Information</div>
                                <div className="flex justify-between gap-3 items-center">
                                    <p className="w-1/2 text-sm font-semibold">Email id</p>
                                    <p className="450:min-w-1/2 text-xs 450:text-sm">{data.email}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="w-1/2 text-sm font-semibold">Phone</p>
                                    <p className="w-1/2 text-sm">{data.mobile}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="w-1/2 text-sm font-semibold">Address:</p>
                                    <p className="w-1/2 text-sm">{data.address}</p>
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div className="flex flex-col gap-3">
                                <div className="underline">Basic Information</div>
                                <div className="flex justify-between">
                                    <p className="w-1/2 text-sm font-semibold">Gender: </p>
                                    <p className="w-1/2 text-sm">{data.gender}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="w-1/2 text-sm font-semibold">Age: </p>
                                    <p className="w-1/2 text-sm">{data.age} years</p>
                                </div>
                            </div>

                        </section>

                        <section className="flex gap-2 flex-wrap">
                            <button onClick={onEditClick} className="px-8 py-2 text-sm flex justify-center items-center border rounded-full bg-primary text-white">Edit</button>
                            <button onClick={onLogoutClick} className="px-8 py-2 text-sm flex justify-center items-center border rounded-full bg-red-950 text-white">Logout</button>
                        </section>
                    </div>
                    :
                    // Updatable profile
                    <form onSubmit={onSaveClick} className="relative border px-8 py-2 max-w-[500px]" noValidate>
                        <section className="py-3 px-2 flex flex-col gap-2">
                            <label htmlFor="upload_image" className="w-[100px] h-[100px] block shadow-md rounded mx-auto 410:mx-0"><img src={data.previewImage || data.image.url} className="w-full h-full opacity-50" alt="Upload Area" /></label>
                            <input type="file" disabled={isLoading} name="previewImage" id="upload_image" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
                            <TextField error={errors.name} helperText={errors.name} type="text" disabled={isLoading} onChange={onInputChange} value={data.name} name="name" className="text-xl font-semibold rounded border px-2 py-1" />
                        </section>

                        <section className="py-3 px-2 flex flex-col gap-4">
                            {/* Contact Information */}
                            <div className="flex flex-col gap-3">
                                <div className="underline">Contact Information</div>
                                <div className="flex justify-between items-center flex-wrap">
                                    <p className="w-1/2 text-sm font-semibold">Email id</p>
                                    <TextField error={errors.email} helperText={errors.email} type="email" disabled={isLoading} value={data.email} name="email" onChange={onInputChange} className="w-1/2 min-w-[135px] text-sm rounded border px-2 py-1" />
                                </div>
                                <div className="flex justify-between items-center flex-wrap">
                                    <p className="w-1/2 text-sm font-semibold">Phone</p>
                                    <TextField error={errors.mobile} helperText={errors.mobile} type="number" disabled={isLoading} value={data.mobile} name="mobile" onChange={onInputChange} minLength={10} maxLength={10} className="w-1/2 min-w-[135px] text-sm rounded border px-2 py-1" />
                                </div>
                                <div className="flex justify-between items-center flex-wrap">
                                    <p className="w-1/2 text-sm font-semibold">Address:</p>
                                    <TextField error={errors.address} helperText={errors.address} type="text" disabled={isLoading} value={data.address} name="address" onChange={onInputChange} className="w-1/2 min-w-[135px] text-sm rounded border px-2 py-1" />
                                </div>
                            </div>

                            {/* Basic Information */}
                            <div className="flex flex-col gap-3">
                                <div className="underline">Basic Information</div>
                                <div className="flex justify-between items-center">
                                    <p className="w-1/2 text-sm font-semibold">Gender: </p>
                                    <Select disabled={isLoading} value={data.gender} name="gender" onChange={onInputChange} className="grow-1 text-sm rounded border px-2 py-1">
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </div>
                                <div className="flex items-center">
                                    <p className="w-1/2 text-sm font-semibold">Age: </p>
                                    <div className="whitespace-nowrap">
                                        <TextField error={errors.age} helperText={errors.age} type="number" disabled={isLoading} value={data.age} onChange={onInputChange} name="age" className="w-[100px] text-sm rounded border px-2 py-1" /><span> years</span>
                                    </div>
                                </div>
                            </div>

                        </section>

                        <section className="flex gap-2 flex-wrap">
                            <button type="submit" disabled={isLoading} className={`px-8 py-2 text-sm flex justify-center items-center border rounded-full ${isLoading ? 'text-white bg-primary/50' : 'hover:bg-primary hover:text-white'}`}>Save</button>
                            <button onClick={onCancelClick} disabled={isLoading} className={`px-8 py-2 text-sm flex justify-center items-center border rounded-full ${isLoading ? 'text-black/50 bg-white/50' : 'hover:bg-red-950 hover:text-white'}`}>Cancel</button>
                        </section>
                    </form>
            }

            {/* Loader while updating profile  */}
            {
                isLoading && isEditable && <div className="max-w-[500px] w-full top-50 flex justify-center absolute z-5">
                    <div className="grow-1 mx-8 max-w-[300px] h-[300px] flex justify-center items-center rounded bg-black/90 text-white">
                        <Loader loadingText="Updating" />
                    </div>
                </div>
            }
        </ >
    )
}
