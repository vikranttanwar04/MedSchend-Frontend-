

export default function FlashMsg({status, msg, setFlash}){

    let wrapperClass;
    if(status === "success"){
        wrapperClass = "550:w-[400px] mx-[20%] fixed top-10 z-10 flex rounded bg-green-200/70 font-medium"
    }else if(status === "failed"){
        wrapperClass = "550:w-[400px] mx-[20%%] fixed top-10 z-10 flex rounded bg-red-200/70 font-medium"
    }else if(status === "warn"){
        wrapperClass = "550:w-[400px] mx-[20%] fixed top-10 z-10 flex rounded bg-yellow-200/70 font-medium"
    }

    return(
        <div className={wrapperClass}>
            <section className="w-[90%] p-3 flex justify-center items-center">{msg}</section>
            <section className="p-3 flex justify-center items-center cursor-pointer" onClick={() => setFlash((prev) => ({...prev, status: "", message: ""}))}>&#10006;</section>
        </div>
    )
}