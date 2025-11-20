import AccountPanel from "../components/AccountPanel"
import Choose from "../components/Choose"
import Hero from "../components/Hero"
import TopDoctors from "../components/TopDoctors"


export default function Home(){

    return(
        <section className="pt-10">
            <Hero />
            <Choose />
            <div>
                <div className="flex flex-col items-center gap-2 px-3">
                    <h2 className="text-2xl">Top Doctors to Book</h2>
                    <p className="text-sm text-center">Simply browse through our extensive list of trusted doctors.</p>
                </div>
                <TopDoctors />
            </div>
            <AccountPanel />
        </section>
    )
}