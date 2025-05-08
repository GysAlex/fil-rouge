import { Outlet } from "react-router-dom";
import { AuthNavBar, HomeNavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { OwnerSideBar } from "../components/SideBar";
import { useHandleSibeBar } from "../hooks/useSideBar";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ModalContainer } from "./modals.jsx/ModalContainer";

export function Owner()
{
    
    const {isExpanded} = useHandleSibeBar()
    const {state, role} = useAuth()


    if(state === undefined) return <div className="flex items-center justify-center h-screen w-screen"><i className="fa-solid fa-spinner animate-spin text-4xl text-(--primary-green) "  /></div>
    else if(state === false) return <Navigate to={"/home"}></Navigate>
    else if(state==true && !role.includes("owner"))  {
        console.log(role)
        return  <Navigate to="/home" state={{
            error: "Accès refusé : Vous n'avez pas le droit d'accéder à cette page.",
        }}
    />
    }
    const cls = isExpanded ? "absolute top-0 sidebar expanded" : "absolute top-0 sidebar"

    return <div className="flex flex-col items-stretch justify-start">

        <div>
            <AuthNavBar/>
        </div>
        <div className="flex items-start justify-start relative">{isExpanded}
            <div className={cls}>
                <OwnerSideBar/>
            </div>
            <div className="nextSide flex-grow ms-7 md:ms-10 lg:ms-10 xl:ms-5">
                <ModalContainer/>
                <Outlet/>
            </div>
        </div>
    </div>
}