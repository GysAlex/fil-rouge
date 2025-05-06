import { useState, useEffect, useRef } from "react";
import { SearchInput2 } from "../../components/SearchInput";
import { ButtonModal } from "../../components/Button";
import { useModal } from "../../hooks/useModal";
import axios from "axios";
import { useDashboard } from "../../hooks/useDashboard";

axios.defaults.withXSRFToken = true
axios.defaults.withCredentials = true

export function ContractModal() {
    const [logements, setLogements] = useState([]);
    const [locataires, setLocataires] = useState([]);
    const [selectedLogement, setSelectedLogement] = useState(null);
    const [selectedLocataire, setSelectedLocataire] = useState(null);
    const [duration, setDuration] = useState("");
    const [amount, setAmount] = useState("");

    const { closeModal } = useModal();

    const {refreshData} = useDashboard()

    const getToday = () => new Date().toISOString().split("T")[0];
    const [startDate, setStartDate] = useState(getToday());
    const [endDate, setEndDate] = useState(getToday());
  

      // Calcul automatique de la durée en mois en fonction des dates
      useEffect(() => {
        if (startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
      
          // Calcul du nombre total de mois entre les deux dates
          let diffMonths =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
          if (end.getDate() < start.getDate()) {
            diffMonths--;
          }
      
          if (diffMonths < 12) {
            setDuration(`${diffMonths > 0 ? diffMonths : 0} mois`);
          } else {
            const years = Math.floor(diffMonths / 12);
            const remainingMonths = diffMonths % 12;
            if (remainingMonths > 0) {
              setDuration(`${years} an${years > 1 ? "s" : ""} ${remainingMonths} mois`);
            } else {
              setDuration(`${years} an${years > 1 ? "s" : ""}`);
            }
          }
        }
      }, [startDate, endDate]);

    /*FirstOne*/

    const inputRef = useRef(null);
    const [showLogementSuggestion, setShowLogementSuggestion] = useState(true)

    useEffect(() => {
    const handleOutsideClick = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setShowLogementSuggestion(false);
        }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
    }, [inputRef]);


    const handleOnFocus = () => {
        setShowLogementSuggestion(true); // Afficher les suggestions au focus
    };


    /*FirstSecond*/

    const inputRef2 = useRef(null);
    const [showLocataireSuggestion, setShowLocataireSuggestion] = useState(true)

    useEffect(() => {
    const handleOutsideClick = (event) => {
        if (inputRef2.current && !inputRef2.current.contains(event.target)) {
            setShowLocataireSuggestion(false);
        }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
    }, [inputRef2]);


    const handleLocataireFocus = () => {
        setShowLocataireSuggestion(true); // Afficher les suggestions au focus
    };


    const inputRef3 = useRef(null);
    const [showDurationSuggestion, setShowDurationSuggestion] = useState(true)

    useEffect(() => {
    const handleOutsideClick = (event) => {
        if (inputRef3.current && !inputRef3.current.contains(event.target)) {
            setShowDurationSuggestion(false);
        }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
    }, [inputRef3]);


    const handleDurationFocus = () => {
        setShowDurationSuggestion(true); // Afficher les suggestions au focus
    };





    // Charger les logements
    useEffect(() => {
        const fetchLogements = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/owner/properties", {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                setLogements(response.data.data);
    
            } catch (error) {
                console.error("Erreur lors de la récupération des logements:", error);
                if (error.response?.status === 401) {
                    closeModal();
                }
            }
        };
        fetchLogements();
    }, []);

    // Charger les locataires en fonction du logement sélectionné
    useEffect(() => {
        if (selectedLogement) {
            const fetchLocataires = async () => {
                try {
                    const response = await axios.get(`/api/owner/properties/${selectedLogement}/favorites`);
                    setLocataires(response.data);
                } catch (error) {
                    console.error("Erreur lors de la récupération des locataires:", error);
                }
            };
            fetchLocataires()
        }
    }, [selectedLogement])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/owner/contracts", {
                property_name: selectedLogement,
                user_name: selectedLocataire,         // Remplace locataire_id par user_id
                date_debut: startDate,              // Envoi de la date de début
                date_fin: endDate,                  // Envoi de la date de fin
                prix_location: amount,  
            });
            closeModal()
            refreshData()

        } catch (error) {
            console.error("Erreur lors de la création du contrat:", error);
        }

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-[500px] lg:w-full w-[90%] mx-auto flex ajustContract flex-col items-stretch gap-4 bg-white p-6 rounded-xl"
            style={{ boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)" }}
        >
            <div className="my-4">
                <span className="text-xl text-(--primary-green)">Créer un contrat</span>
                <button
                    onClick={closeModal}
                    type="button"
                    className="cursor-pointer float-right p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center"
                >
                    <i className="fa-solid fa-x text-sm text-red-800"></i>
                </button>
            </div>

            {/* Champ Logement */}
            <div className="flex flex-col gap-2 relative" ref={inputRef}>
                <label className="text-(--title-color)">Logement</label>
                <SearchInput2
                    val={selectedLogement}
                    parentChange={setSelectedLogement}
                    data={logements.map((logement) => logement.property_name)}
                    handleInputFocus={handleOnFocus}
                    showSuggestions={showLogementSuggestion}
                />
            </div>

            {/* Champ Locataire */}
            <div className="flex flex-col gap-2 relative" ref={inputRef2}>
                <label className="text-(--title-color)">Locataire</label>
                <SearchInput2
                    val={selectedLocataire}
                    parentChange={setSelectedLocataire}
                    data={locataires.map((locataire) => locataire.name)}
                    handleInputFocus={handleLocataireFocus}
                    showSuggestions={showLocataireSuggestion}
                />
            </div>

                  {/* Champs Dates */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Date de début */}
                <div className="flex flex-col gap-2 w-full">
                <label className="text-(--title-color)">Date de début</label>
                <input
                    type="date"
                    value={startDate}
                    min={getToday()}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                />
                </div>
                {/* Date de fin */}
                <div className="flex flex-col gap-2 w-full">
                <label className="text-(--title-color)">Date de fin</label>
                <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                />
                </div>
            </div>

            {/* Champ Durée */}
            <div className="flex flex-col gap-2 relative" ref={inputRef3}>
                <label className="text-(--title-color)">Durée</label>
                <SearchInput2
                    val={duration}
                    parentChange={setDuration}
                    data={["06 mois", "1 an", "2 ans", "Autre"]}
                    handleInputFocus={handleDurationFocus}
                    showSuggestions={showDurationSuggestion}
                />
            </div>

            {/* Champ Montant */}
            <div className="flex flex-col gap-2">
                <label className="text-(--title-color)">Montant</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>

            <ButtonModal>
                <span>Valider le contrat</span>
            </ButtonModal>
        </form>
    );
}