import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
    const [dashboardData, setDashboardData] = useState({
        logements: [],
        locataires: [],
        stats: {
            totalLogements: 0,
            totalLocataires: 0,
            contratsActifs: 0,
            contratsTermines: 0
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filtres
    const [logementSearchTerm, setLogementSearchTerm] = useState('');
    const [locataireSearchTerm, setLocataireSearchTerm] = useState('');
    const [showOnlyOnline, setShowOnlyOnline] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Tout');

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/owner/dashboard');
            setDashboardData(response.data);
            console.log(response.data.logements)
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Erreur lors de la récupération des données:', err);
        } finally {
            setLoading(false);
        }
    };

    // Recherche de logements
    const searchProperties = async () => {
        try {
            const response = await axios.get('/api/owner/search/properties', {
                params: {
                    search: logementSearchTerm,
                    status: showOnlyOnline ? 'online' : undefined
                }
            });
            console.log(response.data)
            setDashboardData(prev => ({
                ...prev,
                logements: response.data
            }));
            console.log(dashboardData)
        } catch (err) {
            console.error('Erreur lors de la recherche:', err);
        }
    };

    // Recherche de locataires
    const searchTenants = async () => {
        try {
            const response = await axios.get('/api/owner/search/tenants', {
                params: {
                    search: locataireSearchTerm,
                    contract_status: selectedFilter !== 'Tout' ? selectedFilter : undefined
                }
            });
            setDashboardData(prev => ({
                ...prev,
                locataires: response.data
            }));
        } catch (err) {
            console.error('Erreur lors de la recherche:', err);
        }
    };

    // Mise à jour du statut d'un contrat
    const updateContractStatus = async (contractId, newStatus) => {
        try {
            await axios.put(`/api/owner/contracts/${contractId}/status`, { status: newStatus });
            await fetchDashboardData(); // Rafraîchir les données après mise à jour
        } catch (err) {
            console.error('Erreur lors de la mise à jour du statut du contrat:', err);
        }
    };

    // Mise à jour du statut d'un logement
    const updatePropertyStatus = async (propertyId, status) => {
        try {
            await axios.put(`/api/owner/properties/${propertyId}/status`, { status });
            await fetchDashboardData(); // Rafraîchir les données
        } catch (err) {
            console.error('Erreur lors de la mise à jour:', err);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {

        searchProperties()
        
    }, [logementSearchTerm, showOnlyOnline]);

    useEffect(() => {
        if (locataireSearchTerm || selectedFilter !== 'Tout') {
            searchTenants();
        }
    }, [locataireSearchTerm, selectedFilter]);

    const value = {
        ...dashboardData,
        loading,
        error,
        logementSearchTerm,
        setLogementSearchTerm,
        locataireSearchTerm,
        setLocataireSearchTerm,
        showOnlyOnline,
        setShowOnlyOnline,
        selectedFilter,
        setSelectedFilter,
        updateContractStatus,
        updatePropertyStatus,
        refreshData: fetchDashboardData
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard doit être utilisé dans un DashboardProvider');
    }
    return context;
}