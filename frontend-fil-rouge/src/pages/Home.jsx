import { Button } from "../components/Button"
import { HomeSwiper } from "../components/HomeSwiper"
import { LineFilter } from "../components/LineFilter"
import { HomeNavBar, HomeSmaller } from "../components/NavBar"
import { SearchBar } from "../components/SearchBar"
import { ModalContainer } from "../containers/modals.jsx/ModalContainer"



export function Home()
{
    return <>
        <ModalContainer/>
        <HomeNavBar/>
        <HomeSmaller/>
        <div className="relative h-[220px] inside hidden md:block z-30" >
            <div className="absolute w-full h-full bg-(--home-bg)">
                <div className="max-w-[1258px] text-[36px]  mx-auto px-4 md:px-4 xl:px-0 mt-[40px] lg:mt-[60px]">
                    <div className="text-white mx-auto text-center md:w-[78%] font-medium" style={{letterSpacing: "-4%"}}>
                        Trouvez votre logemente universitaire en un clic !
                    </div>
                </div>
            </div>
            <div className="absolute -bottom-[50px] h-24  w-[95%] hidden md:block " style={{transform: "translateX(2.5%)"}}>
                <div className="w-fit mx-auto h-full relative ">
                    <SearchBar/>
                </div>
            </div>  
        </div>
        <LineFilter/>
        <div className="max-w-[1258px] mx-auto mt-[30px] md:block hidden">
            <HomeSwiper/>
        </div>
    </>
}