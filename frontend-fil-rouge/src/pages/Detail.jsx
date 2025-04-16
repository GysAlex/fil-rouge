import { Link } from "react-router-dom";
import { ImageContainer } from "../components/ImageContainer";

export function Detail()
{
    return <>
        <Link className="p-2.5 h-[44px] w-fit rounded-4xl cursor-pointer text-white bg-(--primary-green) flex items-center justify-center gap-3">
            <i className="fa-solid fa-arrow-left"></i>
            <span>retour</span>
        </Link>
        <ImageContainer/>
    </>
} 