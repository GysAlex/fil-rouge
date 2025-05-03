import { ArrowItem } from "../../components/ArrowItem";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";

export function ModalOwnerLogin() {
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const handleClick = () => {
        setLoading(true);
        window.open("http://localhost:8000/auth/google/owner/redirect", "_self");
    };

    const handleClick2 = () => {
        setLoading2(true);
        window.open("http://localhost:8000/auth/facebook/owner/redirect", "_self");
    };

    const { closeModal } = useModal();

    return (
        <form
            className="lg:w-[735px] flex flex-col ajust items-stretch gap-6 md:w-[70%] w-[80%] bg-white p-4 rounded-xl"
            style={{ boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)" }}
        >
            <div className="my-4">
                <span className="text-xl text-(--primary-green) text-[25px]">
                    Mettre mon logement sur Metch
                </span>
                <button
                    onClick={closeModal}
                    type="button"
                    className="cursor-pointer float-right p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center"
                    style={{ transform: "translateY(-5px)" }}
                >
                    <i className="fa-solid fa-x text-sm text-red-800"></i>
                </button>
            </div>
            <div className="flex items-stretch justify-start gap-4 flex-col">
                <ArrowItem>
                    Publiez votre logement et atteignez des milliers de locataires potentiels
                </ArrowItem>
                <ArrowItem>
                    Recevez des notifications des demandes des locataires intéressés
                </ArrowItem>
                <ArrowItem>
                    Gérez vos annonces et vos contrats facilement depuis votre tableau de bord
                </ArrowItem>
                <button
                    type="button"
                    onClick={handleClick}
                    className="google cursor-pointer flex items-center justify-center gap-3 h-[55px] mt-[30px] rounded-2xl"
                    style={{ border: "solid 2px #fbbd0466" }}
                >
                    {!loading ? (
                        <img
                            src="../src/assets/i-gmail.svg"
                            width={40}
                            height={40}
                            alt=""
                        />
                    ) : (
                        <i
                            className="fa-solid fa-spinner animate-spin text-2xl"
                            style={{ color: "#fbbd04" }}
                        />
                    )}
                    <span className="text-(--livre)">Continuer avec Google</span>
                </button>

                <button
                    type="button"
                    onClick={handleClick2}
                    className="facebook cursor-pointer flex items-center justify-center gap-3 h-[55px] rounded-2xl"
                    style={{ border: "solid 2px #1876f266" }}
                >
                    {!loading2 ? (
                        <img
                            src="../src/assets/i-facebook.svg"
                            width={40}
                            height={40}
                            alt=""
                        />
                    ) : (
                        <i
                            className="fa-solid fa-spinner animate-spin text-2xl"
                            style={{ color: "#43609c" }}
                        />
                    )}
                    <span className="text-(--livre2)">Continuer avec Facebook</span>
                </button>

                <button
                    className="email flex cursor-pointer items-center justify-center gap-3 h-[55px] mb-5 rounded-2xl"
                    style={{ border: "solid 2px #00000066" }}
                >
                    <i
                        className="fa-solid fa-at text-2xl"
                        style={{ color: "#000000" }}
                    ></i>
                    <span>Continuer avec un email professionnel</span>
                </button>
            </div>
        </form>
    );
}