import { Link } from "react-router-dom";

export function NavBar()
{
    return <div className="w-full h-[89px] sticky top-0 bg-white z-50 flex items-center justify-center" style={{boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)"}}>
        <div className="w-full max-w-[1258px] px-4 md:px-2 lg:px-0 mx-auto flex items-center justify-between">
            <div className="brand mx-2 md:mx-0 flex items-center justify-start gap-[15px]">
                <div className="burger ">
                    <button className="burger flex items-center justify-center size-[46px] bg-(--primary-green) rounded-full">
                        <i className="fa-solid fa-bars text-2xl text-white"></i>
                    </button>
                </div>
                <div className="mother hidden md:flex ">
                    <span className="text-(--primary-green) font-extrabold text-[20px]">Metch</span>
                    <span className="font-extrabold text-(--text-color) text-[20px]">App</span>
                </div>
            </div>
            <div id="modalSearch" className="modalSearch flex rounded-4xl items-center bg-(--light-green) justify-start w-[454px] max-w-[454px] h-[53px]">
                <button className="w-full h-full px-8 lg:px-15 cursor-pointer flex items-center justify-around">
                    <div className="text-[18px]  ">Ouest</div>
                    <div className="w-[2px] bg-(--text-color) h-[65%] my-auto" ></div>
                    <div className="text-[18px]">Université...</div>
                </button>
            </div>
            <div className="nav hidden xl:flex items-center justify-center gap-8">
                <Link className="n-item font-medium text[14px] text-(--primary-green)">Logements</Link>
                <Link className="n-item font-medium text[14px] ">Affiliations</Link>
            </div>
            <button className="ownerButton hidden lg:flex cursor-pointer text-[14px] gap-2 font-medium  items-center justify-center w-full max-w-[285px] h-[40px]  bg-(--primary-green)">
                <i className="fa-solid fa-plus text-white"></i>
                <span className="text-white">Ajouter mon logement sur metch</span>
            </button>
        </div>
    </div>
}