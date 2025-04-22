import { Outlet } from "react-router-dom";
import { HomeNavBar } from "../components/NavBar";

export function Renter()
{
    return <div className="flex flex-col items-stretch justify-start">

        <div>
            <HomeNavBar/>
        </div>
        <div className="flex items-start justify-start">
            <div className="bg-amber-300 sidebar">
                sidebar
            </div>
            <div className="nextSide flex-grow">
                <Outlet/>
            </div>
        </div>
    </div>
}