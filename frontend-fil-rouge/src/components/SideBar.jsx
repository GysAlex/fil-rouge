import { Link } from "react-router-dom";
import { useHandleSibeBar } from "../hooks/useSideBar";
import { NavLink } from "react-router-dom";

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

        <div className="flex flex-col w-full items-stretch justify-start gap-[50px] transition ease-in duration-500">
            <NavLink to="/renter/profile" className="flex py-2 items-center mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-user text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Profil</span>
            </NavLink>

            <NavLink to="/renter/favoris" className="flex items-center py-2  mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-heart text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Favoris</span>
            </NavLink>

            <NavLink to="/renter/notificationclient" className="flex items-center py-2  mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-bell text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Notifications</span>
            </NavLink>

            <Link className="flex items-center py-2  mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-file-contract text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Contrat</span>
            </Link>
        </div>


    </div>
}

export function OwnerSideBar()
{
    const {changeExpanded} = useHandleSibeBar();

    const handleClick = ()=>{
        changeExpanded()
    }

    return <div className="absolute w-full">
        <button onClick={handleClick} className="mb-4 cursor-pointer mx-auto h-[100px] w-full flex items-center justify-center">
            <p className="p-burger"></p>
        </button>



        <div className="flex flex-col w-full items-stretch justify-start gap-[50px] transition ease-in duration-500">
            
            <NavLink to="/owner/dashboard" className="flex items-center py-2  mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-bar-chart text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Contrat</span>
            </NavLink>

            <NavLink to="/owner/profile" className="flex py-2 items-center mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-user text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Profil</span>
            </NavLink>

            <NavLink to="/owner/favoris" className="flex items-center py-2  mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-heart text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Favoris</span>
            </NavLink>

            <NavLink to="/owner/notificationclient" className="flex items-center py-2  mx-auto justify-start gap-2 text-(--text-color) font-medium text-[15px] ">
                <i className="fa-solid fa-bell text-2xl text-(--primary-green)"></i>
                <span className="text-[15px]">Notifications</span>
            </NavLink>


        </div>


    </div>
}