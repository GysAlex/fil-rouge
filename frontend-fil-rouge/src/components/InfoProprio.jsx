import { Button } from "./Button"
import { SmallButton } from "./Button"


export function InfoProprio({owner, published_at})
{
    return <div className=" flex items-center justify-start w-fit gap-3">
        <div className="img-cont">
            <img src="http://localhost:5173/images/team2.jpg" width={60} height={60} className="rounded-full" alt="" />
        </div>
        <div className="info">
            <div className="nameProprio">
                <span className="font-light"> Propriétaire: </span>
                <span className="font-medium">{owner.name}</span>
            </div>
            <div className="status">
                <span className="text-[14px] text-(--text-color)">Publié le: </span>
                <span className="text-[14px] text-(--text-color)" >{published_at ?? "12 Dec 2024"}</span>
            </div>
        </div>
        <div className="md:flex hidden mt-4 xs:mt-0">
            <SmallButton>
                <span>vérifié(e)</span> 
            </SmallButton>
        </div>
    </div>
}