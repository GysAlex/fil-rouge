import { Outlet } from "react-router-dom";
import { AuthNavBar, HomeNavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useHandleSibeBar } from "../hooks/useSideBar";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export function Renter()
{
    const {isExpanded} = useHandleSibeBar()
    const {state} = useAuth()

    if(state === undefined) return <div className="flex items-center justify-center h-screen w-screen"><i className="fa-solid fa-spinner animate-spin text-2xl" style={{color: "#fbbd04"}} /></div>
    if(state === false) return <Navigate to={"/home"}></Navigate>

    const cls = isExpanded ? "absolute top-0 sidebar expanded" : "absolute top-0 sidebar"

    return <div className="flex flex-col items-stretch justify-start">

        <div>
            <AuthNavBar/>
        </div>
        <div className="flex items-start justify-start relative">{isExpanded}
            <div className={cls}>
                <SideBar/>{isExpanded}
            </div>
            <div className="nextSide flex-grow">
                <Outlet/>
            </div>
        </div>
    </div>
}