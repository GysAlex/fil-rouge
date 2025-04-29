import { useState } from "react";
import { Link } from "react-router-dom";

export function DashboardAdmin() {
  const [logements, setLogements] = useState([
    {
      id: 1,
      nom: "Mon appart",
      dateCreation: "13 Oct 2023",
      locataires: 5,
      status: "actif",
      image: "/images/appart1.jpg",
    },
    {
      id: 2,
      nom: "Mon appart",
      dateCreation: "13 Oct 2023",
      locataires: 5,
      status: "actif",
      image: "/images/appart2.jpg",
    },
    {
      id: 3,
      nom: "Mon appart",
      dateCreation: "13 Oct 2023",
      locataires: 5,
      status: "actif",
      image: "/images/appart3.jpg",
    },
  ]);

  const [locataires, setLocataires] = useState([
    {
      id: 1,
      nom: "John Doe",
      duree: "1 ans",
      etat: "actif",
      email: "mon@email.com",
      image: "/images/avatar1.jpg",
    },
    {
      id: 2,
      nom: "Jane Smith",
      duree: "2 ans",
      etat: "résilié",
      email: "mon@email.com",
      image: "/images/avatar1.jpg",
    },
    {
      id: 3,
      nom: "Robert Brown",
      duree: "6 mois",
      etat: "actif",
      email: "mon@email.com",
      image: "/images/avatar1.jpg",
    },
    {
      id: 4,
      nom: "Sarah Wilson",
      duree: "1 mois",
      etat: "actif",
      email: "mon@email.com",
      image: "/images/avatar1.jpg",
    },
  ]);

  const [logementSearchTerm, setLogementSearchTerm] = useState("");
  const [locataireSearchTerm, setLocataireSearchTerm] = useState("");
  const [showOnlyOnline, setShowOnlyOnline] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Tout");

  // Gestion des recherches et filtres
  const filteredLogements = logements.filter(
    (logement) =>
      logement.nom.toLowerCase().includes(logementSearchTerm.toLowerCase()) &&
      (!showOnlyOnline || logement.status === "actif")
  );

  const filteredLocataires = locataires.filter(
    (locataire) =>
      locataire.nom.toLowerCase().includes(locataireSearchTerm.toLowerCase()) &&
      (selectedFilter === "Tout" ||
        (selectedFilter === "actif" && locataire.etat === "actif"))
  );

  // Fonctions pour ajouter de nouveaux éléments
  const ajouterLogement = () => {
    const newId = logements.length + 1;
    const newLogement = {
      id: newId,
      nom: "Nouveau logement",
      dateCreation: new Date().toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      locataires: 0,
      status: "actif",
      image: "/images/default-home.jpg",
    };
    setLogements([...logements, newLogement]);
    alert("Nouveau logement ajouté");
  };

  const ajouterLocataire = () => {
    const newId = locataires.length + 1;
    const newLocataire = {
      id: newId,
      nom: "Nouveau locataire",
      duree: "Non défini",
      etat: "actif",
      email: "nouveau@email.com",
      image: "/images/default-avatar.jpg",
    };
    setLocataires([...locataires, newLocataire]);
    alert("Nouveau locataire ajouté");
  };

  // Fonction pour mettre à jour les informations
  const updateLogementInfo = (id) => {
    alert(`Mise à jour des informations pour le logement ID: ${id}`);
    // Ici, vous pourriez ouvrir un modal avec un formulaire
  };

  // Calcul des statistiques
  const totalLogements = logements.length;
  const totalLocataires = locataires.length;
  const contratsActifs = locataires.filter((l) => l.etat === "actif").length;
  const contratsTermines = locataires.filter(
    (l) => l.etat === "résilié"
  ).length;

  return (
    <div className="px-4 ms-10 mx-auto lg:ms-0 sm:px-6 lg:px-[75px]  sm:mx-auto pt-[33px] flex flex-col items-stretch md:justify-start justify-center">
      <div className="p-4 sm:p-6 w-full mx-auto">
        <h2 className="text-(--primary-green)  mb-1">Dashboard propriétaire</h2>
        <h1 className="text-[28px] mb-6">Vue d'ensemble</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Nombre total de logements */}
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="fa-solid fa-building text-xl text-(--primary-green)"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Nombre total de logements</p>
              <p className="text-2xl font-bold text-green-500">
                {totalLogements.toString().padStart(2, "0")}{" "}
                <span className="text-sm font-normal">Logements</span>
              </p>
            </div>
          </div>

          {/* Total des Locataires */}
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="fa-solid fa-user text-(--primary-green)"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total des Locataires</p>
              <p className="text-2xl font-bold text-green-500">
                {totalLocataires.toString().padStart(2, "0")}{" "}
                <span className="text-sm font-normal">Locataires</span>
              </p>
            </div>
          </div>

          {/* Graphique des contrats */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${
                        (contratsActifs / (contratsActifs + contratsTermines)) *
                        100
                      }, 100`}
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="3"
                      strokeDasharray={`${
                        (contratsTermines /
                          (contratsActifs + contratsTermines)) *
                        100
                      }, 100`}
                      strokeDashoffset={`-${
                        (contratsActifs / (contratsActifs + contratsTermines)) *
                        100
                      }`}
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">
                    {contratsActifs + contratsTermines}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <div className="mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Contrats actifs</span>
                  </div>
                  <p className="font-bold text-blue-500">{contratsActifs}</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <span className="text-sm">Contrats terminés</span>
                  </div>
                  <p className="font-bold text-yellow-400">
                    {contratsTermines}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Mes logements */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Mes logements</h2>
            <Link
            to="/owner/new-home"
              className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center text-sm hover:bg-green-600 transition-colors"
            >
              <i className="fa-solid fa-plus text-(primary-green)"></i> Ajouter
              un logement
            </Link>
          </div>

          <div
            className="bg-white p-4 rounded-lg"
            style={{ boxShadow: "0 0 7px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex justify-between items-center">
              <div className="text-gray-600">Logements</div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
                <div className="w-full relative sm:w-auto">
                  <i className="fa-solid fa-magnifying-glass text-xl text-(--primary-green) top-3 left-5 absolute"></i>
                  <input
                    type="text"
                    placeholder="Rechercher logement..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 mx-3 border border-gray-300 rounded-lg"
                    value={logementSearchTerm}
                    onChange={(e) => setLogementSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="mr-2 text-sm text-gray-600">en ligne</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={showOnlyOnline}
                      className="checkbox-custom"
                      onChange={() => setShowOnlyOnline(!showOnlyOnline)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-5 gap-4 my-3 text-sm text-gray-500 pb-2">
              <div>Nom du logement</div>
              <div>Créer le</div>
              <div>locataires</div>
              <div>status</div>
              <div></div>
            </div>

            {filteredLogements.map((logement) => (
              <div
                key={logement.id}
                className="flex flex-col md:grid md:grid-cols-5 gap-4 py-4 items-center border-b md:border-0"
              >
                <div className="flex items-center w-full md:w-auto">
                  <img
                    src={logement.image}
                    alt={logement.nom}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <span className="font-medium">{logement.nom}</span>
                </div>
                <div className="w-full md:w-auto text-center md:text-left">
                  <span className="md:hidden font-medium mr-2">Créé le:</span>
                  {logement.dateCreation}
                </div>
                <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                  <i className="fa-solid fa-users text-green-500 mr-2" />
                  <span>{logement.locataires}</span>
                </div>
                <div className="w-full md:w-auto text-center">
                  <button className="cursor-pointer items-center justify-center flex gap-2">
                    <i className="fa-solid fa-chart-line text-(--primary-green)" />
                    <span>stats</span>
                  </button>
                </div>
                <div className="w-full md:w-auto text-center">
                  <button
                    onClick={() => updateLogementInfo(logement.id)}
                    className="w-full md:w-auto border border-green-500 text-green-500 rounded-full px-4 py-2 text-sm hover:bg-green-50 transition-colors"
                  >
                    mettre à jour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Locataires */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Locataires</h2>
            <button
              onClick={ajouterLocataire}
              className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center text-sm hover:bg-green-600 transition-colors"
            >
              <i className="mr-2 fa-solid fa-plus" /> Ajouter un locataire
            </button>
          </div>

          <div
            className="bg-white p-4 rounded-lg"
            style={{ boxShadow: "0 0 7px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-600">Utilisateurs</div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
                <div className="w-full sm:w-auto relative">
                  <i className= "fa-solid fa-magnifying-glass text-xl absolute left-6 top-3 text-(--primary-green)" />
                  <input
                    type="text"
                    placeholder="Rechercher utilisateur..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 mx-3 border border-gray-300 rounded-lg"
                    value={locataireSearchTerm}
                    onChange={(e) => setLocataireSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center mt-4 gap-2 sm:mt-0">
                  <span className="mr-2 text-sm text-gray-600"> contrat </span>
                  <select
                    className="border border-gray-300 rounded text-sm"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="Tout">tout</option>
                    <option value="actif">actif</option>
                    <option value="résilié">résilié</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-5 gap-4 my-4 text-sm text-gray-500 pb-2">
                <div>Tout cocher</div>
                <div>durée du contrat</div>
                <div>état du contrat</div>
                <div>email utilisateur</div>
                <div></div>
            </div>


            {filteredLocataires.map((locataire) => (
            <div
                key={locataire.id}
                className="flex flex-col md:grid md:grid-cols-5 gap-4 py-3 items-center border-b md:border-0"
            >
                <div className="flex items-center w-full md:w-auto justify-center md:justify-start">
                <img
                    src={locataire.image}
                    alt={locataire.nom}
                    className="size-12 rounded-full mr-3 object-cover"
                />
                </div>
                <div className="w-full md:w-auto text-center md:text-left">
                <span className="md:hidden font-medium mr-2">Durée:</span>
                {locataire.duree}
                </div>
                <div className="w-full md:w-auto  md:text-start text-center">
                  <span
                      className={`px-4 py-1 rounded-full ms-2 text-sm ${
                      locataire.etat === "actif"
                          ? "bg-green-100 text-green-500"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                      {locataire.etat}
                  </span>
                </div>
                <div className="w-full md:w-auto text-center md:text-left">
                {locataire.email}
                </div>
                <div className="w-full md:w-auto text-center">
                <button className="text-gray-500 hover:text-green-500">
                    <i className="fa-solid fa-edit"></i>
                </button>
                </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
