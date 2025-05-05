import { Assets } from "./Assets";
import { HomeTags } from "./Tags";

export function Home()
{
    return <button className="lg:w-[382px] homecard w-[90%] mx-auto flex-grow lg:mx-0  p-1.5 cursor-pointer grid grid-rows-2 gap-[25px] rounded-[10px]" style={{boxShadow: "0 0 7px rgba(0, 0, 0, .25)"}}>
        <div className="img-cont relative -z-20">
            <img src="http://localhost:5173/images/g2.jpg" className="w-full  h-full rounded-[10px]" alt="" />
            <span className="absolute cursor-pointer top-0 right-0 w-[60px] h-[40px] p-2 bg-(--light-green) flex items-center justify-center rounded-tr-[10px] rounded-bl-[10px]">
                <i className="fa-solid fa-heart text-xl text-white"></i>
            </span>
        </div>
        <div className="info flex flex-col items-stretch justify-start gap-[15px]">
            <div className="infoF flex items-center justify-between">
                <span className="text-[20px] text-(--text-color) font-medium">MCC Studio Ets</span>
                <div className="flex items-center justify-center gap-2">
                    <div><i className="fa-solid fa-star text-xl text-(--primary-green)"></i></div>
                    <div className="text-(--text-color)">3,3 (4 avis)</div>
                </div>
            </div>
            <div className=" flex items-center justify-start flex-wrap gap-2">
                <HomeTags>
                    studio
                </HomeTags>
                <HomeTags>
                    prix abordable
                </HomeTags>
                <HomeTags>
                    qualité standard
                </HomeTags>
            </div>
            <div className="flex flex-col items-stretch justify-start gap-3">
                <Assets>
                    <div><i className="fa-solid text-xl w-[40px]  fa-couch text-(--primary-green)"></i></div>
                    <span className="text-(--text-color)">1 Chambre, 02 Douches</span>
                </Assets>
                <Assets>
                    <div><i className="fa-solid text-xl w-[40px]  fa-location-dot text-(--primary-green)"></i></div>
                    <span className="text-(--text-color)">05 Minutes du campus</span>
                </Assets>
                <Assets>
                    <div><i className="fa-solid text-xl w-[40px] fa-house-user text-(--primary-green)"></i></div>
                    <span className="text-(--text-color)">2 Studios disponible</span>
                </Assets>
            </div>
            <div className="price">
              <span className="text-[18px] text-(--text-color)">A partir de : </span>  <span className="text-[20px] font-medium text-(--primary-green)">16000 FCFA/ans</span>
            </div>
        </div>
    </button>
}

export function HomeDyn({home}) {
    const image = home.images.filter((el) => el.is_main == 1).map(el => el.image_path)

    return (
        <button className="lg:w-[382px] h-[590px] homecard w-[90%] mx-auto flex-grow lg:mx-0 p-1.5 cursor-pointer grid grid-rows-[250px_1fr] gap-[25px] rounded-[10px]" 
                style={{boxShadow: "0 0 7px rgba(0, 0, 0, .25)"}}>
            {/* Container image avec hauteur fixe */}
            <div className="img-cont relative -z-20 h-full w-full">
                <img 
                    src={"http://localhost:8000/storage/" + image[0]} 
                    className="w-full h-full object-cover rounded-[10px]" 
                    alt={home.property_name} 
                />
                <span className="absolute cursor-pointer top-0 right-0 w-[60px] h-[40px] p-2 bg-(--light-green) flex items-center justify-center rounded-tr-[10px] rounded-bl-[10px]">
                    <i className="fa-solid fa-heart text-xl text-white"></i>
                </span>
            </div>

            {/* Container info avec overflow gestion */}
            <div className="info flex flex-col items-stretch justify-start gap-[15px] overflow-y-auto">
                {/* En-tête avec nom et note */}
                <div className="infoF flex items-center justify-between min-h-[40px]">
                    <span className="text-[20px] text-(--text-color) font-medium truncate pr-2">
                        {home.property_name}
                    </span>
                    <div className="flex items-center justify-center gap-2 shrink-0">
                        <div><i className="fa-solid fa-star text-xl text-(--primary-green)"></i></div>
                        <div className="text-(--text-color)">3,3 (4 avis)</div>
                    </div>
                </div>

                {/* Tags avec hauteur max */}
                <div className="flex items-center justify-start flex-wrap gap-2 max-h-[80px] overflow-y-auto">
                    {home.tags.length > 0 && home.tags.map((el) => (
                        <HomeTags key={el.id}>{el.tag_name}</HomeTags>
                    ))}
                </div>

                {/* Assets avec hauteur fixe */}
                <div className="flex flex-col items-stretch justify-center gap-3 min-h-[120px]">
                    <Assets>
                        <div><i className="fa-solid text-xl w-[40px] fa-couch text-(--primary-green)"></i></div>
                        <span className="text-(--text-color) line-clamp-2">
                            {home.nombre_chambres > 0 ? `${home.nombre_chambres} Chambre${home.nombre_chambres > 1 ? 's' : ''} ` : ''}
                            {home.nombre_cuisine > 0 ? `${home.nombre_cuisine} Cuisine${home.nombre_cuisine > 1 ? 's' : ''} ` : ''}
                            {home.nombre_salon > 0 ? `${home.nombre_salon} Salon${home.nombre_salon > 1 ? 's' : ''} ` : ''}
                            {home.nombre_douches > 0 ? `${home.nombre_douches} Douche${home.nombre_douches > 1 ? 's' : ''}` : ''}
                        </span>
                    </Assets>
                    <Assets>
                        <div><i className="fa-solid text-xl w-[40px] fa-location-dot text-(--primary-green)"></i></div>
                        <span className="text-(--text-color)">05 Minutes du campus</span>
                    </Assets>
                    <Assets>
                        <div><i className="fa-solid text-xl w-[40px] fa-house-user text-(--primary-green)"></i></div>
                        <span className="text-(--text-color)">Disponible</span>
                    </Assets>
                </div>

                {/* Prix avec hauteur fixe */}
                <div className="price mt-auto min-h-[40px] flex items-center">
                    <span className="text-[18px] text-(--text-color)">A partir de : </span>
                    <span className="text-[20px] font-medium text-(--primary-green) ml-2">
                        {home.property_price} FCFA / ans
                    </span>
                </div>
            </div>
        </button>
    );
}


// export function HomeDyn({home})
// {
//     const image = home.images.filter((el) => el.is_main == 1).map(el => el.image_path)

//     return <button className="lg:w-[382px] homecard w-[90%] mx-auto flex-grow lg:mx-0  p-1.5 cursor-pointer grid grid-rows-2 gap-[25px] rounded-[10px]" style={{boxShadow: "0 0 7px rgba(0, 0, 0, .25)"}}>
//         <div className="img-cont relative -z-20">
//             <img src={"http://localhost:8000/storage" + image[0]} className="w-full  h-full rounded-[10px]" alt="" />
//             <span className="absolute cursor-pointer top-0 right-0 w-[60px] h-[40px] p-2 bg-(--light-green) flex items-center justify-center rounded-tr-[10px] rounded-bl-[10px]">
//                 <i className="fa-solid fa-heart text-xl text-white"></i>
//             </span>
//         </div>
//         <div className="info flex flex-col items-stretch justify-start gap-[15px]">
//             <div className="infoF flex items-center justify-between">
//                 <span className="text-[20px] text-(--text-color) font-medium">{home.property_name}</span>
//                 <div className="flex items-center justify-center gap-2">
//                     <div><i className="fa-solid fa-star text-xl text-(--primary-green)"></i></div>
//                     <div className="text-(--text-color)">3,3 (4 avis)</div>
//                 </div>
//             </div>
//             <div className=" flex items-center justify-start flex-wrap gap-2">
//                 {
//                     home.tags.length > 0 && home.tags.map((el) => <HomeTags>{el.tag_name}</HomeTags> )
//                 }
//             </div>
//             <div className="flex flex-col items-stretch justify-start gap-3">
//                 <Assets>
//                     <div><i className="fa-solid text-xl w-[40px]  fa-couch text-(--primary-green)"></i></div>
//                     <span className="text-(--text-color)">
//                         {home.nombre_chambres > 0 ?  home.nombre_chambres > 1 ? `${home.nombre_chambres} Chambres ` : `${home.nombre_chambres} Chambre ` : ""}
//                         {home.nombre_cuisine > 0 ?  home.nombre_cuisine > 1 ? `${home.nombre_cuisine} Cuisines ` : `${home.nombre_cuisine} Cuisine ` : ""}
//                         {home.nombre_chambres > 0 ?  home.nombre_salon > 1 ? `${home.nombre_salon} Salons ` : `${home.nombre_salon} Salon ` : ""}
//                         {home.nombre_chambres > 0 ?  home.nombre_douches  > 1 ? `${home.nombre_douches} Douches ` : `${home.nombre_douches} Douche ` : ""}
//                     </span>
//                 </Assets>
//                 <Assets>
//                     <div><i className="fa-solid text-xl w-[40px]  fa-location-dot text-(--primary-green)"></i></div>
//                     <span className="text-(--text-color)">05 Minutes du campus</span>
//                 </Assets>
//                 <Assets>
//                     <div><i className="fa-solid text-xl w-[40px] fa-house-user text-(--primary-green)"></i></div>
//                     <span className="text-(--text-color)"> Disponible</span>
//                 </Assets>
//             </div>
//             <div className="price">
//               <span className="text-[18px] text-(--text-color)">A partir de : </span>  <span className="text-[20px] font-medium text-(--primary-green)">{home.property_price} FCFA</span>
//             </div>
//         </div>
//     </button>
// }