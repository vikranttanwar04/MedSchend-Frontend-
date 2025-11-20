import assets from "../assets";



export default function About() {

    return (
        <div className="px-10 650:ps-20">
            <h1 className="text-2xl text-center mt-4">ABOUT US</h1>

            <section className="max-w-[1200px] flex flex-col items-center 850:flex-row gap-2 mb-8">
                <div className="min-w-[300px] max-w-[600px]"><img src={assets.doctor_icon} className="w-full" alt="" /></div>
                <div className="w-full text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex velit itaque facere inventore dignissimos obcaecati quia nam! Quae praesentium, sunt deserunt numquam, nihil ex vel sit saepe itaque perspiciatis rem. Ipsa obcaecati, atque quasi quas non dolorum temporibus beatae similique expedita accusamus error neque officia nobis ducimus repellat ad rerum illum facilis? Sint repellat distinctio veritatis consectetur dolore expedita eligendi?</div>
            </section>

            <section className="w-fit my-5">
                <h2 className="mb-2">WHY CHOOSE US</h2>
                <div className="flex flex-col gap-2 650:flex-row 650:gap-0">
                    <div className="max-w-[300px] p-5 flex flex-col gap-2 border 650:border-r-0 border-gray-600">
                        <h3 className="text-md">EFFICIENCY:</h3>
                        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="max-w-[300px] p-5 flex flex-col gap-2 border 650:border-r-0 border-gray-600">
                        <h3 className="text-md">CONVENIENCE:</h3>
                        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className="max-w-[300px] p-5 flex flex-col gap-2 border border-gray-600">
                        <h3 className="text-md">PERSONALIZATION:</h3>
                        <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}