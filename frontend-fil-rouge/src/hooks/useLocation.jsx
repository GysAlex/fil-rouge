import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials=true
axios.defaults.withXSRFToken=true

const LocationInfo = createContext();

export function LocationInfoProvider({ children }) {
    const [locations, setLocations] = useState({
        regions: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('/api/regions');


                setLocations({
                    regions: response.data[1],
                    loading: false,
                    error: null
                });

            } catch (error) {
                setLocations({
                    regions: [],
                    loading: false,
                    error: error.message
                });
            }
        };

        fetchLocations();
    }, []);

    // Fonction pour obtenir les universités d'une région spécifique
    const getUniversitiesByRegion = (region_name) => {
        const region = locations.regions.find(r => r.region_name === region_name);
        return region ? region.universities : [];
    };

    const value = {
        regions: locations.regions,
        loading: locations.loading,
        error: locations.error,
        getUniversitiesByRegion
    };

    return (
        <LocationInfo.Provider value={value}>
            {children}
        </LocationInfo.Provider>
    );
}

// Hook personnalisé pour utiliser le context
export function useLocation() {
    const context = useContext(LocationInfo);
    if (!context) {
        throw new Error("useLocation doit être utilisé dans un LocationInfoProvider");
    }
    return context;
}