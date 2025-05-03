import { useState } from "react";
import { StepTwo } from "../components/stepForm/OwnerRegisteringStepForm";
import { StepOne } from "../components/stepForm/OwnerRegisteringStepForm";
import "../stepForm2.css"
import { Toaster, toast } from 'sonner';
import { useOwner } from "../hooks/useOwner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export function OwnerRegister() {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        password: "",
        phoneNumber: "",
        email: "",
        verificationCode: "",
    })

    const nav = useNavigate()

    const {setUserState} = useAuth()

    const {registerOwner, sendVerificationCode} = useOwner()

    const nextStep = async (data) => {
        setFormData({ ...formData, ...data });

        if (currentPage === 1) {
            try {
                setUserState(false)
                await registerOwner({
                    name: data.firstName,
                    password: data.password,
                    phone_number: data.phoneNumber,
                    email: data.email,
                });
                toast.success("Informations de base enregistrées avec succès !");
                setCurrentPage(2);
                
            } catch (err) {
                toast.error("Erreur lors de l'enregistrement !");
                console.error(err);
            }
        } else if (currentPage === 2) {
            try {
                await sendVerificationCode({code: data.verificationCode});
                toast.success("Code de validation envoyé !");
                setTimeout(() => {
                    nav('/owner/dashboard')
                }, 300);
                setUserState(false)

            } catch (err) {
                toast.error("Erreur lors de l'envoi du code !");
                console.error(err);
            }
        }
    }


    const prevStep = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handleSubmit = () => {
        console.log("Formulaire soumis avec succès :", formData);
    };

    return (<div className="max-w-[1258px]  px-[75px] xl:px-0 mx-auto lg:px-[60px] pt-[33px] flex flex-col items-stretch justify-start">
        <div className="text-center mb-3">
            <h1 className="text-[32px] font-bold text-(--primary-green)">
                Rejoignez <span className="text-[--primary-dark]">MetchApp</span> et 
                <span className="text-[--primary-green]"> maximisez vos opportunités !</span>
            </h1>
            <p className="text-[18px] text-gray-600 mt-2">
                Publiez vos logements, connectez-vous avec des locataires qualifiés et gérez vos annonces en toute simplicité.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-12">
            <div className="avantages hidden self-center md:flex flex-col gap-6">
                <h2 className="text-[22px] font-bold text-(--primary-green)">
                    Pourquoi devenir propriétaire sur MetchApp ?
                </h2>
                <ul className="flex flex-col gap-5">
                    <li className="flex items-start gap-3">
                        <i className="fa-solid fa-check text-(--primary-green) text-[20px]"></i>
                        <span>
                            Publiez vos logements et atteignez des milliers
                            de locataires potentiels.
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <i className="fa-solid fa-check text-(--primary-green) text-[20px]"></i>
                        <span>
                            Recevez des notifications des demandes des
                            locataires intéressés.
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <i className="fa-solid fa-check text-(--primary-green) text-[20px]"></i>
                        <span>
                            Gérez vos annonces et vos contrats facilement
                            depuis votre tableau de bord.
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <i className="fa-solid fa-check text-(--primary-green) text-[20px]"></i>
                        <span>
                            Profitez d'une visibilité accrue grâce à notre
                            plateforme optimisée.
                        </span>
                    </li>
                </ul>
            </div>

            <div className="flex items-stretch flex-col justify-start gap-4 mt-12">
                <form action="" className="mb-10" onSubmit={handleSubmit}>
                    <div className="form-container px-[30px] py-[20px] h-[510px] lg:h-[525px]" style={{boxShadow: '0 0 7px rgba(0, 0, 0, .25)'}}>
                        <StepOne currentPage={currentPage} nextStep={nextStep} formData={formData}/> 
                        <StepTwo currentPage={currentPage} formData={formData} prevStep={prevStep} nextStep={nextStep}/>
                    </div>
                </form>
            </div>
        </div>
        <Toaster />

</div>)
}