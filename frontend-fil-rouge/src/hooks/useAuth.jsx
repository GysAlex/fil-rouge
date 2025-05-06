import { createContext, useContext, useEffect, useState} from "react"
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true


const authContext = createContext()


export function AuthContextProvider({children})
{
    const [user, setUser] = useState(null)

    const [role, setRole] = useState([])

    const [state, setUserState] = useState(undefined)

    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        const checkAuth = async () => {
            try {
                await axios.get('/sanctum/csrf-cookie');
                const response = await axios.get('/api/user');
                console.log(response)

                if (response.status === 200) {
                    setUser(response.data);
                    setRole(response.data.roles.map((el) => el.name))
                    console.log(role)
                    setUserState(true);
                } else {
                    setUserState(false);
                    setUser(null);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'authentification', error);
                setUserState(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth()  
        
    }, [])


    const logout = async () => {
        try {
            await axios.post("/api/logout"); // Appel à l'endpoint de déconnexion
            setUser(null); 
            setRole([]); 
            setUserState(false); 
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };


    return <authContext.Provider value={{user, setUser, loading, logout ,setUserState, state, role, setRole}}>
        {children}
    </authContext.Provider>
}

export const useAuth = ()=>{
    return useContext(authContext)
}