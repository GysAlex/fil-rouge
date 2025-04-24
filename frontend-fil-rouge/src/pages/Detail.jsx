import { Link } from "react-router-dom";
import { ImageContainer } from "../components/ImageContainer";
import { InfoProprio } from "../components/InfoProprio";
import { Tags } from "../components/Tags";
import { TextContainer } from "../components/TextContainer";
import { Bar } from "react-chartjs-2";
import { ArrowItem } from "../components/ArrowItem";
import { Chart as ChartJS} from "chart.js/auto";
import { Button, StrokeButton } from "../components/Button";
import { CommentSwiper } from "../components/CommentSwiper";
import { Home } from "../components/Home";
import { useModal } from "../hooks/useModal";
import { ModalRenterLogin } from "../containers/modals.jsx/ModalRenterLogin";
import { ModalContainer } from "../containers/modals.jsx/ModalContainer";


export function Detail()
{
    const {openModal} = useModal()

    const handleClick = ()=>{
        openModal(ModalRenterLogin)
        console.log("Bonjour")
    }

    console.log("Bonjour")

    return <>
        <Link className="p-2.5 h-[44px] w-fit rounded-4xl cursor-pointer text-white bg-(--primary-green) flex items-center justify-center gap-3">
            <i className="fa-solid fa-arrow-left"></i>
            <span>retour</span>
        </Link>
        <div className="title mt-[15px] flex items-center  justify-between">
            <div className="flex flex-col items-start justify-center">
                <div className="up text-[26px] text-(--text-color) font-medium">
                    Harmony City
                </div>
                <div className="down flex justify-start items-center gap-2 ">
                    <div className="firs flex justify-start items-center gap-1">
                        <i className="fa-solid fa-location-dot text-(--primary-green) text-2xl"></i>
                        <span>Dja, Bandjoun</span>
                    </div>
                    <div className="sec hidden sm:flex justify-start items-center gap-1">
                        <i className="fa-solid fa-star text-(--primary-green) text-2xl"></i>
                        <span>4,6 (56 avis) </span>
                    </div>
                </div>
            </div>
            <ModalContainer />
            
            <div className="flex items-center justify-between sm:gap-3 gap-5">
                <button className="fav cursor-pointer flex items-center justify-start gap-2">
                    <span className="hidden md:block">Ajouter aux favoris</span>
                    <span className="cursor-pointer"><i className="fa-solid fa-heart text-(--light-green) text-2xl"></i></span>
                </button>
                <button className="fav cursor-pointer share flex items-center justify-start gap-2">
                    <span className="hidden md:block">Partager le logement</span>
                    <span className="cursor-pointer"><i className="fa-solid fa-share text-(--light-green) text-2xl"></i></span>
                </button>
            </div>
        </div>
        <ImageContainer/>
        <div className="moreInfo grid md:grid-cols-2 gap-[30px]">
            <div className="left">
                <InfoProprio/>
                <div  className="line mt-(--figma-grid) h-[2px] bg-(--primary-green) w-[90%] lg:w-full relative rounded-tr-full">
                </div>
                <div className="information mt-(--figma-grid) flex flex-col items-stretch justify-start gap-[30px]">
                    <div className="title text-(--title-color) text-[22px] font-medium">
                        Ce que le logement propose
                    </div>
                    <div className="atouts flex items-center justify-start flex-wrap gap-2.5">
                        <Tags>
                            <i className="fa-solid fa-graduation-cap text-(--primary-green)"></i>
                            <span>Salle d'étude disponible</span>
                        </Tags>
                        <Tags>
                            <i className="fa-solid fa-droplet text-(--primary-green)"></i>
                            <span>Réserve d'eau annuelle</span>
                        </Tags>
                        <Tags>
                            <i className="fa-solid fa-car text-(--primary-green)"></i>
                            <span>Garage</span>
                        </Tags>
                        <Tags>
                            <i className="fa-solid fa-location-crosshairs text-(--primary-green)"></i>
                            <span>Très proche du campus</span>
                        </Tags>
                    </div>
                    <TextContainer>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempore dolor facere obcaecati! Itaque tempora voluptatum quo, architecto saepe impedit dolor a voluptas, accusamus temporibus debitis enim sapiente dolore eligendi!
                    </TextContainer>
                </div>
                <div  className="line mt-(--figma-grid) h-[2px] bg-(--primary-green) w-[90%] lg:w-full  relative rounded-tr-full">
                </div>
                <div className="information mt-(--figma-grid) flex flex-col items-stretch justify-start gap-[30px]">
                    <div className="title text-(--title-color) text-[22px] font-medium">
                        Distance au campus
                    </div>
                    <div className="flex items-center justify-between flex-wrap">
                        <i className="fa-solid fa-location-dot text-2xl text-(--title-color)"></i>
                        <div className="h-[0px] border-(--text-color) w-[40%] md:w-[60%] border-b-0 border-l-0 border-r-0  border-dashed border-t-2"></div>
                        <i className="fa-solid fa-graduation-cap text-2xl text-(--title-color)"></i>
                        <Tags>
                            <span className="font-semibold">300 mètres</span>
                        </Tags>
                    </div>
                </div>
                <div className="line mt-(--figma-grid) h-[2px] bg-(--primary-green) relative w-[90%] lg:w-full  rounded-tr-full">
                </div>
                <div className="information mt-(--figma-grid) flex flex-col items-stretch justify-start gap-[30px]">
                    <div className="title text-(--title-color) text-[22px] font-medium">
                        Occupation du logement
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-1.5 h-[195px]">
                        <Bar
                            data={{
                                labels: ['Electricité', 'Informatique', 'Comptabilité', 'Réseaux'],
                                datasets:[
                                    {
                                        label: "Etudiants",
                                        data: [2, 4, 11, 3],
                                        backgroundColor: [
                                            "#FBBB00",
                                            "#F14336",
                                            "#000",
                                            "#7481A6"
                                        ]
                                    },
                                ],
                            }}
                            options={{
                                barPercentage: .6,
                                responsive: true,
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                    <TextContainer>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi molestias placeat perferendis magni veniam ad quis odit veritatis tempora voluptatum quo, architecto saepe impedit dolor a volupta
                    </TextContainer>
                </div>
                <div  className="line mt-(--figma-grid) h-[2px] bg-(--primary-green) relative w-[90%] lg:w-full  rounded-tr-full">
                </div>
            </div>

            <div className="right relative flex items-start justify-start md:justify-center lg:justify-end pt-[30px]">
                <div className="pricing sticky rounded-[10px] w-[90%] top-30 lg:w-[461px] min-h-max lg:h-[506px] bg-white" style={{boxShadow: "-1px 0px 15px rgba(40, 180, 70, .25)"}} >
                    <div className="info w-[80%] mx-auto">
                        <div className="my-[45px] flex flex-col items-stretch justify-start gap-2">
                            <div className="libel text-(--text-color)">
                                Studio à partir de 
                            </div>
                            <div className="price text-(--title-color) text-[20px] font-medium">
                                150 000 FCFA par ans
                            </div>
                        </div>
                        <div className="keypoints flex flex-col items-start justify-start gap-[30px]">
                            <ArrowItem>
                                <div className="text-(--text-color) w-[70%]" style={{lineHeight: "30px"}}>Possibilité de payer en plusieurs tranches</div>
                            </ArrowItem>
                            <ArrowItem>
                                <div className="text-(--text-color) w-[70%]" style={{lineHeight: "30px"}}>Opportunité de collocation disponible</div>
                            </ArrowItem>
                            <ArrowItem>
                                <div className="text-(--text-color) w-[70%]" style={{lineHeight: "30px"}}>Prochain jour de visite <span className="font-medium">12 Octobre 2025</span></div>
                            </ArrowItem>
                        </div>
                        <div className="mt-[30px] flex items-center justify-center lg:justify-start  mb-[30px] lg:mb-0">
                            <Button handleClick={handleClick}>
                                je suis intéressé(é) par ce logement
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-[45px]">
            <div className="eval flex flex-col items-stretch justify-start gap-3">
                <div className="title text-(--title-color) text-[22px] font-medium">
                    Avis sur le logement
                </div>
                <div className="lib flex items-center justify-between">
                    <div className="lg:w-[30%] md:w-[60%] text-(--text-color)">
                        Témoignages des anciens locataires de ce logements 
                    </div>
                    <div className="hidden">
                        <StrokeButton>
                            <span>afficher plus de commentaires</span>
                        </StrokeButton>
                    </div>
                </div>
                <div className="">
                    <CommentSwiper/>
                </div>
            </div>
            <div className="map mt-[45px] flex flex-col items-stretch justify-start gap-[15px]">
                <div className="title text-(--title-color) text-[22px] font-medium">
                    Le logement sur la carte
                </div>
                <div className="lg:w-[60%]">
                    <TextContainer>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur tempore dolor facere obcaecati! Itaque tempora voluptatum quo, architecto saepe impedit dolor a voluptas, accusamus temporibus debitis enim sapiente dolore eligendi!
                    </TextContainer>
                </div>
                <div className="mt-[15px]">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4096080690683!2d10.423881867049063!3d5.354296695216623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105f926572f15d8b%3A0x44727adf8de047aa!2sIUT%20Fotso%20Victor%20Bandjoun!5e0!3m2!1sfr!2scm!4v1744912463623!5m2!1sfr!2scm" className="w-full" height="450" style={{border:"0"}}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className="maybe mt-[45px] flex flex-col items-stretch justify-start gap-[30px]">
                <div className="title text-(--title-color) text-[22px] font-medium">
                    Vous pourriez aussi être intéressé(e) par ces logements
                </div>
                <div className="flex items-center justify-between flex-wrap gap-[30px]">
                    <Home/>
                    <Home/>
                    <Home/>
                </div>
            </div>
        </div>
    </>
} 