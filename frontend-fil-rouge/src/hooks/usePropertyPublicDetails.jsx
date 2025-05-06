import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

axios.defaults.withCredentials=true
axios.defaults.withXSRFToken=true

export function usePropertyPublicDetails(propertyId) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [propertyData, setPropertyData] = useState({
        property: null,
        owner: null,
        university: null
    });

    const fetchPropertyDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/properties/${propertyId}/details`);
            setPropertyData(response.data.data);
            console.log(response.data.data.property)
            setError(null);
        } catch (err) {
            console.error('Erreur:', err);
            setError(err.response?.data?.message || 'Une erreur est survenue');
            toast.error("Erreur lors du chargement des détails");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (propertyId) {
            fetchPropertyDetails();
        }
    }, [propertyId]);

    return {
        ...propertyData,
        loading,
        error,
        refreshData: fetchPropertyDetails
    };
}