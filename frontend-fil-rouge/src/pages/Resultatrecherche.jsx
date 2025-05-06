import {Link, useParams} from "react-router-dom";
import { Tags } from "../components/Tags";
import { Home } from "../components/Home";
import { DependHome } from "../components/Home";
import { DependHome2 } from "../components/Home";
import {FilterScrollbarWithModal} from "../components/FilterScrollbarWithModal";
import { useEffect, useState, useReducer } from "react";
import { filterReducer, setFilter, toggleFilter, resetFilters } from "../reducers/filterReducer";

export function Resultatrecherche() {
    const { region, university } = useParams();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [state, dispatch] = useReducer(filterReducer, {
        filters: {
            meuble: false,
            minPrice: 0,
            maxPrice: 2000,
            studio: false,
            t1: false,
            t2: false,
            t3: false,
            distance: 10,
            chambreSimple: false,
            colocation: false,
            appartement: false,
            autre: false
        },
        activeFilters: []
    });

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/properties/search/${region}/${university}`);
                setProperties(response.data);
                setFilteredProperties(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [region, university]);

    // Effet pour filtrer les propriétés quand les filtres changent
    useEffect(() => {
        const filtered = properties.filter(property => {
            // Filtre par prix
            if (property.price < state.filters.minPrice || property.price > state.filters.maxPrice) {
                return false;
            }

            // Filtre par type de logement
            if (state.filters.studio && property.type !== 'studio') return false;
            if (state.filters.t1 && property.type !== 't1') return false;
            if (state.filters.t2 && property.type !== 't2') return false;
            if (state.filters.t3 && property.type !== 't3') return false;

            // Filtre par meublé
            if (state.filters.meuble && !property.isFurnished) return false;

            // Filtre par distance
            if (property.distance > state.filters.distance) return false;

            // Filtre par type de logement spécifique
            if (state.filters.chambreSimple && property.type !== 'chambreSimple') return false;
            if (state.filters.colocation && property.type !== 'colocation') return false;
            if (state.filters.appartement && property.type !== 'appartement') return false;
            if (state.filters.autre && property.type !== 'autre') return false;

            return true;
        });

        setFilteredProperties(filtered);
    }, [state.filters, properties]);

    const handleFilterChange = (filterType, value) => {
        dispatch(setFilter(filterType, value));
    };

    const handleFilterToggle = (filterType) => {
        dispatch(toggleFilter(filterType));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };
    
    return <>
        <div className="flex flex-col items-stretch justify-start">
            <div className="flex items-center lg:px-16 flex-wrap gap-[30px]">
                <FilterScrollbarWithModal 
                    filters={state.filters}
                    onFilterChange={handleFilterChange}
                    onFilterToggle={handleFilterToggle}
                    onResetFilters={handleResetFilters}
                />
            </div>
     
            <div className="flex items-center justify-between flex-wrap gap-[30px] mt-5">
                {filteredProperties.map((property, index) => (
                    <DependHome 
                        key={property.id || index}
                        img={property.image || `http://localhost:5173/images/g${(index % 6) + 1}.jpg`}
                    />
                ))}
            </div>
        </div>    
    </>
}