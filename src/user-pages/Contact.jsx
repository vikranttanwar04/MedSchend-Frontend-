import contact_img from './../assets/contact_image.png';

export default function Contact() {

    return (
        <>
            <h1 className="mt-10 text-center text-black/60">CONTACT <span className="text-black">US</span></h1>
            <div className="my-[70px] w-fit mx-auto flex flex-col 460:flex-row gap-4">
                <div className='550:h-[245.33px] h-[285.33px]'><img src={contact_img} className='h-full' alt="doctor patient image" /></div>
                <div className="flex flex-col gap-3">
                    <h2>OUR OFFICE</h2>
                    <div>
                        <p className="text-black/60 text-sm">Pataudi, Gurugram</p>
                        <p className="text-black/60 text-sm">Gurugram, Haryana, India</p>
                    </div>
                    <div>
                        <p className="text-black/60 text-sm">Mob: +91 9306476948</p>
                        <p className="text-black/60 text-sm">Email: vikranttanwar04@gmail.com</p>
                    </div>
                    <h2>CAREERS AT MEDSCHED</h2>
                    <p className="text-black/60 text-sm">Learn more about our teams and job openings.</p>
                    <button className="w-fit py-2 px-3 text-sm border hover:bg-primary hover:text-white">Explore Jobs</button>
                </div>
            </div>
        </>
    )
}