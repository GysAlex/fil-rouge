import { Assets } from "./Assets";
import { HomeTags } from "./Tags";

export function Home()
{
    return <button className="lg:w-[382px] homecard w-[90%] mx-auto flex-grow lg:mx-0 h-fit p-1.5 cursor-pointer grid grid-rows-2 gap-[25px] rounded-[10px]" style={{boxShadow: "0 0 7px rgba(0, 0, 0, .25)"}}>
        <div className="img-cont relative">
            <img src="http://localhost:5173/images/g2.jpg" className="w-full h-full rounded-[10px]" alt="" />
            <span className="absolute cursor-pointer top-0 right-0 w-[60px] h-[40px] p-2 bg-(--light-green) flex items-center justify-center rounded-tr-[10px] rounded-bl-[10px]">
                <i className="fa-solid fa-heart text-xl text-white"></i>
            </span>
        </div>
        <div className="info flex flex-col items-stretch justify-start gap-[15px]">
            <div className="infoF flex items-center justify-between">
                <span className="text-[20px] text-(--text-color) font-medium">MCC Studio Ets</span>
                <div className="flex items-center justify-center gap-2">
                    <div><i className="fa-solid fa-star text-xl text-(--primary-green)"></i></div>
                    <div className="text-(--text-color)">3,3 (4 avis)</div>
                </div>
            </div>
            <div className=" flex items-center justify-start flex-wrap gap-2">
                <HomeTags>
                    studio
                </HomeTags>
                <HomeTags>
                    prix abordable
                </HomeTags>
                <HomeTags>
                    qualité standard
                </HomeTags>
            </div>
            <div className="flex flex-col items-stretch justify-start gap-3">
                <Assets>
                    <div><i className="fa-solid text-xl w-[40px]  fa-couch text-(--primary-green)"></i></div>
                    <span className="text-(--text-color)">1 Chambre, 02 Douches</span>
                </Assets>
                <Assets>
                    <div><i className="fa-solid text-xl w-[40px]  fa-location-dot text-(--primary-green)"></i></div>
                    <span className="text-(--text-color)">05 Minutes du campus</span>
                </Assets>
                <Assets>
                    <div><i className="fa-solid text-xl w-[40px] fa-house-user text-(--primary-green)"></i></div>
                    <span className="text-(--text-color)">2 Studios disponible</span>
                </Assets>
            </div>
            <div className="price">
              <span className="text-[18px] text-(--text-color)">A partir de : </span>  <span className="text-[20px] font-medium text-(--primary-green)">16000 FCFA/ans</span>
            </div>
        </div>
    </button>
}