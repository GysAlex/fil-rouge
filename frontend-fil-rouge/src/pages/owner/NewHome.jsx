import { useEffect, useState } from "react";
import ImageUploader, { StepOne } from "../../components/stepForm/Steps";
import { StepTwo } from "../../components/stepForm/Steps";  
import { StepFour } from "../../components/stepForm/Steps";
import "../../stepForm.css";
import { ProgressBar } from "../../components/ProgressBar";
import { Link, useNavigate } from "react-router-dom";
import { useProperty } from "../../hooks/useProperty";
import { useDashboard } from "../../hooks/useDashboard";

export function NewHome() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({})


    const {refreshData} = useDashboard()

    const navigate = useNavigate()
    
    const totalSteps = 4; 

    const nextStep = (data) => {
        setFormData({ ...formData, ...data })

        currentStep < 4 && setCurrentStep(prevStep => prevStep + 1)
    };

    const prevStep = () => {
        setCurrentStep(prevStep => prevStep - 1)
    }

    const { createProperty, loading, error } = useProperty();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await createProperty(formData);
            refreshData()

            // Redirection ou notification de succès
            navigate('/owner/dashboard');
        } catch (err) {
            // Gestion des erreurs
            console.error(err);
        }
    };

    return  <div className="max-w-[1258px]  px-[75px] xl:px-0 mx-auto lg:px-[60px] pt-[33px] flex flex-col items-stretch justify-start">
        <span className="text-(--primary-green)">Ajouter un logements</span>
        <Link to="/owner/dashboard" className="p-2.5 h-[44px] w-fit mt-3 rounded-4xl cursor-pointer text-white bg-(--primary-green) flex items-center justify-center gap-3">
            <i className="fa-solid fa-arrow-left"></i>
            <span>retour</span>
        </Link>
        <div className="flex items-stretch flex-col justify-start gap-4 mt-12">
            <div className="mt-10">
                <ProgressBar currentStep={currentStep} totalSteps={4} />
            </div>
            <form action="" className="mb-10" onSubmit={handleSubmit}>
                <div className="form-container px-[30px] py-[20px] h-[700px] lg:h-[590px]" style={{boxShadow: '0 0 7px rgba(0, 0, 0, .25)'}}>
                    <StepOne currentPage={currentStep} nextStep={nextStep} formData={formData}/> 
                    <StepTwo currentPage={currentStep} prevStep={prevStep} nextStep={nextStep}/>
                    <ImageUploader currentPage={currentStep} formData={formData} prevStep={prevStep} nextStep={nextStep}/> 
                    <StepFour currentPage={currentStep} prevStep={prevStep} nextStep={nextStep} formData={formData}/> 
                </div>
            </form>
        </div>

    </div>
}