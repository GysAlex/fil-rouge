import { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // Importer Sonner pour les toasts

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = "http://localhost:8000";

const HandleUser = createContext();

export const HandleUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const response = await axios.get("/api/user");
            if (response.status === 200) {
                setUser(response.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Une erreur est survenue", error);
            setUser(null);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const updateUser = async (e, userData) => {
        e.preventDefault();

        try {
            const response = await axios.put(`/api/users/${userData.id}`, userData);
            if (response.status === 200) {
                setUser(response.data);
                toast.success("Utilisateur mis à jour avec succès !");
                getUser(); // Actualiser les données utilisateur
            } else {
                console.error("Erreur lors de la mise à jour de l'utilisateur", response.statusText);
                toast.error("Erreur lors de la mise à jour de l'utilisateur.");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur", error);
            toast.error("Une erreur est survenue lors de la mise à jour.");
        }
    };

    const updateProfileImgage = async (e, imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);
        e.preventDefault();

        try {
            const response = await axios.post(`/api/update-profile-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                setUser(response.data);
                toast.success("Image de profil mise à jour avec succès !");
                getUser(); // Actualiser les données utilisateur
            } else {
                console.error("Erreur lors de la mise à jour de l'image de profil", response.statusText);
                toast.error("Erreur lors de la mise à jour de l'image de profil.");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'image de profil", error);
            toast.error("Une erreur est survenue lors de la mise à jour de l'image.");
        }
    };

    return (
        <HandleUser.Provider value={{ updateUser, updateProfileImgage }}>
            {children}
        </HandleUser.Provider>
    );
};

export const useHandleUser = () => {
    return useContext(HandleUser);
};