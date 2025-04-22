import { Outlet } from "react-router-dom";
import { AuthNavBar, HomeNavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";
import { useState } from "react";
import { useHandleSibeBar } from "../hooks/useSideBar";

export function Renter()
{
    const {isExpanded} = useHandleSibeBar()

    const cls = isExpanded ? "absolute top-0 sidebar expanded" : "absolute top-0 sidebar"
    console.log(isExpanded)
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