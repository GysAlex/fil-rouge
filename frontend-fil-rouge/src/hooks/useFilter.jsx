import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FilterContext = createContext();

export function FilterProvider({ children }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [advancedFilters, setAdvancedFilters] = useState({
        isColocation: false,
        price: 1000000,
        distance: 5,
        bedrooms: 1,
        bathrooms: 1,
        kitchens: 1,
        livingRooms: 1
    });

    // Récupération des tags
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('/api/property-tags');
                setAvailableTags(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des tags:', error);
            }
        };
        fetchTags();
    }, []);

    // Fonction pour récupérer les propriétés
    const fetchProperties = async (university) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/properties/search/${university}`);
            setProperties(response.data);
            setFilteredProperties(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des propriétés:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Fonction de filtrage sans useCallback
    const applyFilters = (propertiesToFilter) => {
        // Si aucun filtre n'est actif, retourner toutes les propriétés
        const hasActiveTags = selectedTags.length > 0;
        const hasActiveAdvancedFilters = 
            advancedFilters.isColocation ||
            advancedFilters.price < 1000000 ||
            advancedFilters.distance < 20 ||
            advancedFilters.bedrooms > 1 ||
            advancedFilters.bathrooms > 1 ||
            advancedFilters.kitchens > 1 ||
            advancedFilters.livingRooms > 1;
    
        if (!hasActiveTags && !hasActiveAdvancedFilters) {
            setFilteredProperties(propertiesToFilter);
            return propertiesToFilter;
        }
    
        // Sinon, appliquer les filtres
        const filtered = propertiesToFilter.filter(property => {
            // Filtrer par tags
            const matchesTags = !hasActiveTags || selectedTags.every(tag =>
                property.tags.some(propertyTag => propertyTag.id === tag.id)
            );
    
            if (!matchesTags) return false;
    
            // Filtrer par critères avancés si des filtres sont actifs
            console.log(hasActiveAdvancedFilters)
            if (hasActiveAdvancedFilters) {
                const matchesColocation = !advancedFilters.isColocation || property.coloc === true;
                const matchesPrice = property.property_price <= advancedFilters.price;
                const matchesBedrooms = property.nombre_chambres >= advancedFilters.bedrooms;
                const matchesBathrooms = property.nombre_douches >= advancedFilters.bathrooms;
                const matchesKitchens = property.nombre_cuisine >= advancedFilters.kitchens;
                const matchesLivingRooms = property.nombre_salon >= advancedFilters.livingRooms;
    
                return matchesColocation && matchesPrice && matchesBedrooms && matchesBathrooms && matchesKitchens && matchesLivingRooms;
            }
    
            return true;
        });
    
        setFilteredProperties(filtered);
        return filtered;
    };

    // Appliquer les filtres quand les critères changent
    useEffect(() => {
        if (!loading && properties.length > 0) {
            applyFilters(properties);
        }
    }, [selectedTags, advancedFilters, properties, loading]);

    const updateTags = (tags) => {
        setSelectedTags(tags);
    };

    const updateAdvancedFilters = (filters) => {
        setAdvancedFilters(filters);
    };

    return (
        <FilterContext.Provider value={{
            selectedTags,
            advancedFilters,
            availableTags,
            properties,
            filteredProperties,
            loading,
            updateTags,
            updateAdvancedFilters,
            fetchProperties,
            setAvailableTags
        }}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilter = () => useContext(FilterContext);