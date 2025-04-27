import { createContext, use, useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials=true
axios.defaults.withXSRFToken=true
axios.defaults.baseURL='http://localhost:8000'

const HandleUser = createContext();


export const HandleUserProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get('/api/user');
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Une erreur est survenu', error);
                setUser(null);
            }
        };

        getUser();
    }, []);

    const updateUser = async (e, userData) => {

        e.preventDefault()
        console.log(userData)

        try {
            const response = await axios.put(`/api/users/${userData.id}`, userData);
            if (response.status === 200) {
                setUser(response.data);
                console.log('Utilisateur mis à jour avec succès', response.data);
            } else {
                console.error('Erreur lors de la mise à jour de l\'utilisateur', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
    }

    return (
        <HandleUser.Provider value={{updateUser}}>
            {children}
        </HandleUser.Provider>
    )
}

export const useHandleUser = () => {
    return useContext(HandleUser);
}
