import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { useModal } from '../../hooks/useModal';
import { ButtonModal } from '../../components/Button';

// Formate une date en français (ex: "15 mars 2025")
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};

// Calcule la durée du contrat en mois/années à partir de deux dates
const computeDuration = (startStr, endStr) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    let diffMonths = (end.getFullYear() * 12 + end.getMonth()) - (start.getFullYear() * 12 + start.getMonth());
    if (end.getDate() < start.getDate()) {
        diffMonths--;
    }
    if (diffMonths < 12) {
        return `${diffMonths} mois`;
    } else {
        const years = Math.floor(diffMonths / 12);
        const months = diffMonths % 12;
        return months > 0
            ? `${years} an${years > 1 ? 's' : ''} ${months} mois`
            : `${years} an${years > 1 ? 's' : ''}`;
    }
};

export function updateContractModal(locataire) {
    const { updateContractStatus, refreshData } = useDashboard();
    const { closeModal } = useModal();

    // On récupère le premier contrat associé
    const contract = locataire.contracts[0];
    const isResiliated = contract.statut === 'résilié';

    const handleToggleStatus = async (e) => {
        e.preventDefault();
        try {
            if (isResiliated) {
                // Réactiver le contrat, par exemple on passe à "en_cours"
                await updateContractStatus(contract.id, 'en_cours');
                alert("Le contrat a été réactivé avec succès !");
            } else {
                // Résilier le contrat
                await updateContractStatus(contract.id, 'résilié');
                alert("Le contrat a été résilié avec succès !");
            }
            refreshData(); // Actualise les données du dashboard
            closeModal();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du contrat:", error);
        }
    };

    return (
        <form
            onSubmit={(e)=>handleToggleStatus(e)}
            className="max-w-[500px] w-full flex flex-col items-stretch gap-4 bg-white p-6 rounded-xl shadow-md"
        >
            <div className="my-4 flex justify-between items-center">
                <span className="text-(--primary-green) text-[25px]">Détails du Contrat</span>
                <button
                    onClick={closeModal}
                    type="button"
                    className="cursor-pointer float-right p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center"
                    style={{ transform: 'translateY(-5px)' }}
                >
                    <i className="fa-solid fa-x text-sm text-red-800"></i>
                </button>
            </div>

            <div className="flex w-[70%] items-center justify-between gap-2">
                <label className="text-(--title-color) font-medium">Logement</label>
                <div>test</div>
            </div>

            <div className="flex w-[70%] gap-2 items-start justify-between">
                <label className="text-(--title-color) font-medium">Signé le</label>
                <div>{formatDate(locataire.contracts[0].created_at)}</div>
            </div>

            <div className="flex w-[70%] gap-2 items-start justify-between">
                <label className="text-(--title-color) font-medium">Locataire</label>
                <div>{locataire.name}</div>
            </div>

            <div className="flex w-[70%] gap-2 items-start justify-between">
                <label className="text-(--title-color) font-medium">Date de début</label>
                <div>{formatDate(locataire.contracts[0].date_debut)}</div>
            </div>

            <div className="flex w-[70%] gap-2 items-start justify-between">
                <label className="text-(--title-color) font-medium">Date de fin</label>
                <div>{formatDate(locataire.contracts[0].date_fin)}</div>
            </div>

            <div className="flex w-[70%] gap-2 items-start justify-between">
                <label className="text-(--title-color) font-medium">Durée du contrat</label>
                <div>{computeDuration(locataire.contracts[0].date_debut, locataire.contracts[0].date_fin)}</div>
            </div>

            <div className="flex w-[70%] items-start justify-between gap-2">
                <label className="text-(--title-color) font-medium">Statut actuel</label>
                <div
                    className={`px-4 py-1 w-fit rounded-full ms-2 text-sm ${
                        locataire.contracts[0].statut === "en_cours"
                            ? "bg-green-300 text-gray-700"
                            : contract.statut === "à_venir"
                            ? "bg-[#bffee4] text-gray-700"
                            : "bg-red-500 text-gray-700"
                    }`}
                >
                    {locataire.contracts[0].statut}
                </div>
            </div>

            <ButtonModal type="button" onClick={handleToggleStatus}>
                <span>{isResiliated ? "Réactiver le contrat" : "Résilier le contrat"}</span>
            </ButtonModal>
        </form>
    );
}