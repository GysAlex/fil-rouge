import { useState } from "react";
import { StepOne } from "../../components/stepForm/Steps";
import { StepTwo } from "../../components/stepForm/Steps";  
import { StepThree } from "../../components/stepForm/Steps";
import { StepFour } from "../../components/stepForm/Steps";
import "../../stepForm.css"

export function NewHome() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({})
    const totalSteps = 4; 

    const nextStep = (data) => {
        setFormData({ ...formData, ...data })
        console.log(formData)
        setCurrentStep(prevStep => prevStep + 1)
    };

    const prevStep = () => {
        setCurrentStep(prevStep => prevStep - 1)
    }

    const handleSubmit = () => {
        // Traitez ici les données complètes du formulaire (formData)
        console.log('Données du formulaire soumises :', formData)
        alert('Formulaire soumis !')
    }

    return  <div className="max-w-[1258px]  px-[75px] xl:px-0 mx-auto lg:px-[60px] pt-[33px] flex flex-col items-stretch justify-start">
        <span className="text-(--primary-green)">Ajouter un logements</span>
        <div className="flex items-stretch flex-col justify-start gap-4 mt-12">
            <div>
                There will be the progress bar and 
            </div>
            <form action="" className="mb-10">
                <div className="form-container px-[30px] py-[20px] lg:h-[590px]" style={{boxShadow: '0 0 7px rgba(0, 0, 0, .25)'}}>
                    <StepOne currentPage={currentStep} nextStep={nextStep} formData={formData}/> 
                    <StepTwo currentPage={currentStep} prevStep={prevStep}/>
                    <StepThree currentPage={currentStep} prevStep={prevStep}/> 
                    <StepFour currentPage={currentStep} prevStep={prevStep}/> 
                </div>
            </form>
        </div>

    </div>
}