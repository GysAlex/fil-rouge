import { useEffect, useRef, useState } from "react";
import { SearchInput3 } from "../../components/SearchInput";
import { useModal } from "../../hooks/useModal";
import { ButtonModal } from "../../components/Button";
import axios from "axios";

export function SearchModal() {
    const {closeModal} = useModal();
    const inputRef = useRef(null);
    const [showRegionSuggestion, setShowRegionSuggestion] = useState(false);
    const [showUniversitySuggestion, setShowUniversitySuggestion] = useState(false);
    
    const [data, setData] = useState({
        regions: [],
        universitiesByRegion: {}
    });
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/regions');
                
                const regions = [];
                const universitiesByRegion = {};
                response.data[1].forEach(region => {
                    regions.push(region.region_name);
                    universitiesByRegion[region.region_name] = region.universities.map(uni => uni.universitie_name);
                });

                setData({ regions, universitiesByRegion });
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowRegionSuggestion(false);
                setShowUniversitySuggestion(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [inputRef]);

    const handleRegionChange = (value) => {
        setSelectedRegion(value);
        setSelectedUniversity('');
    };

    const handleUniversityChange = (value) => {
        setSelectedUniversity(value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedRegion || selectedUniversity) {
            console.log('Recherche:', { selectedRegion, selectedUniversity });
            closeModal();
        }
    };

    return (
        <form 
            onSubmit={handleSearch}
            className="max-w-[400px] searchModal flex flex-col items-stretch gap-6 md:w-[70%] w-[80%] bg-white mt-[300px] p-4 rounded-xl" 
            style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)"}} 
            ref={inputRef}
        >
            <div className="my-4 flex items-center justify-between">
                <span className="text-xl text-(--title-color)">Rechercher</span>
                <button 
                    onClick={closeModal} 
                    type="button" 
                    className="cursor-pointer p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center" 
                >
                    <i className="fa-solid fa-x text-sm text-red-800"></i>
                </button>
            </div>

            <div className="relative flex-grow sm:flex-grow-0">
                <SearchInput3 
                    handleInputFocus={() => setShowRegionSuggestion(true)}
                    showSuggestions={showRegionSuggestion}
                    label="Région"
                    val={selectedRegion}
                    parentChange={handleRegionChange}
                    data={data.regions}
                    id="region-search-mobile"
                />
            </div>

            <div className="relative flex-grow sm:flex-grow-0">
                <SearchInput3 
                    handleInputFocus={() => setShowUniversitySuggestion(true)}
                    showSuggestions={showUniversitySuggestion}
                    label="Université"
                    val={selectedUniversity}
                    parentChange={handleUniversityChange}
                    data={selectedRegion ? data.universitiesByRegion[selectedRegion] : []}
                    id="university-search-mobile"
                />
            </div>

            <ButtonModal type="submit" disabled={loading}>
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>rechercher</span>
            </ButtonModal>
        </form>
    );
}