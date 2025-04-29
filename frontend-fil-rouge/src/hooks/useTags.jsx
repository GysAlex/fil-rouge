import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const TagsContext = createContext();

export function TagsProvider({ children }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch tags from API
    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/property-tags');
            setAvailableTags(response.data);
            console.log('Tags récupérés:', response.data);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Erreur lors de la récupération des tags:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    // Ajouter un tag aux tags sélectionnés
    const addTag = (tag) => {
        if (!selectedTags.find(t => t.id === tag.id)) {
            setSelectedTags([...selectedTags, tag]);
            setAvailableTags(availableTags.filter(t => t.id !== tag.id));
        }
    };

    // Supprimer un tag des tags sélectionnés
    const removeTag = (tag) => {
        setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
        setAvailableTags([...availableTags, tag]);
    };

    // Réinitialiser tous les tags
    const resetTags = () => {
        const allTags = [...selectedTags, ...availableTags];
        setSelectedTags([]);
        setAvailableTags(allTags);
    };

    const value = {
        selectedTags,
        availableTags,
        loading,
        error,
        addTag,
        removeTag,
        resetTags
    };

    return (
        <TagsContext.Provider value={value}>
            {children}
        </TagsContext.Provider>
    );
}

// Hook personnalisé pour utiliser le context
export function useTags() {
    const context = useContext(TagsContext);
    if (!context) {
        throw new Error("useTags doit être utilisé dans un TagsProvider");
    }
    return context;
}