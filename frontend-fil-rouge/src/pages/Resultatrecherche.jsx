import {Link} from "react-router-dom";
import { Tags } from "../components/Tags";
import { Home } from "../components/Home";
import { DependHome } from "../components/Home";
import { DependHome2 } from "../components/Home";
import {FilterScrollbarWithModal} from "../components/FilterScrollbarWithModal";


export function Resultatrecherche() {
    return <>
    <div className="">
        <div className="flex items-center  lg:px-16 flex-wrap gap-[30px]">
        <FilterScrollbarWithModal/>
        </div>
     
        <div className="flex items-center justify-between flex-wrap gap-[30px] mt-5">
            <DependHome img={'http://localhost:5173/images/g2.jpg'}/>
            <DependHome img ={'http://localhost:5173/images/g5.jpg'} />
            <DependHome img ={'http://localhost:5173/images/g6.jpg'} />
            
        </div>

        <div className="flex items-center justify-between flex-wrap gap-[30px] mt-20">
            <DependHome2 img={'http://localhost:5173/images/g4.jpg'}/>
            <DependHome2 img ={'http://localhost:5173/images/g3.jpg'} />
            <DependHome2 img ={'http://localhost:5173/images/g1.jpg'} />

        </div>
    </div>    
    </>
}