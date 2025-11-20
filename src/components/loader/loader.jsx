

export default function Loader({ loadingText }) {

    return (
        <div className="flex gap-3 items-center justify-center">
            <p className="font-mono">{loadingText}. . .</p>
            <div className="w-5 h-5 rounded-[50%] border-3 border-black border-t-white flex justify-center items-center animate-spin"></div>
        </div>
    )
}