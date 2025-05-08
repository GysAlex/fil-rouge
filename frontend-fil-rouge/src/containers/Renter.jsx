import { Outlet, useNavigate } from "react-router-dom";
import { AuthNavBar, HomeNavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useHandleSibeBar } from "../hooks/useSideBar";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { ModalContainer } from "./modals.jsx/ModalContainer";
import { toast } from "sonner";

export function Renter()
{
    const {isExpanded} = useHandleSibeBar()
    const {state, role} = useAuth()

    if(state === undefined) return <div className="flex items-center justify-center h-screen w-screen"><i className="fa-solid fa-spinner animate-spin text-4xl text-(--primary-green) "  /></div>
    if(state === false) return <Navigate to={"/home"}></Navigate>
    if (!role.includes("renter")) {
        toast.error("Accès refusé : Vous n'avez pas le droit d'accéder à cette page.")
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
        <div className="flex items-start justify-start relative ">
            <div className={cls}>
                <SideBar/>
            </div>
            <div className="nextSide flex-grow ms-7 md:ms-10 lg:ms-15 xl:ms-15">
                <ModalContainer/>
                <Outlet/>
            </div>
        </div>
    </div>
}