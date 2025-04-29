import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AssetContext = createContext();

export function AssetProvider({ children }) {
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [availableAssets, setAvailableAssets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch assets from API
    const fetchAssets = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/assets');
            setAvailableAssets(response.data.assets);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Erreur lors de la récupération des assets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    // Toggle asset selection
    const toggleAsset = (asset) => {
        if (isAssetSelected(asset.id)) {
            setSelectedAssets(selectedAssets.filter(a => a.id !== asset.id));
        } else {
            setSelectedAssets([...selectedAssets, asset]);
        }
    };

    // Check if asset is selected
    const isAssetSelected = (assetId) => {
        return selectedAssets.some(asset => asset.id === assetId);
    };

    // Reset all selections
    const resetAssets = () => {
        setSelectedAssets([]);
    };

    const value = {
        selectedAssets,
        availableAssets,
        loading,
        error,
        toggleAsset,
        isAssetSelected,
        resetAssets
    };

    return (
        <AssetContext.Provider value={value}>
            {children}
        </AssetContext.Provider>
    );
}

// Hook personnalisé pour utiliser le context
export function useAsset() {
    const context = useContext(AssetContext);
    if (!context) {
        throw new Error("useAsset doit être utilisé dans un AssetProvider");
    }
    return context;
}