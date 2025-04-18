export function ImageContainer()
{
    return <div className="grid lg:grid-cols-2 gap-[30px] h-fit ">
        <div className="left w-full h-[90%] my-auto object-cover">
            <img src="http://localhost:5173/images/g1.jpg" className="w-[100%] h-[100%]" alt="" />
        </div>
        <div className="gr-image right md:grid md:grid-cols-2 md:grid-rows-2 gap-[14px]">
            <div className="lg:w-[288px] lg:h-[191px]">
                <img src="http://localhost:5173/images/g2.jpg" className="w-[100%] h-[100%] rounded-2xl" alt="" />
            </div>

            <div className="lg:w-[288px] lg:h-[191px]">
                <img src="http://localhost:5173/images/g3.jpg" className="w-[100%] h-[100%] rounded-2xl" alt="" />
            </div>

            <div className="lg:w-[288px] lg:h-[191px]">
                <img src="http://localhost:5173/images/g4.jpg" className="w-[100%] h-[100%] rounded-2xl" alt="" />
            </div>

            <button id="black" className="lg:w-[288px] lg:h-[191px] relative cursor-pointer flex items-center justify-center">
                <img src="http://localhost:5173/images/g5.jpg" className="w-[100%] h-[100%] rounded-2xl" alt="" />
                <div className="absolute flex items-center justify-center w-full h-full rounded-2xl z-20" style={{backgroundColor: "rgba(0, 0, 0, .50)"}}>
                    <span className="text-3xl text-white">+ 4 autres photos</span>
                </div>
            </button>
        </div>
    </div>
}