import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
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
    const [showOnlyPublished, setShowOnlyPublished] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('Tout');

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/owner/dashboard');
            setDashboardData(response.data);
            console.log(response)
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
                    published: showOnlyPublished ? '1' : '0'
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


    const togglePropertyPublished = async (propertyId) => {
        try {
            const response = await axios.put(`/api/properties/${propertyId}/toggle-published`);
            const updatedProperty = response.data;

            // Mettre à jour les données locales
            setDashboardData((prev) => ({
                ...prev,
                logements: prev.logements.map((logement) =>
                    logement.id === propertyId ? updatedProperty : logement
                ),
            }));

            await fetchDashboardData(); // Rafraîchir les données après mise à jour
            // Afficher un toast de succès
            toast.success(
                updatedProperty.published
                    ? "Le logement a été publié avec succès !"
                    : "Le logement a été dépublié avec succès !"
            );
        } catch (err) {
            console.error("Erreur lors de la mise à jour du statut 'published':", err);
            toast.error("Une erreur est survenue lors de la mise à jour du statut.");
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


    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {

        searchProperties()
        
    }, [logementSearchTerm, showOnlyPublished]);

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
        showOnlyPublished, 
        setShowOnlyPublished,
        selectedFilter,
        setSelectedFilter,
        updateContractStatus,
        togglePropertyPublished,
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