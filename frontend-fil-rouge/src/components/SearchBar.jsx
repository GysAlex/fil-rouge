import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { SearchInput3 } from "./SearchInput";
import axios from "axios";

export function SearchBar() {
    const inputRef = useRef(null);
    const [showCountriesSuggestion, setShowCountriesSuggestion] = useState(false);
    const [showUniversitiesSuggestion, setShowUniversitiesSuggestion] = useState(false);
    
    // États pour les données
    const [data, setData] = useState({
        regions: [],
        universitiesByRegion: {}
    });
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [loading, setLoading] = useState(false);

    // Récupérer toutes les données en une seule requête
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/regions');
                
                // Structurer les données pour un accès facile
                const regions = [];
                const universitiesByRegion = {};
                response.data[1].forEach(region => {
                    regions.push(region.region_name);
                    universitiesByRegion[region.region_name] = region.universities.map(uni => uni.universitie_name);
                });

                setData({ regions, universitiesByRegion });
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Gestionnaire de clic extérieur
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowCountriesSuggestion(false);
                setShowUniversitiesSuggestion(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [inputRef]);

    // Gestionnaires d'événements
    const handleRegionChange = (value) => {
        setSelectedRegion(value);
        setSelectedUniversity(''); // Réinitialiser l'université sélectionnée
    };

    const handleUniversityChange = (value) => {
        setSelectedUniversity(value);
    };

    const handleSearch = () => {
        if (selectedRegion || selectedUniversity) {
            // Implémenter la logique de recherche
            console.log('Recherche avec:', { selectedRegion, selectedUniversity });
        }
    };

    return (
        <div className="bg-white hidden z-20 search relative py-5 px-10 h-fit min-h-[80px] gap-[30px] rounded-full md:flex items-center justify-center" 
             style={{boxShadow: "0 0 7px rgba(0, 0, 0, .25)"}} 
             ref={inputRef}>
            <div className="w-[210px] z-100 relative flex-grow sm:flex-grow-0">
                <SearchInput3
                    handleInputFocus={() => setShowCountriesSuggestion(true)}
                    showSuggestions={showCountriesSuggestion}
                    label="Régions"
                    val={selectedRegion}
                    parentChange={handleRegionChange}
                    data={data.regions}
                    id="region-search"
                />
            </div>

            <div className="h-[30px] w-[2px] bg-(--primary-green)" />

            <div className="w-[210px] z-100 relative flex-grow sm:flex-grow-0">
                <SearchInput3
                    handleInputFocus={() => setShowUniversitiesSuggestion(true)}
                    showSuggestions={showUniversitiesSuggestion}
                    label="Universités"
                    val={selectedUniversity}
                    parentChange={handleUniversityChange}
                    data={selectedRegion ? data.universitiesByRegion[selectedRegion] : []}
                    id="university-search"
                />
            </div>

            <Button onClick={handleSearch} disabled={loading}>
                <i className="fa-solid fa-magnifying-glass" />
                <span>rechercher</span>
            </Button>
        </div>
    );
}