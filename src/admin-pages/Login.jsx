import { useState } from "react"



export default function AdminLogin() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const onInputChange = (event) => {
        setLoginData(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    return (
        <div className="max-w-[300px] p-3 flex flex-col gap-3 rounded shadow-2xl mx-auto">
            <h1 className="text-xl text-center"><span className="text-primary">Admin</span> Login</h1>
            <form action="" className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" placeholder="Email" value={loginData.email} onChange={onInputChange} className="px-3 py-2 rounded border border-gray-400 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Password" value={loginData.password} onChange={onInputChange} className="px-3 py-2 rounded border border-gray-400 focus:outline-none" />
                </div>
                <button className="block px-3 py-2 rounded bg-primary text-white cursor-pointer">Login</button>
            </form>
        </div>
    )
}