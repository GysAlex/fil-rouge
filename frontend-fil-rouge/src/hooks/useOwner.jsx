import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

axios.defaults.withCredentials=true
axios.defaults.withXSRFToken=true
axios.defaults.baseURL = 'http://localhost:8000'

// Création du contexte
const OwnerContext = createContext();

// Provider pour le contexte
export function OwnerProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {setUserState} = useAuth()

    const registerOwner = async (ownerData) => {
        setLoading(true);
        setError(null);
        setUserState(undefined)
        try {
            const response = await axios.post(
                "http://localhost:8000/api/owners/register",
                ownerData
            );
            setLoading(false);
            return response.data;
            setUserState(true)
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Une erreur est survenue");
            throw err;
        }
    };

    const loginOwner = async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            await axios.get('/sanctum/csrf-cookie');
            const response = await axios.post(
                "http://localhost:8000/api/owners/login",
                credentials
            );
            setLoading(false);
            return response.data;
            
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Une erreur est survenue");
            throw err;
        }
    };

    const sendVerificationCode = async (verification_code) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/owners/confirm-email",
                verification_code
            );
            setLoading(false);
            console.log(response.data)
            return response.data;
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || "Une erreur est survenue");
            throw err;
        }
    };

    return (
        <OwnerContext.Provider
            value={{
                registerOwner,
                sendVerificationCode,
                loading,
                error,
                loginOwner
            }}
        >
            {children}
        </OwnerContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte
export function useOwner() {
    const context = useContext(OwnerContext);
    if (!context) {
        throw new Error("useOwner doit être utilisé dans un OwnerProvider");
    }
    return context;
}