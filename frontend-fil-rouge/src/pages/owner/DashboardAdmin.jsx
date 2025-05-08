import { useState } from "react";
import { Link } from "react-router-dom";
import { useDashboard } from "../../hooks/useDashboard";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Toaster } from "sonner";
import { useModal } from "../../hooks/useModal";
import { updateContractModal } from "../../containers/modals.jsx/updateContractModal";
import { ContractModal } from "../../containers/modals.jsx/ContractModal";

export function DashboardAdmin() {
  const [selectedFilter, setSelectedFilter] = useState("Tout");

  const {
    stats,
    searchProperties,
    showOnlyPublished,
    setShowOnlyPublished,
    locataireSearchTerm,
    setLocataireSearchTerm,
    logements,
    locataires,
    setLogementSearchTerm,
    logementSearchTerm,
    togglePropertyPublished,
  } = useDashboard();

  const { openModal } = useModal();

  const handleNewContract = () => {
    openModal(ContractModal);
  };

  const computeDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let diffMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    // Ajuster si le jour de fin est inférieur au jour de début
    if (end.getDate() < start.getDate()) {
      diffMonths--;
    }
    if (diffMonths < 12) {
      return `${diffMonths} mois`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      return months > 0
        ? `${years} an${years > 1 ? "s" : ""} ${months} mois`
        : `${years} an${years > 1 ? "s" : ""}`;
    }
  };


  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="px-4 ms-10 mx-auto lg:ms-0 sm:px-6 lg:px-[75px]  sm:mx-auto pt-[33px] flex flex-col items-stretch md:justify-start justify-center">
        <div className="p-4 sm:p-6 w-full mx-auto">
          <h2 className="text-(--primary-green)  mb-1">
            Dashboard propriétaire
          </h2>
          <h1 className="text-[28px] mb-6">Vue d'ensemble</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {/* Nombre total de logements */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center h-[70%] min-h-[100px] self-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fa-solid fa-building text-xl text-(--primary-green)"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  Nombre total de logements
                </p>
                <p className="text-2xl font-bold text-green-500">
                  {stats.totalLogements.toString().padStart(2, "0")}{" "}
                  <span className="text-sm font-normal">Logements</span>
                </p>
              </div>
            </div>

            {/* Total des Locataires */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center h-[70%] min-h-[100px]  self-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fa-solid fa-user text-(--primary-green)"></i>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total des Locataires</p>
                <p className="text-2xl font-bold text-green-500">
                  {stats.totalLocataires.toString().padStart(2, "0")}{" "}
                  <span className="text-sm font-normal">Locataires</span>
                </p>
              </div>
            </div>

            {/* Graphique des contrats */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-center items-center flex-col ">
                <div className="flex-grow">
                  <div className="">
                    {!(stats.contratsActifs == 0 && stats.contratsTermines == 0,
                    stats.contratsFutur == 0) ? (
                      <Doughnut
                        data={{
                          labels: [
                            "contrats actifs",
                            "contrats terminés",
                            "contrats futur",
                          ],
                          datasets: [
                            {
                              label: "Contrats",
                              data: [
                                stats.contratsActifs,
                                stats.contratsTermines,
                                stats.contratsFutur,
                              ],
                              backgroundColor: [
                                "#FBBB00",
                                "#F14336",
                                "#bffee4",
                              ],
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    ) : (
                      <span className="text-sm">Aucun contrats</span>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="my-2 flex justify-start gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="w-3 h-3 rounded-full bg-[#FBBB00] mr-2"></div>
                      <span className="text-sm">Contrats actifs</span>
                    </div>
                    <p className="font-bold text-[#FBBB00] w-[15px]">
                      {stats.contratsActifs}
                    </p>
                  </div>
                  <div className="flex items-center  gap-1.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#F14336] mr-2"></div>
                      <span className="text-sm">Contrats terminés</span>
                    </div>
                    <p className="font-bold w-[15px] text-[#F14336]">
                      {stats.contratsTermines}
                    </p>
                  </div>
                  <div className="mt-2 flex justify-start gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="w-3 h-3 rounded-full bg-[#bffee4] mr-2"></div>
                      <span className="text-sm">Contrats Futur</span>
                    </div>
                    <p className="font-bold text-[#bffee4]">
                      {stats.contratsFutur}
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
                <i className="fa-solid fa-plus text-(primary-green)"></i>{" "}
                Ajouter un logement
              </Link>
            </div>

            <div
              className="bg-white p-4 rounded-lg"
              style={{ boxShadow: "0 0 7px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="flex justify-around items-center mb-10">
                <div className="text-gray-600 hidden md:block">Logements</div>
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4">
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
                        checked={showOnlyPublished}
                        className="checkbox-custom"
                        onChange={(e) => setShowOnlyPublished(e.target.checked)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="hidden md:grid grid-cols-6 gap-4 my-3 text-sm text-gray-500 pb-2">
                <div>Nom du logement</div>
                <div>Créer le</div>
                <div>locataires</div>
                <div>statistiques</div>
                <div>status</div>
                <div></div>
              </div>

              {logements.map((logement) => (
                <div
                  key={logement.id}
                  className="flex flex-col md:grid md:grid-cols-6 gap-4 py-4 items-center border-b md:border-0"
                >
                  <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                    <img
                      src={`http://localhost:8000/storage/${logement.image}`}
                      alt={logement.nom}
                      loading="lazy"
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
                    <span>{logement.locataires_count}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                    <Link to={`/owner/detail-property/${logement.id}`} className="cursor-pointer items-center justify-center flex gap-2">
                      <i className="fa-solid fa-chart-line text-(--primary-green)" />
                      <span>stats</span>
                    </Link>
                  </div>
                  <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                    <input
                      type="checkbox"
                      className="checkbox-custom"
                      onChange={() => togglePropertyPublished(logement.id)}
                      name=""
                      checked={logement.published}
                      id=""
                    />
                  </div>
                  <div className="w-full md:w-auto text-center">
                    <Link
                      to={`/owner/edit-property/${logement.id}`}
                      className="w-full min-w-max md:w-auto border border-green-500 text-green-500 rounded-full px-4 py-2 text-sm hover:bg-green-50 transition-colors"
                    >
                      <span className="min-w-max">modifier</span> 
                    </Link>
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
                onClick={handleNewContract}
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center text-sm hover:bg-green-600 transition-colors"
              >
                <i className="mr-2 fa-solid fa-plus" /> Ajouter un contrat
              </button>
            </div>

            <div
              className="bg-white p-4 rounded-lg"
              style={{ boxShadow: "0 0 7px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="flex justify-around items-center mb-4">
                <div className="text-gray-600 hidden md:block">locataire</div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
                  <div className="w-full sm:w-auto relative">
                    <i className="fa-solid fa-magnifying-glass text-xl absolute left-6 top-3 text-(--primary-green)" />
                    <input
                      type="text"
                      placeholder="Rechercher utilisateur..."
                      className="w-full sm:w-64 pl-10 pr-4 py-2 mx-3 border border-gray-300 rounded-lg"
                      value={locataireSearchTerm}
                      onChange={(e) => setLocataireSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center mt-4 md:gap-2 sm:mt-0 w-full justify-center">
                    <span className="mr-2 text-sm text-gray-600">
                      {" "}
                      contrat{" "}
                    </span>
                    <select
                      className="border border-gray-300 rounded text-sm"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      style={{ height: "40px", padding: "0 5px" }}
                    >
                      <option value="Tout">tout</option>
                      <option value="actif">actif</option>
                      <option value="résilié">résilié</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="hidden md:grid grid-cols-5 gap-4 my-4 text-sm text-gray-500 pb-2">
                <div className="md:ms-5">Profile</div>
                <div>durée du contrat</div>
                <div>état du contrat</div>
                <div>email utilisateur</div>
                <div></div>
              </div>

              {console.log(stats)}
              {(locataires && locataires.length) > 0 ? (
                locataires.map((locataire) => (
                  <div
                    key={locataire.id}
                    className="flex flex-col md:grid md:grid-cols-5 gap-4 py-3 items-center border-b md:border-0"
                  >
                    <div className="flex items-center md:ms-8 text-center w-full md:w-auto justify-center md:justify-start">
                      <img
                        src={
                          locataire.image
                            ? `http://localhost:8000/storage/${locataire.image}`
                            : "http://localhost:5173/images/team2.jpg"
                        }
                        alt={locataire.name}
                        className="size-12 rounded-full mr-3 object-cover"
                      />
                      <span className="text-sm">{locataire.name}</span>
                    </div>
                    <div className="w-full md:w-auto text-center md:text-left">
                      <span className="md:hidden font-medium mr-2">Durée:</span>
                      {computeDuration(
                        locataire.contracts[0].date_debut,
                        locataire.contracts[0].date_fin
                      )}
                    </div>
                    <div className="w-full md:w-auto  md:text-start text-center">
                      <span
                        className={`px-4 py-1 rounded-full ms-2 text-sm ${
                          locataire.contracts[0].statut === "en_cours"
                            ? "bg-green-300 text-gray-700"
                            : locataire.contracts[0].statut === "à_venir"
                            ? "bg-[#bffee4] text-gray-700"
                            : "text-gray-700 bg-red-500"
                        }`}
                      >
                        {locataire.contracts[0].statut}
                      </span>
                    </div>
                    <div className="w-full md:w-auto text-center md:text-left">
                      {locataire.email}
                    </div>
                    <div className="w-full md:w-auto text-center">
                      <button
                        onClick={() =>
                          openModal(updateContractModal, locataire)
                        }
                        className="text-gray-500 hover:text-green-500"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-center text-red-400 my-10">
                  Aucun contrats pour le moment
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
