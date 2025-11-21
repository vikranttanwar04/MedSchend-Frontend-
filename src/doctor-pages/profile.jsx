import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import FlashMsg from "../components/messages/FlashMsg";
import Loader from "../components/loader/loader";
import TextField from "@mui/material/TextField";
import api from "../api.js";


export default function DoctorProfile() {

    const location = useLocation();
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const { user: contextUser } = useAuth();
    const user = location?.state?.user || contextUser;

    if (!user) return <h1>Log in first!</h1>

    const [isEditable, setIsEditable] = useState(false);
    const [data, setData] = useState(user);
    const [checked, setChecked] = useState(data?.isAvailable);
    const [flash, setFlash] = useState({ status: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formHandle = (event) => {
        const { name, value, type } = event.target;
        if (type === 'checkbox') {
            setChecked(!checked)
            setData((prev) => ({ ...prev, [name]: !checked }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
        validation(name, value, type);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setData(prev => ({ ...prev, [event.target.name]: URL.createObjectURL(file), image: file }));
        }
    }

    const onEditClick = () => {
        setFlash({ status: "", message: "" });
        setIsEditable(true);
    }

    const onLogoutClick = async () => {
        try {
            await api.post("logout", {}, { withCredentials: true });

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
            else if (name === 'degree') err.degree = value.trim().length < 2 ? `Enter a valid degree` : ""
            setErrors(prev => ({ ...prev, [name]: err[name] }));
        }
        if (name === 'about') {
            err.about = value.trim().length < 50 ? `Minimum 50 words` : ""
            setErrors(prev => ({...prev, 'about': err.about}))
        }
        if (name === 'speciality') {
            err.speciality = value.trim().length < 5 ? `Enter a valid speciality.` : ""
            setErrors(prev => ({ ...prev, 'speciality': err.speciality }))
        }
        if (name === 'fee') {
            err.fee = value < 0 ? `Enter a valid fee.` : ""
            setErrors(prev => ({ ...prev, 'fee': err.fee }))
        }
        if (name === 'experience') {
            err.experience = (value >= 0 && value <= 60) ? "" : `Enter valid experience.`
            setErrors(prev => ({ ...prev, 'experience': err.experience }))
        }
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
            const res = await api.put("/doctor/profileUpdate/", parsedData, { withCredentials: true });
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

    const onCancelClick = () => {
        setData(user);
        setErrors({});
        setIsEditable(false);
    }

    return (
        <>
            {
                flash.message && <FlashMsg status={flash.status} msg={flash.message} setFlash={setFlash} />
            }
            {
                (!isEditable) ?
                    // Static Profile
                    <>
                        <section className="mb-3">
                            <div className="w-[250px] h-[300px] shadow-md rounded mx-auto 410:mx-0"><img src={data.image.url} className="w-full h-full rounded" alt="Profile Picture" /></div>
                        </section>
                        <section className="max-w-[600px] flex flex-col gap-2 p-8 bg-white rounded shadow-md">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-semibold">{data.name}</h1>
                                <h2 className="text-md">{data.degree || "degree"} - {data.speciality} - <span className="text-sm">{data.experience} years</span></h2>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-semibold">About</h4>
                                <p className="text-sm">{data.about || "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel in adipisci optio minima debitis, assumenda ipsum, quam magni nisi, ea libero laborum. Libero, excepturi iure nostrum quas asperiores maxime aspernatur!"}</p>
                            </div>
                            <div className="text-sm"><span className="text-sm font-semibold">Appointment fee</span> : $ {data.fee}</div>
                            <div className="text-sm"><span className="text-sm font-semibold">Address</span> : {data.address}</div>
                            <div className="text-sm"><span className="text-sm font-semibold">Status: </span>{data.isAvailable ? "Available" : "Not Available"}</div>
                            <div className="flex gap-2">
                                <button onClick={onEditClick} className="w-fit px-8 py-2 text-sm flex justify-center items-center border rounded-full text-white bg-primary cursor-pointer">Edit</button>
                                <button onClick={onLogoutClick} className="w-fit px-8 py-2 text-sm flex justify-center items-center border rounded-full text-white bg-red-950 cursor-pointer">Log out</button>
                            </div>
                        </section>
                    </>
                    :
                    // Editable Profile
                    <form onSubmit={onSaveClick} noValidate>
                        <section className="mb-3">
                            <label htmlFor="upload_image" className="w-[250px] h-[300px] block shadow-md rounded mx-auto 410:mx-0"><img src={data.previewImage || data.image.url} className="w-full h-full opacity-50" alt="Upload Area" /></label>
                            <input disabled={isLoading} type="file" name="previewImage" id="upload_image" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
                        </section>

                        <div className="max-w-[600px] flex flex-col gap-2 p-8 bg-white rounded shadow-md">
                            <div className="flex flex-col gap-2">
                                <TextField error={errors.name} helperText={errors.name} disabled={isLoading} className="max-w-[250px] text-2xl font-semibold rounded border px-2 py-1" type="text" value={data.name} onChange={formHandle} name="name" />
                                <h2 className="flex gap-2 flex-wrap items-center text-md">
                                    <TextField error={errors.degree} helperText={errors.degree} disabled={isLoading} className="max-w-[80px] text-md rounded border px-2 py-1" type="text" value={data.degree} name="degree" onChange={formHandle} /> -&nbsp;
                                    <TextField error={errors.speciality} helperText={errors.speciality} disabled={isLoading} className="max-w-[150px] text-sm rounded border px-2 py-1" type="text" value={data.speciality} name="speciality" onChange={formHandle} /> -&nbsp;
                                    <span className="text-sm flex gap-2 items-center">
                                        <TextField error={errors.experience} helperText={errors.experience} disabled={isLoading} className="max-w-[60px] text-sm rounded border px-2 py-1" type="number" min={0} max={60} value={data.experience} name="experience" onChange={formHandle} /> years
                                    </span>
                                </h2>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-sm font-semibold">About <span className="text-xs">(minimum 50 words)</span></h4>
                                <TextField error={errors.about} helperText={errors.about} type="text" multiline disabled={isLoading} className="text-sm h-[100px] rounded border px-2 py-1" value={data.about} name="about" rows={3} onChange={formHandle} />
                            </div>
                            <div className="text-sm flex gap-2 items-center">
                                <span className="text-sm font-semibold">Appointment fee</span> :
                                $ <TextField error={errors.fee} helperText={errors.fee} disabled={isLoading} className="max-w-[70px] text-sm rounded border px-2 py-1" type="number" value={data.fee} name="fee" onChange={formHandle} />
                            </div>
                            <div className="text-sm flex items-center gap-2">
                                <span className="text-sm font-semibold">Address</span> :
                                <TextField error={errors.address} helperText={errors.address} disabled={isLoading} className="text-sm rounded border px-2 py-1" type="text" value={data.address} name="address" onChange={formHandle} />
                            </div>
                            <div className="flex gap-2 text-sm"><span className="font-semibold">Status:</span>
                                <div className="flex items-center gap-1">
                                    <input type="checkbox" disabled={isLoading} checked={checked} value={data.isAvailable} id="status" name="isAvailable" onChange={formHandle} />
                                    <label htmlFor="status" disabled={isLoading} className="text-sm"> {data.isAvailable ? "Available" : "Not Available"}</label>
                                </div>
                            </div>
                            <section className="flex gap-2 flex-wrap">
                                <button disabled={isLoading} className={`px-8 py-2 text-sm flex justify-center items-center border rounded-full ${isLoading ? 'text-white bg-primary/50' : 'hover:bg-primary hover:text-white'}`}>Save</button>
                                <button onClick={onCancelClick} disabled={isLoading} className={`px-8 py-2 text-sm flex justify-center items-center border rounded-full ${isLoading ? 'text-black/50 bg-white/50' : 'hover:bg-primary hover:text-white'}`}>Cancel</button>
                            </section>
                        </div>
                    </form>
            }

            {/* Loader while Updating profile */}
            {
                isLoading && isEditable && <div className="max-w-[500px] w-full top-100 flex justify-center absolute z-5">
                    <div className="grow-1 mx-8 max-w-[300px] h-[300px] flex justify-center items-center rounded bg-black/90 text-white">
                        <Loader loadingText="Updating" />
                    </div>
                </div>
            }

        </>
    )
}
