import { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import "./advancedFilterStyle.css";
import { useFilter } from '../hooks/useFilter';

export function AdvancedFilter({ isOpen, onClose }) {
    const { advancedFilters, updateAdvancedFilters } = useFilter();
    const [filters, setFilters] = useState({
        isColocation: false,
        price: 1000000,
        distance: 5,
        bedrooms: 1,
        bathrooms: 1,
        kitchens: 1,
        livingRooms: 1
    });

    // Synchroniser les filtres locaux avec les filtres globaux
    useEffect(() => {
        setFilters(advancedFilters);
    }, [advancedFilters]);

    const handleChange = (name, value) => {
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        updateAdvancedFilters(newFilters);
    };

    const handleIncrement = (field) => {
        const maxValues = {
            bedrooms: 10,
            bathrooms: 5,
            kitchens: 3,
            livingRooms: 3
        };

        if (filters[field] < maxValues[field]) {
            handleChange(field, filters[field] + 1);
        }
    };

    const handleDecrement = (field) => {
        if (filters[field] > 1) {
            handleChange(field, filters[field] - 1);
        }
    };

    const CounterButton = ({ field, label }) => (
        <div className="mb-6">
            <label className="block mb-2">{label}</label>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => handleDecrement(field)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 
                    flex items-center justify-center transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={filters[field] <= 1}
                >
                    <Minus className="w-4 h-4 text-[#374151]" />
                </button>
                
                <span className="w-10 text-center text-lg">{filters[field]}</span>
                
                <button
                    type="button"
                    onClick={() => handleIncrement(field)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 
                    flex items-center justify-center transition-colors"
                >
                    <Plus className="w-4 h-4 text-[#374151]" />
                </button>
            </div>
        </div>
    );

    return (
        <div className={`fixed right-0 top-0 h-full w-[400px] bg-white shadow-lg 
            transform transition-transform duration-300 ease-in-out z-50
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            <div className="p-6 overflow-y-auto h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold text-[#374151]">Filtre avancé</h2>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-[#374151]" />
                    </button>
                </div>

                {/* Colocation Filter */}
                <div className="mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.isColocation}
                            onChange={(e) => handleChange('isColocation', e.target.checked)}
                            className="w-4 h-4 accent-[#10B981] checkbox-custom"
                        />
                        <span>Disponible en colocation</span>
                    </label>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <label className="block mb-2">
                        Prix maximum: {filters.price.toLocaleString('fr-FR')} FCFA
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1000000"
                        value={filters.price}
                        onChange={(e) => handleChange('price', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Distance Range */}
                <div className="mb-6">
                    <label className="block mb-2">
                        Distance maximum: {filters.distance}km
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={filters.distance}
                        onChange={(e) => handleChange('distance', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Counter buttons for rooms */}
                <CounterButton field="bedrooms" label="Nombre de chambres" />
                <CounterButton field="bathrooms" label="Nombre de salles de bain" />
                <CounterButton field="kitchens" label="Nombre de cuisines" />
                <CounterButton field="livingRooms" label="Nombre de salons" />
            </div>
        </div>
    );
}