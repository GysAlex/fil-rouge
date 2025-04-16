import { Outlet } from "react-router-dom"
import { NavBar } from "../components/NavBar"

export function Main()
{
    return <>
        <NavBar/>
       <div className="max-w-[1258px] mx-auto pt-[30px]">
            <Outlet/>
        </div> 
    </>
}