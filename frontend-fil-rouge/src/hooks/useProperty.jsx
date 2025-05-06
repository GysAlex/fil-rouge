import { createContext, useContext, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials=true
axios.defaults.withXSRFToken=true

const PropertyContext = createContext();

export function PropertyProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createProperty = async (propertyData) => {
        setLoading(true);
        setError(null);

        console.log(propertyData.chambre.number)

        const formData = new FormData();

        // Ajouter les informations de base
        formData.append('property_name', propertyData.propertyName);
        formData.append('type', propertyData.propertyType);
        formData.append('property_region', propertyData.propertyRegion);
        formData.append('property_price', propertyData.propertyPrice);
        formData.append('university_id', propertyData.propertyUniversity);
        formData.append('property_description', propertyData.propertyDescription);
        formData.append('property_loc', propertyData.propertyLoc);
        formData.append('nombre_chambres', propertyData.chambre.number)
        formData.append('nombre_cuisine', propertyData.cuisine.number)
        formData.append('nombre_salon', propertyData.salon.number)
        formData.append('nombre_douches', propertyData.douche.number)


        // Ajouter l'image principale
        if (propertyData.mainImageFile) {
            formData.append('main_image', propertyData.mainImageFile);
        }

        // Ajouter les images secondaires
        if (propertyData.secondaryImageFiles) {
            Object.values(propertyData.secondaryImageFiles).forEach((file, index) => {
                formData.append(`secondary_images[${index}]`, file);
            });
        }

        // Ajouter les tags
        if (propertyData.selectedTags) {
            propertyData.selectedTags.forEach((tag, index) => {
                formData.append(`tags[${index}]`, tag.id);
            });
        }

        // Ajouter les assets
        if (propertyData.selectedAssets) {
            propertyData.selectedAssets.forEach((asset, index) => {
                formData.append(`assets[${index}]`, asset.id);
            });
        }

        try {
            const response = await axios.post('/api/properties', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
            setLoading(false);
            throw err;
        }
    };

    const updateProperty = async (propertyId, propertyData) => {
        setLoading(true);
        setError(null);
    
        const formData = new FormData();
    
        // Ajouter les informations de base
        console.log(propertyData.propertyName, propertyData.propertyType )
        formData.append('property_name', propertyData.propertyName);
        formData.append('type', propertyData.propertyType);
        formData.append('property_region', propertyData.propertyRegion);
        formData.append('property_price', propertyData.propertyPrice);
        formData.append('university_id', propertyData.propertyUniversity);
        formData.append('property_description', propertyData.propertyDescription);
        formData.append('property_loc', propertyData.coloc);
        formData.append('nombre_chambres', propertyData.chambre.number);
        formData.append('nombre_cuisine', propertyData.cuisine.number);
        formData.append('nombre_salon', propertyData.salon.number);
        formData.append('nombre_douches', propertyData.douche.number);
    
        // Ajouter l'image principale
        if (propertyData.mainImageFile) {
            formData.append('main_image', propertyData.mainImageFile);
        }
    
        // Ajouter les images secondaires
        if (propertyData.secondaryImageFiles) {
            Object.values(propertyData.secondaryImageFiles).forEach((file, index) => {
                formData.append(`secondary_images[${index}]`, file);
            });
        }
    
        // Ajouter les tags
        if (propertyData.selectedTags) {
            propertyData.selectedTags.forEach((tag, index) => {
                formData.append(`tags[${index}]`, tag.id);
            });
        }
    
        // Ajouter les assets
        if (propertyData.selectedAssets) {
            propertyData.selectedAssets.forEach((asset, index) => {
                formData.append(`assets[${index}]`, asset.id);
            });
        }
    

        for (let pair of formData.entries()) {
            console.log('FormData contient:', pair[0], pair[1]);
        }

        try {
            const response = await axios.patch(`http://localhost:8000/api/properties/${propertyId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                },
            });
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
            setLoading(false);
            throw err;
        }
    };

    const getPropertyById = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`/api/properties/${id}`);
            setLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Une erreur est survenue");
            setLoading(false);
            throw err;
        }
    };

    const value = {
        createProperty,
        loading,
        updateProperty,
        getPropertyById,
        error
    };

    return (
        <PropertyContext.Provider value={value}>
            {children}
        </PropertyContext.Provider>
    );
}

export function useProperty() {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error("useProperty doit être utilisé dans un PropertyProvider");
    }
    return context;
}