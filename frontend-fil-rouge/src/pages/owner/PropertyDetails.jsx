import { Link, useParams } from "react-router-dom";
import { usePropertyDetails } from "../../hooks/usePropertyDetails";
import { PropertyDetailsSkeleton } from "../../components/PropertyDetailsSkeleton";

export function PropertyDetails() {
    const { id } = useParams();
    const { 
        stats, 
        tenants, 
        prospects,
        loading,
        error,
        createContract,
        sendNotification
    } = usePropertyDetails(id);

    
    if (loading) {
        return (
            <div className="max-w-[1258px] px-[75px] xl:px-0 mx-auto lg:px-[60px] pt-[33px]">
                <PropertyDetailsSkeleton />
            </div>
        );
    }



  return (
    <div className="max-w-[1258px] px-[75px] xl:px-0 mx-auto lg:px-[60px] pt-[33px] flex flex-col items-stretch justify-start">
      <div className="flex items-stretch flex-col justify-start gap-4">
        <Link to="/owner/dashboard" className="p-2.5 h-[44px] w-fit rounded-4xl cursor-pointer text-white bg-(--primary-green) flex items-center justify-center gap-3">
          <i className="fa-solid fa-arrow-left"></i>
          <span>retour</span>
        </Link>
        <div className="stat container min-h-[140px] gap-3 grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-1 lg:grid-cols-3">
          <div className="total-locatire flex flex-col justify-center gap-6 border-l-4 border-l-(--primary-green) shadow-sm p-3">
            <div className=" text-[18px] flex items-center justify-start gap-6 text-(--text-color) w-[80%] mx-auto">
              <i className="fa-solid text-2xl fa-users text-(--primary-green)"></i>
              <span>Locataires</span>
            </div>
            <div className="text-[35px] flex items-center justify-start gap-6 text-(--text-color) w-[80%] mx-auto">
              <span>{stats.totalTenants}</span>
              <span className="text-[14px] text-(--primary-green)">
                <i className="fa-solid fa-arrow-up mx-2"></i>
                3,4% depuis le dernier mois
              </span>
            </div>
          </div>
          <div className="total-favoris flex flex-col justify-center gap-6 border-l-4 border-l-(--primary-green) shadow-sm p-3">
            <div className=" text-[18px] flex items-center justify-start gap-6 text-(--text-color) w-[80%] mx-auto">
              <i className="fa-solid text-2xl fa-heart text-(--primary-green)"></i>
              <span>Ajout en favoris</span>
            </div>
            <div className="text-[35px] flex items-center justify-start gap-6 text-(--text-color) w-[80%] mx-auto">
              <span>{stats.totalFavorites}</span>
              <span className="text-[14px] text-red-400">
                <i className="fa-solid fa-arrow-down mx-2"></i>
                10% depuis le dernier mois
              </span>
            </div>
          </div>
          <div className="total-locatire flex flex-col justify-center gap-6 border-l-4 border-l-(--primary-green) shadow-sm p-3">
            <div className=" text-[18px] flex items-center justify-start gap-6 text-(--text-color) w-[80%] mx-auto">
              <i className="fa-solid text-2xl fa-sack-dollar text-(--primary-green)"></i>
              <span>Total des revenus</span>
            </div>
            <div className="text-[35px] flex items-stretch flex-col justify-start gap-6 text-(--text-color) w-[80%] mx-auto">
              <span>{stats.totalRevenue + " "} FCFA</span>
            </div>
          </div>
        </div>


        <div className="mt-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Locataires actuels</h2>
            <button
              onClick={()=>null}
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
      
                  />
                </div>
                <div className="flex items-center mt-4 md:gap-2 sm:mt-0 w-full justify-center">
                  <span className="mr-2 text-sm text-gray-600"> contrat </span>
                  <select
                    className="border border-gray-300 rounded text-sm"
                    value=""
                    onChange={(e) => null}
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

            {(tenants && tenants.length) > 0 ? (
              tenants.map((tenants) => (
                <div
                  key={tenants.id}
                  className="flex flex-col md:grid md:grid-cols-5 gap-4 py-3 items-center border-b md:border-0"
                >
                  <div className="flex items-center md:ms-8 text-center w-full md:w-auto justify-center md:justify-start">
                    <img
                      src={
                        tenants.image
                          ? `http://localhost:8000/storage/${tenants.image}`
                          : "http://localhost:5173/images/team2.jpg"
                      }
                      alt={tenants.name}
                      className="size-12 rounded-full mr-3 object-cover"
                    />
                    <span className="text-sm">{tenants.name}</span>
                  </div>
                  <div className="w-full md:w-auto text-center md:text-left">
                    <span className="md:hidden font-medium mr-2">Durée:</span>
                    {computeDuration(
                      tenants.contracts[0].date_debut,
                      tenants.contracts[0].date_fin
                    )}
                  </div>
                  <div className="w-full md:w-auto  md:text-start text-center">
                    <span
                      className={`px-4 py-1 rounded-full ms-2 text-sm ${
                        tenants.contracts[0].statut === "en_cours"
                          ? "bg-green-300 text-gray-700"
                          : tenants.contracts[0].statut === "à_venir"
                          ? "bg-[#bffee4] text-gray-700"
                          : "text-gray-700 bg-red-500"
                      }`}
                    >
                      {tenants.contracts[0].statut}
                    </span>
                  </div>
                  <div className="w-full md:w-auto text-center md:text-left">
                    {tenants.email}
                  </div>
                  <div className="w-full md:w-auto text-center">
                    <button
                      onClick={() => openModal(updateContractModal, tenants)}
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

        <div className="mt-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Locataires Potentiels</h2>
            <div className="flex items-center justify-center flex-row gap-3">
                <button
                    onClick={()=>null}
                    className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center text-sm hover:bg-green-600 transition-colors"
                    >
                    <i className="mr-2 fa-solid fa-plus" /> Nouveau contrat
                </button>

                <button
                onClick={()=>null}
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center text-sm hover:bg-green-600 transition-colors"
                >
                    <i className="mr-2 fa-solid fa-plus" /> Envoyer une notification
                </button>
            </div>

          </div>

          <div
            className="bg-white p-4 rounded-lg"
            style={{ boxShadow: "0 0 7px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex justify-around items-center mb-4">
              <div className="text-gray-600 hidden md:block">prospects</div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
                <div className="w-full sm:w-auto relative">
                  <i className="fa-solid fa-magnifying-glass text-xl absolute left-6 top-3 text-(--primary-green)" />
                  <input
                    type="text"
                    placeholder="Rechercher utilisateur..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 mx-3 border border-gray-300 rounded-lg"
      
                  />
                </div>
                <div className="flex items-center mt-4 md:gap-2 sm:mt-0 w-full justify-center">
                  <span className="mr-2 text-sm text-gray-600"> favoris </span>
                </div>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-4 gap-4 my-4 text-sm text-gray-500 pb-2">
              <div className="md:ms-5">Profile</div>
              <div>date de l'ajout</div>
              <div>email utilisateur</div>
              <div></div>
            </div>

            {(prospects && prospects.length) > 0 ? (
              prospects.map((prospect) => (
                <div
                  key={prospect.id}
                  className="flex flex-col md:grid md:grid-cols-5 gap-4 py-3 items-center border-b md:border-0"
                >
                  <div className="flex items-center md:ms-8 text-center w-full md:w-auto justify-center md:justify-start">
                    <img
                      src={
                        prospect.image
                          ? `http://localhost:8000/storage/${prospect.image}`
                          : "http://localhost:5173/images/team2.jpg"
                      }
                      alt={prospect.name}
                      className="size-12 rounded-full mr-3 object-cover"
                    />
                    <span className="text-sm">{prospect.name}</span>
                  </div>
                  <div className="w-full md:w-auto  md:text-start text-center">
                    <span>
                      {prospect.properties.date_ajout}
                    </span>
                  </div>
                  <div className="w-full md:w-auto text-center md:text-left">
                    {prospect.email}
                  </div>
                  <div className="w-full md:w-auto text-center">
                    <button
                      onClick={() => openModal(updateContractModal, prospect)}
                      className="text-gray-500 hover:text-green-500"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-center text-red-400 my-10">
                Aucun prospects pour le moment
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
