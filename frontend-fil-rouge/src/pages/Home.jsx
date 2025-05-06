import { useLocation } from "react-router-dom"
import { Button } from "../components/Button"
import { HomeSwiper } from "../components/HomeSwiper"
import { LineFilter } from "../components/LineFilter"
import { HomeNavBar, HomeSmaller } from "../components/NavBar"
import { SearchBar } from "../components/SearchBar"
import { ModalContainer } from "../containers/modals.jsx/ModalContainer"
import { Toaster, toast } from "sonner"
import { useHome } from "../hooks/useHome"
import { HomeSkeleton } from "../components/HomeSkeleton"
import { LineFilterSkeleton } from "../components/LineFilterSkeleton"
import { SearchBarSkeleton } from "../components/SearchBarSkeleton"




export function Home()
{

    const location = useLocation()
    
    const {universities, loading, error} = useHome() 

    console.log(universities)

    if(location.state?.error)
    {
        toast.error(location.state.error)
        console.log('Bonjour Boss')
    }

    return <>
        <Toaster richColors position="top-right"/>
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
                    
                    {loading ? (<SearchBarSkeleton/>) : <SearchBar/> }
                </div>
            </div>  
        </div>

        {loading ? <LineFilterSkeleton /> : <LineFilter />}


         <div className="max-w-[1258px] mx-auto mt-[30px] md:block hidden min-h-[800px]">

            
        {loading && (
            <>
                <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-6 animate-pulse"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <HomeSkeleton key={index} />
                    ))}
                </div>
            </>
        )}

            
            {
                !loading &&  universities.map(university => (
                    <div className="space-y-8" key={university.id}>
                        <section  className="mb-16 mt-[33px]">
                            <h2 className="text-[20px] text-(--title-color) mb-1 ps-3">
                                {university.universitie_name}  <div  className="line h-[2px] bg-(--primary-green) w-[90%] lg:w-full relative rounded-tr-full">
                                </div>
                            </h2>
                            {university.properties.length > 0 ? (
                                <HomeSwiper properties={university.properties} />
                            ) : (
                                <p className="text-gray-500 text-center">
                                    Aucun logement disponible pour cette université
                                </p>
                            )}
                        </section>
                    </div>
                ))
            }
                
        </div>
        
    </>
}