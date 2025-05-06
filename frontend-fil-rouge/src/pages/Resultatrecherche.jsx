import {Link, useParams} from "react-router-dom";
import { Tags } from "../components/Tags";
import { Home, HomeDyn2 } from "../components/Home";
import { DependHome } from "../components/Home";
import { DependHome2 } from "../components/Home";
import {FilterScrollbarWithModal} from "../components/FilterScrollbarWithModal";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HomeSkeleton, HomeSkeleton2 } from "../components/HomeSkeleton";
import axios from 'axios';

export function Resultatrecherche() {

    const { region, university } = useParams();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/properties/search/${university}`);
                setProperties(response.data);
            } catch (err) {
                console.error(err);
                toast.error("une erreur est survenu lors de la récupération des données")
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);
    
    return <>
        <div className="flex flex-col items-stretch justify-start">
            <div className="flex items-center  lg:px-16 flex-wrap gap-[30px]">
                <FilterScrollbarWithModal/>
            </div>
     
        <div className="flex items-center justify-between flex-wrap gap-[30px] mt-9">
            {loading ? [1, 2, 3, 4, 5, 6].map((index) => <HomeSkeleton2 key={index} />) : 
            
                properties.map((home, index) => <HomeDyn2 key={index} home={home}/>)
            } 
        </div>
    </div>    
    </>
}