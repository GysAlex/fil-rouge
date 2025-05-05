import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOwner } from "../../hooks/useOwner"; // Hook pour gérer les requêtes
import { Button } from "../../components/Button";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";

export function OwnerLoginModal() {
    const { closeModal } = useModal();
    const { loginOwner, loading, error } = useOwner();
    const navigate = useNavigate();

    const {setUserState, setRole, setUser} = useAuth()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginOwner(formData);
            closeModal();
            setUserState(true)
            setUser(res.user)
            setRole(res.user.roles.map((el) => el.name))
            //setRole(user.role.map((el) => el.name))
            navigate("/owner/dashboard"); // Redirige vers le tableau de bord après connexion
        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
        }
    };

    return (
        <form
            className="lg:w-[500px] flex flex-col items-stretch gap-6 md:w-[70%] w-[80%] bg-white p-6 rounded-xl"
            style={{ boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)" }}
        >
            <div className="flex justify-between items-center mb-4">
            <span className="text-xl text-(--primary-green)">Se connecter</span>
                <button
                    onClick={closeModal}
                    type="button"
                    className="cursor-pointer float-right p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center"
                >
                    <i className="fa-solid fa-x text-sm text-red-800"></i>
                </button>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm text-gray-600">
                        Adresse email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Entrez votre adresse email"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm text-gray-600">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Entrez votre mot de passe"
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm">
                        {error || "Une erreur est survenue."}
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <Button handleClick={handleSubmit} disabled={loading}>
                    {loading ? "Connexion en cours..." : "Se connecter"}
                </Button>
                <div className="text-start">
                    <span className="text-sm text-gray-600">
                        Vous n'avez pas de compte ?{" "}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            closeModal();
                            navigate("/owner/register");
                        }}
                        className="text-(--primary-green) underline text-sm"
                    >
                        Créez un compte
                    </button>
                </div>
            </div>
        </form>
    );
}