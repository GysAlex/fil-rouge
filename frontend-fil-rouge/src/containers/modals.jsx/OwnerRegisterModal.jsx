import React, { useState } from "react";
import { Button } from "../../components/Button";
import { useModal } from "../../hooks/useModal";
import '../../stepForm.css';

export function OwnerRegisterModal() {
    const { closeModal } = useModal();
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        verificationCode: "",
    });

    const nextStep = (data) => {
        setFormData({ ...formData, ...data });
        setCurrentPage((prev) => prev + 1);
    };

    const prevStep = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handleSubmit = () => {
        console.log("Formulaire soumis avec succès :", formData);
        closeModal();
    };

    return (
        <form
            className="max-w-[500px] flex flex-col items-stretch gap-6 md:w-[70%] w-[80%] bg-white p-4 rounded-xl"
            style={{ boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)" }}
        >
            <div className="my-4">
                <span className="text-xl text-(--primary-green)">
                    Enregistrer un propriétaire
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
            <div className="form-container">
                {
                    <StepOne
                        nextStep={nextStep}
                        formData={formData}
                        currentPage={currentPage}
                    />
                }
                {
                    <StepTwo
                        prevStep={prevStep}
                        nextStep={handleSubmit}
                        formData={formData}
                        currentPage={currentPage}
                    />
                }
            </div>
        </form>
    );
}

function StepOne({ nextStep, formData, currentPage }) {
    const [form, setForm] = useState({
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        phoneNumber: formData.phoneNumber || "",
        email: formData.email || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleNext = () => {
        nextStep(form);
    };

    return (
        <div className={currentPage === 1 ? "active" : ""}>
            <div className="title text-[18px]">Informations personnelles</div>
            <div className="grid lg:grid-cols-2 mt-[30px] gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-(--title-color)">
                        Prénom
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
                    <label htmlFor="lastName" className="text-(--title-color)">
                        Nom
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="phoneNumber"
                        className="text-(--title-color)"
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
                    <label htmlFor="email" className="text-(--title-color)">
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
            </div>
            <div className="flex items-center justify-end mt-8">
                <Button handleClick={handleNext}>
                    Suivant
                    <i className="fa-solid fa-arrow-right"></i>
                </Button>
            </div>
        </div>
    );
}

function StepTwo({ prevStep, nextStep, formData, currentPage }) {
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
        <div className={currentPage === 2 ? "active" : ""}>
            <div className="title text-[18px]">Confirmation du code</div>
            <p className="mt-[30px] text-sm">
                Un code de vérification a été envoyé à l'adresse email :{" "}
                <strong>{formData.email}</strong>
            </p>
            <div className="flex flex-col gap-2 mt-4">
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
            <div className="flex items-center justify-between mt-8">
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