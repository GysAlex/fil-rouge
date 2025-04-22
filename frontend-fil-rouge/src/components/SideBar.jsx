import { Link } from "react-router-dom";
import { useHandleSibeBar } from "../hooks/useSideBar";

export function SideBar()
{

    const {changeExpanded} = useHandleSibeBar();

    const handleClick = ()=>{
        changeExpanded()
    }

    return <div className="absolute w-full">
        <button onClick={handleClick} className="mb-4 cursor-pointer mx-auto h-[100px] w-full flex items-center justify-center">
            <p className="p-burger"></p>
        </button>

        <div className="flex flex-col w-full items-stretch justify-start gap-[50px]">
            <Link className="flex active py-2 items-center mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-user text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Accueil</span>
            </Link>

            <Link className="flex items-center py-2  mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-heart text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Favoris</span>
            </Link>

            <Link className="flex items-center py-2  mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-bell text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Notifications</span>
            </Link>

            <Link className="flex items-center py-2  mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-file-contract text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Contrat</span>
            </Link>
        </div>


    </div>
}