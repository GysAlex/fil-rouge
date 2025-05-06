export function StepTwo({ prevStep, nextStep, formData, currentPage }) {
    const [verificationCode, setVerificationCode] = useState(
        formData.verificationCode || ""
    );

    const handleChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleConfirm = () => {
        nextStep({ verificationCode });
    };

    return (
        <div className={currentPage === 2 ? "active " : ""}>
            <div className="title text-[18px] w-[90%] mx-auto mt-4">Confirmation du code</div>
            <p className="mt-[30px] text-sm w-[90%] mx-auto">
                Un code de vérification a été envoyé à l'adresse email :{" "}
                <strong>{formData.email}</strong>
            </p>
            <div className="flex flex-col gap-2 mt-4 w-[90%] mx-auto">
                <label
                    htmlFor="verificationCode"
                    className="text-(--title-color)"
                >
                    Code de vérification
                </label>
                <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col-reverse gap-4 items-start lg:flex-row lg:items-center justify-between mt-8 w-[90%] mx-auto">
                <Button handleClick={prevStep}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Précédent
                </Button>
                <Button handleClick={handleConfirm}>
                    Confirmer
                    <i className="fa-solid fa-check"></i>
                </Button>
            </div>
        </div>
    );
}


import React, { useState } from "react";
import { Button } from "../Button";

export function StepOne({ nextStep, formData, currentPage }) {
    const [form, setForm] = useState({
        firstName: formData.firstName || "",
        password: formData.password || "",
        phoneNumber: formData.phoneNumber || "",
        email: formData.email || "",
    });


    const [shouldSee, setShouldSee] = useState(false)

    const toggleSee = ()=>{
        setShouldSee(!shouldSee)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleNext = () => {
        nextStep(form);
    };

    return (
        <div className={currentPage === 1 ? "active" : ""}>
            <div className="title text-[18px] w-[90%] mx-auto mt-4">Informations personnelles</div>
            <div className="grid mt-[30px] gap-4 w-[90%] mx-auto">
                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-(--title-color) text-sm">
                        Nom
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="phoneNumber"
                        className="text-(--title-color) text-sm"
                    >
                        Numéro de téléphone
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-(--title-color) text-sm">
                        Adresse email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="password" className="text-(--title-color) text-sm">
                        Mot de passe
                    </label>
                    <input
                        type={shouldSee ? "text" : "password"}
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                   { !shouldSee && <i onClick={toggleSee} className="fa-solid fa-eye text-(--primary-green) absolute bottom-3 right-4"></i> }
                   { shouldSee && <i onClick={toggleSee} className="fa-solid fa-eye-slash text-(--primary-green) absolute bottom-3 right-4"></i> }
                </div>
            </div>
            <div className="flex items-center justify-end mt-8 w-[90%] mx-auto">
                <Button handleClick={handleNext}>
                    Suivant
                    <i className="fa-solid fa-arrow-right"></i>
                </Button>
            </div>
        </div>
    );
}