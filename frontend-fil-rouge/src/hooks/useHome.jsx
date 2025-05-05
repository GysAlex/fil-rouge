import { useState, useEffect } from 'react';
import axios from 'axios';


axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

export const useHome = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHomeData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8000/api/home', {
                withCredentials: true
            });

            await new Promise(resolve => setTimeout(resolve, 2000));
            if (response.data.status === 'success') {
                setUniversities(response.data.data);
                setError(null);
            } else {
                throw new Error('Données invalides reçues du serveur');
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
            console.error('Erreur chargement données homepage:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeData();
    }, []);

    const refresh = () => {
        fetchHomeData();
    };

    return {
        universities,
        loading,
        error,
        refresh
    };
};