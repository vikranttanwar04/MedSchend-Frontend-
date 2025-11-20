import { useNavigate } from "react-router-dom"


export default function Footer() {

    const navigate = useNavigate();

    return (
        <footer className="border-gray-400 border-t">
            <div className="w-[70%] mx-auto px-3 pt-10 pb-2 flex flex-col items-center gap-5">
                <div className="grid grid-cols-2 grid-rows-2 550:grid-rows-1 600:grid-cols-3 gap-5">
                    <div className="h-fit col-span-2 550:col-span-1 flex 600:justify-center gap-2">
                        <div>
                            <h2 className="text-xl mb-2.5">MedSched</h2>
                            <div className="text-xs leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit tempore, earum repellat culpa natus nesciunt autem aliquam distinctio, placeat.</div>
                        </div>
                    </div>
                    <div className="h-fit flex 600:justify-center gap-2">
                        <div>
                            <h2 className="text-md mb-2.5">COMPANY</h2>
                            <ul className="text-xs flex flex-col gap-1">
                                <li className="cursor-pointer" onClick={() => navigate('/')}>Home</li>
                                <li className="cursor-pointer" onClick={() => navigate('/about')}>About us</li>
                                <li className="cursor-pointer" onClick={() => navigate('/')}>Delivery</li>
                                <li className="cursor-pointer" onClick={() => navigate('/')}>Privacy policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="h-fit flex 600:justify-center gap-2">
                        <div>
                            <h2 className="text-md mb-2.5 whitespace-nowrap">GET IN TOUCH</h2>
                            <div><a href="tel:+919306376948" className="text-xs">+91 93 06 476 948</a></div>
                        </div>
                    </div>
                </div>
                <div className="text-xs 550:text-sm">Copyright 2025 @ MedSched.com - All Right Reserved.</div>
            </div>
        </footer>
    )
}