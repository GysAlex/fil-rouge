import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, data } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";
import "../../stepForm.css";
import ImageUploader, { StepOne, StepTwo, StepThree, StepFour } from "../../components/stepForm/Steps";
import { toast } from "sonner";

import axios from "axios";
import { useProperty } from "../../hooks/useProperty";
import { useDashboard } from "../../hooks/useDashboard";

export function EditProperty() {
    const { id } = useParams() // Récupérer l'id de la propriété depuis l'URL
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({})

    const {refreshData} = useDashboard()

    const {getPropertyById, loading, updateProperty} = useProperty()

    const totalSteps = 4

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getPropertyById(id);
                setFormData(data);
            } catch (err) {
                console.error("Erreur lors de la récupération de la propriété :", err);
            }
        };

        fetchProperty();


    }, []);




    const nextStep = (data) => {
        setFormData({ ...formData, ...data });
        currentStep < totalSteps && setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                // Champs de base
                property_name: formData.propertyName,
                type: formData.type,
                property_price: formData.propertyPrice,
                property_description: formData.propertyDescription,
                // Champs numériques
                nombre_chambres: formData.chambre?.number || 0,
                nombre_cuisine: formData.cuisine?.number || 0,
                nombre_salon: formData.salon?.number || 0,
                nombre_douches: formData.douche?.number || 0,
                property_loc: formData.propertyLoc || false,
                // Relations
                property_region: formData.propertyRegion,
                university_name: formData.propertyUniversity,
                // Tags et assets
                tags: formData.selectedTags?.map(tag => tag.id) || [],
                assets: formData.selectedAssets?.map(asset => asset.id) || []
            };
    


            console.log('Données réelles à envoyer:', data);
    
            const response = await axios.put(
                `http://localhost:8000/api/properties/${id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    withCredentials: true,
                    withXSRFToken: true
                }
            );
    

            console.log('Réponse du serveur:', response.data);
            toast.success("Propriété mise à jour avec succès !");
            await refreshData()
            navigate("/owner/dashboard");
    
        } catch (error) {
            console.error('Erreur complète:', error);
            toast.error(error.response?.data?.message || "Une erreur est survenue lors de la mise à jour.");
        }
    };

    if (loading) {
        return <div className="text-center">Chargement des données...</div>;
    }

    return (
        <div className="max-w-[1258px] px-[75px] xl:px-0 mx-auto lg:px-[60px] pt-[33px] flex flex-col items-stretch justify-start">
            <h1 className="text-2xl font-bold text-(--primary-green) mb-4">
                Modifier la propriété
            </h1>
            <Link
                to="/owner/dashboard"
                className="p-2.5 h-[44px] w-fit mt-3 rounded-4xl cursor-pointer text-white bg-(--primary-green) flex items-center justify-center gap-3"
            >
                <i className="fa-solid fa-arrow-left"></i>
                <span>Retour</span>
            </Link>
            <div className="flex items-stretch flex-col justify-start gap-4 mt-12">
                <div className="mt-10">
                    <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                </div>
                <form action="" className="mb-10" onSubmit={handleSubmit}>
                    <div
                        className="form-container px-[30px] py-[20px] h-[700px] lg:h-[590px]"
                        style={{ boxShadow: "0 0 7px rgba(0, 0, 0, .25)" }}
                    >
                        <StepOne
                            currentPage={currentStep}
                            nextStep={nextStep}
                            formData={formData}
                        />
                        <StepTwo
                            currentPage={currentStep}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            formData={formData}
                        />

                        <ImageUploader
                            currentPage={currentStep}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            formData={formData}
                        />

                        <StepFour
                            currentPage={currentStep}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            formData={formData}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}