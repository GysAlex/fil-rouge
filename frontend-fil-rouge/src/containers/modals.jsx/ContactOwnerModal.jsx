import { useEffect, useRef, useState } from 'react';
import { SearchInput3 } from '../../components/SearchInput';
import { useModal } from '../../hooks/useModal';
import { toast } from 'sonner';
import axios from 'axios';

export function ContactOwnerModal(property) {
    const [subject, setSubject] = useState('');
    const [visitDateTime, setVisitDateTime] = useState('');
    const [offerAmount, setOfferAmount] = useState('');
    const [details, setDetails] = useState('');
    const inputRef = useRef(null);
    
    const [showSubjectSuggestion, setShowSubjectSuggestion] = useState(false);


    const subjects = ["Demander une visite", "Faire une offre"];

    const handleSubjectChange = (value) => {
        setSubject(value);
        // Réinitialiser les autres champs
        setVisitDateTime('');
        setOfferAmount('');
        setDetails('');
    };

    const { closeModal } = useModal();



    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSubjectSuggestion(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [inputRef]);

    console.log(property)


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                property_id: property.id,
                subject,
                ...(subject === "Demander une visite" ? { visit_datetime: visitDateTime } : {}),
                ...(subject === "Faire une offre" ? { 
                    offer_amount: offerAmount,
                    details: details 
                } : {})
            };

            await axios.post('/api/contact-owner', payload);
            toast.success("Votre message a été envoyé avec succès");
            closeModal();
        } catch (error) {
            toast.error("Une erreur est survenue lors de l'envoi du message");
        }
    };


    return (
        <form 
            onSubmit={handleSubmit}
            className="max-w-[500px] searchModal flex flex-col items-stretch gap-6 md:w-[70%] w-[80%] bg-white mt-[300px] p-4 rounded-xl" 
            style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)"}}
        >
            <div className="my-4 flex items-center justify-between">
                <span className="text-xl text-(--title-color)">Contacter le propriétaire</span>
                <button 
                    onClick={closeModal}
                    type="button"
                    className="cursor-pointer p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center"
                >
                    <i className="fa-solid fa-x text-sm text-red-800"></i>
                </button>
            </div>

            <div className="relative flex-grow sm:flex-grow-0" ref={inputRef}>
                <SearchInput3
                    label="Objet"
                    val={subject}
                    parentChange={handleSubjectChange}
                    data={subjects}
                    handleInputFocus={() => setShowSubjectSuggestion(true)}
                    showSuggestions={showSubjectSuggestion}
                    id="subject-input"
                />
            </div>

            {subject === "Demander une visite" && (
                <div className="relative flex-grow sm:flex-grow-0">
                    <input
                        type="datetime-local"
                        value={visitDateTime}
                        onChange={(e) => setVisitDateTime(e.target.value)}
                        className="w-full px-[10px] h-[40px] border border-(--light-green2) rounded"
                    />
                </div>
            )}

            {subject === "Faire une offre" && (
                <>
                    <div className="relative flex-grow sm:flex-grow-0">
                        <input
                            type="number"
                            value={offerAmount}
                            onChange={(e) => setOfferAmount(e.target.value)}
                            placeholder="Montant proposé"
                            className="w-full px-[10px] h-[40px] border border-(--light-green2) rounded"
                        />
                    </div>
                    <div className="relative flex-grow sm:flex-grow-0">
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Détails supplémentaires"
                            className="w-full px-[10px] py-2 border border-(--light-green2) rounded min-h-[100px]"
                        />
                    </div>
                </>
            )}

            <button 
                type="submit"
                className="w-full h-[40px] bg-(--primary-green) text-white rounded-xl hover:bg-green-600"
            >
                Envoyer
            </button>
        </form>
    );
}