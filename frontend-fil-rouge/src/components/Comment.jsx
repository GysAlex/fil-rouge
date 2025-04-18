import { LittleStrokeButton } from "./Button";

export function Comment()
{
    return <div className="lg:w-[390px] w-[90%] mx-auto py-4 lg:h-[298px] bg-white grid place-items-center m-2 " style={{boxShadow: "0px 1px 5px rgba(0, 0, 0, .25)"}}>
        <div className="w-[95%] mx-auto flex flex-col items-stretch justify-start gap-[17px]">
            <div className="info flex items-center justify-between">
                <div className="userInfo flex items-center justify-start gap-3">
                    <div className="imgcont">
                        <img src="http://localhost:5173/images/team2.jpg" className="rounded-full" width={80} height={80} alt="" />
                    </div>
                    <div className="i flex flex-col items-stretch justify-start">
                        <span className="text-medium text-(--text-color)">Abike Ojiema</span>
                        <span className="font-extralight">Travailleur(euse)</span>
                    </div>
                </div>
                <div className="dat font-medium text-(--text-color)">
                    3 week ago
                </div>
            </div>
            <div className="rate text-[14px] text-(--primary-green) flex items-center justify-start gap-[14px]">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </div>
            <div className="commentText text-(--text-color) text-[15px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia dolore minus sint expedita placeat dicta voluptatem, in facilis? Alias, amet? voluptatem, in facilis? Alias, amet? Mollitia dolore minus sint expedita
            </div>
            <LittleStrokeButton>
                <span> lire plus </span>
            </LittleStrokeButton>
        </div>
    </div>
}

