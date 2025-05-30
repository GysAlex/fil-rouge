import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import { useHandleUser } from "../../hooks/useUser";
import { UpdateOwner } from "../../containers/modals.jsx/UpdateOwner";
import { Toaster } from "sonner";

export function Profile() {
    const { user } = useAuth();
    const { openModal, closeModal } = useModal();
    const { updateProfileImgage } = useHandleUser();

    const [newUser, setNewUser] = useState(user);
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    return (
        <>
        <Toaster />
        <div className="relative w-full h-[362px] inside hidden md:block z-30">
            <div className="absolute w-full h-full bg-(--profile-bg)">
                <div className="max-w-[1258px] mx-auto px-[60px] pt-[33px] flex flex-col items-stretch justify-start">
                    <div className="text-white text-[18px]">Profil du propriétaire</div>
                    <div className="text-white text-[32px] font-medium mt-[30px]">
                        Bienvenu(e) {user.name}
                    </div>
                    <div className="text-white text-[14px] lg:w-[40%]">
                        Ceci est votre profil propriétaire. Profitez des outils
                        offerts par MetchApp pour gérer vos logements.
                    </div>
                    <button
                        onClick={() => openModal(UpdateOwner, user)}
                        className="mt-[45px] h-[51px] cursor-pointer text-(--primary-green) grid place-items-center font-medium bg-white w-[259px] rounded-2xl"
                    >
                        Modifier mes informations
                    </button>
                    <div className="grid grid-cols-2 w-full mb-6">
                        <div
                            className="mt-[15px]"
                            style={{ boxShadow: "0 0 7px rgba(0, 0, 0, .25)" }}
                        >
                            <div className="flex flex-col items-stretch justify-start">
                                <div className="bg-[#fafafa] w-full p-[24px] rounded-tl-2xl rounded-tr-2xl">
                                    Mon compte
                                </div>
                                <div className="flex items-center justify-between px-[30px] mt-[15px]">
                                    <div className="flex items-center justify-center gap-2">
                                        <i className="fa-solid fa-lock text-[20px] text-(--primary-green)"></i>
                                        <span>Sécurité</span>
                                    </div>
                                    <button className="bg-(--primary-green) cursor-pointer text-[14px] text-white px-3 py-2 rounded-2xl">
                                        Changer de mot de passe
                                    </button>
                                </div>
                                <div className="mt-[45px] text-[#003700] px-[30px]">
                                    Informations personnelles
                                </div>
                                <div className="grid lg:grid-cols-2 gap-x-8 px-[30px] mt-[15px]">
                                    <div className="flex flex-col items-stretch justify-start gap-8 mb-[45px]">
                                        <div className="flex flex-col items-stretch justify-start">
                                            <span className="text-(--text-color) text-[15px]">
                                                Nom
                                            </span>
                                            <div className="text-[15px] p-3 bg-[#f5f5f5] text-(--primary-green) rounded-2xl">
                                                {user.family_name +
                                                    " " +
                                                    user.name}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-stretch justify-start">
                                            <span className="text-(--text-color) text-[15px]">
                                                Email
                                            </span>
                                            <div className="text-[15px] p-3 bg-[#f5f5f5] text-(--primary-green) rounded-2xl">
                                                {user.email}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-stretch justify-start">
                                            <span className="text-(--text-color) text-[15px]">
                                                Numéro
                                            </span>
                                            <div className="text-[15px] p-3 bg-[#f5f5f5] text-(--primary-green) rounded-2xl">
                                                {user.phone_number ??
                                                    "non enregistré"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="h-[60%] w-[60%] bg-white mt-[10px] rounded-2xl"
                            style={{ boxShadow: "0 0 7px rgba(0, 0, 0, .25)" }}
                        >
                            <div className="relative flex items-center justify-center">
                                <img
                                    src={
                                        image
                                            ? image
                                            : user.image
                                            ? `http://localhost:8000/storage/${user.image}`
                                            : "http://localhost:5173/images/team2.jpg"
                                    }
                                    width={130}
                                    height={130}
                                    className="rounded-full size-30 absolute object-fit"
                                    alt=""
                                />
                                <div className="absolute flex items-end top-2 justify-end w-[50%]">
                                    <input
                                        onChange={handleImageChange}
                                        type="file"
                                        id="image"
                                        accept="jpg/png/jpeg"
                                        name="image"
                                        className="opacity-0"
                                    />
                                    <label htmlFor="image">
                                        <i
                                            className="fa-solid fa-camera text-xl"
                                            style={{ color: "#28b446" }}
                                        ></i>
                                    </label>
                                </div>
                            </div>
                            {image && (
                                <div className="my-[15px] flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="bg-(--primary-green) p-3 text-sm rounded-2xl text-white"
                                    >
                                        Enregistrer l'image
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}