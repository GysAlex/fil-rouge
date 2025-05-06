import { createContext, useEffect } from "react";

const homeProvider = createContext()


export function homeProvider(university)
{
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([])

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

    useEffect(()=>{  
    const fetchTags = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/property-tags`);
                setTags(response.data);
            } catch (err) {
                console.error(err);
                console.log(tags)
                toast.error("une erreur est survenu lors de la récupération des données")
            } finally {
                setLoading(false);
            }
        };

        fetchTags()
    }, [])
}