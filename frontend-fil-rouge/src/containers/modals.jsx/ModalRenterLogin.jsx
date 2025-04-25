import { ArrowItem } from "../../components/ArrowItem"
import { useModal } from "../../hooks/useModal"
import { useState } from "react"

export function ModalRenterLogin()
{
const [loading, setLoading] = useState(false)

const handleClick = () => {
    setLoading(true)
    window.open("http://localhost:8000/auth/google/redirect", "_self") 

}
const {closeModal} = useModal()

return <form  className="lg:w-[735px] flex flex-col ajust items-stretch gap-6 md:w-[70%] w-[80%] bg-white  p-4 rounded-xl" style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)"}} >
        <div className="my-4">
            <span className="text-xl text-(--primary-green) text-[25px]">Optimisez votre recherche de logement !</span>
            <button onClick={closeModal} type="button" className="cursor-pointer float-right p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center" style={{transform: 'translateY(-5px)'}}><i className="fa-solid fa-x text-sm text-red-800"></i></button>
        </div>
        <div className="flex items-stretch justify-start gap-4 flex-col">
            <ArrowItem>
                Creér une liste personnalisée de logements favoris
            </ArrowItem>
            <ArrowItem>
                Recevez des notifications des meilleures offres des logements qui vous correspondent
            </ArrowItem>
            <ArrowItem>
                obtenez des conseils hebdomadaires lors de votre recherche de logement
            </ArrowItem>
            <button type="button" onClick={handleClick} href="http://localhost:8000/auth/google/redirect"  className="google cursor-pointer flex items-center justify-center gap-3 h-[55px] mt-[30px] rounded-2xl" style={{border: "solid 2px #fbbd0466"}}>
               {!loading ? <img src="../src/assets/i-gmail.svg" width={40} height={40} alt="" /> : <i className="fa-solid fa-spinner animate-spin text-2xl" style={{color: "#fbbd04"}} />}
                <span className="text-(--livre)">Continuer avec google</span> 
            </button>

            <button type="button" onClick={handleClick} href="" className="facebook cursor-pointer  flex items-center justify-center gap-3 h-[55px]  rounded-2xl" style={{border: "solid 2px #1876f266"}}>
               <img src="../src/assets/i-facebook.svg" width={40} height={40} alt="" />
                <span className="text-(--livre2)">Continuer avec facebook</span>
            </button>

            <button className="email flex cursor-pointer  items-center justify-center gap-3 h-[55px] mb-5 rounded-2xl" style={{border: "solid 2px #00000066"}}>
                <i className="fa-solid fa-at text-2xl" style={{color: "#000000"}}  ></i>
                <span className="">Continuer avec un email professionel</span>
            </button>
        </div>
    </form>
         
}