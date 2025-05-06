import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export function usePropertyDetails(propertyId) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [propertyData, setPropertyData] = useState({
        stats: {
            totalTenants: 0,
            totalFavorites: 0,
            totalRevenue: 0,
            tenantsTrend: 0,
            favoritesTrend: 0
        },
        tenants: [],
        prospects: []
    });

    const fetchPropertyDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/owner/properties/${propertyId}/details`, {
                withCredentials: true
            });
            setPropertyData(response.data.data);
            setError(null);
        } catch (err) {
            console.error('Erreur:', err);
            setError(err.response?.data?.message || 'Une erreur est survenue');
            toast.error("Erreur lors du chargement des détails");
        } finally {
            setLoading(false);
        }
    };

    const createContract = async (data) => {
        try {
            await axios.post(`/api/owner/properties/${propertyId}/contracts`, data, {
                withCredentials: true
            });
            toast.success("Contrat créé avec succès");
            await fetchPropertyDetails();
        } catch (err) {
            console.error('Erreur:', err);
            toast.error(err.response?.data?.message || "Erreur lors de la création du contrat");
        }
    };

    const sendNotification = async (userIds) => {
        try {
            await axios.post(`/api/owner/properties/${propertyId}/notify`, {
                users: userIds
            }, {
                withCredentials: true
            });
            toast.success("Notification envoyée avec succès");
        } catch (err) {
            console.error('Erreur:', err);
            toast.error("Erreur lors de l'envoi de la notification");
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
        createContract,
        sendNotification,
        refreshData: fetchPropertyDetails
    };
}