import {Link, useParams} from "react-router-dom";
import { Home, HomeDyn2 } from "../components/Home";

import {FilterScrollbarWithModal} from "../components/FilterScrollbarWithModal";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HomeSkeleton, HomeSkeleton2 } from "../components/HomeSkeleton";
import axios from 'axios';
import { useFilter } from '../hooks/useFilter';

export function Resultatrecherche() {
    const { filteredProperties, loading, fetchProperties } = useFilter();
    const { university } = useParams();

    useEffect(() => {
        fetchProperties(university).catch(err => {
            toast.error("Une erreur est survenue lors de la récupération des données");
        });
    }, [university]);

    return (
        <div className="flex flex-col items-stretch justify-start">
            <div className="flex items-center lg:px-16 flex-wrap gap-[30px]">
                <FilterScrollbarWithModal/>
            </div>
     
            <div className="flex items-center justify-between flex-wrap gap-[30px] min-h-[300px] mt-9">
                {loading ? (
                    [1, 2, 3, 4, 5, 6].map((index) => <HomeSkeleton2 key={index} />)
                ) : (
                    filteredProperties.map((home, index) => (
                        <HomeDyn2 key={index} highlightTags={true} home={home}/>
                    ))
                )}

                {filteredProperties.length === 0 && !loading && (
                    <div className="w-full flex items-center justify-center flex-col">
                        <img src="/src/assets/error-icon.png" alt="" />
                        <div className="text-red-400 text-xl">Aucun résultat trouvé</div>
                    </div>
                )}
            </div>
        </div>
    );
}