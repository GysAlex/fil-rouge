import { Outlet } from "react-router-dom"
import { NavBar } from "../components/NavBar"
import { Footer } from "../components/Footer"

export function Main()
{
    return <>
        <NavBar/>
       <div className="max-w-[1258px] mx-auto px-4 md:px-4 xl:px-0 pt-[30px]">
            <Outlet/>
        </div> 
        <Footer/>
    </>
}