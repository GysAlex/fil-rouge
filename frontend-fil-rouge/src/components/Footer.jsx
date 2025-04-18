import { Link } from "react-router-dom";

export function Footer()
{
    return <footer className="mt-[190px] ">
        <div className="up flex items-stretch justify-start flex-col gap-[120px] pb-8 px-4 md:px-2 lg:px-0">
            <div className="overlay lg:w-[60%] lg:mx-auto h-[120px]  bg-white" style={{boxShadow: "0 0 7px rgba(0, 0, 0, .25)"}}>

            </div>
            <div className="footer-body lg:w-[1258px] max-w-[1258px] gap-4 mx-auto grid lg:grid-cols-4">
                <div className="flex flex-col items-stretch justify-start gap-1.5">
                    <div className="title text-2xl">
                        <span className="font-bold text-white">Metch</span><span className="text-(--title-color) font-bold">App</span>
                    </div>
                    <div className="text-white">
                        Le meilleur site de recherche de logement au Cameroun
                    </div>
                    <div className="flex items-center justify-start gap-3 py-2">
                        <div className="flex items-center justify-between gap-5">
                            <button className="size-8 rounded-full bg-white flex items-center justify-center"><i className="fa-brands fa-facebook text-(--primary-green)"></i></button>
                            <button className="size-8 rounded-full bg-white flex items-center justify-center"><i className="fa-brands fa-linkedin text-(--primary-green)"></i></button>
                            <button className="size-8 rounded-full bg-white flex items-center justify-center"><i className="fa-brands fa-x text-(--primary-green)"></i></button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-stretch justify-start gap-3">
                    <div className="title text-xl text-(--title-color) font-medium">
                        Universités les plus populaires
                    </div>
                    <div className="flex flex-col items-stretch justify-start gap-1.5">
                        <Link className="text-white">
                           IUT-FV de Bandjoun
                        </Link>
                        <Link className="text-white">
                           Université de Dschang
                        </Link>
                        <Link className="text-white">
                            Enset de Bambili
                        </Link>
                        <Link className="text-white">
                            Enset d'Ebolowa
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-stretch justify-start gap-3">
                    <div className="title text-xl text-(--title-color) font-medium">
                        Régions les plus populaires
                    </div>
                    <div className="flex flex-col items-stretch justify-start gap-1.5">
                        <Link className="text-white">
                           Ouest
                        </Link>
                        <Link className="text-white">
                           Extrême Nord
                        </Link>
                        <Link className="text-white">
                            Sud
                        </Link>
                        <Link className="text-white">
                            Sud-Ouest
                        </Link>
                        <Link className="text-white">
                            Adamaoua
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-stretch justify-start gap-3">
                    <div className="title text-xl text-(--title-color) font-medium">
                        Beson d'aide ?
                    </div>
                    <div className="flex flex-col text-white items-stretch justify-start gap-1.5">
                        <span className="text-white">Contacter sur nous </span>
                        <span >help@metchapp.com</span>
                        <span>(+237 656833205)/(+237 652501247)</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="down h-[70px] flex items-center justify-center lg:w-[1258px] max-w-[1258px] mx-auto bg-white">
            <div className="flex items-center justify-center gap-1"> 
                <i className="fa-solid fa-copyright text-(--primary-green)"></i>
                <span>2025</span>
                <span className="text-(--primary-green)">Metch</span>
                <span className="text-black">App</span>
            </div>
            <div className="mx-2">|</div>
            <div>
                Tous droits réservés
            </div>
        </div>
    </footer>
}