import { Link } from "react-router-dom";
import { ModalContainer } from "../../containers/modals.jsx/ModalContainer";
import { useState } from "react";

export function StatistiqueLogement(){

    const [showAllPhotos, setShowAllPhotos] = useState(false);
  
    // Données du logement
    const logement = {
      id: 1,
      nom: "Harmony city",
      location: "Dja, Bandjoun",
      rating: 4.6,
      reviews: 50,
      publishDate: "12 Oct. 2015",
      online: true,
      photos: [
        "/images/bedroom.jpg",
        "/images/coastal1.jpg",
        "/images/coastal1.jpg",
        "/images/bedroom-dark.jpg",
        "/images/coastal1.jpg",
        "/images/bedroom-dark.jpg",
        "/images/additional-photo1.jpg"
      ]
    };
    
    // Fonction pour revenir à la page précédente
    const handleRetour = () => {
      console.log("Retour à la liste des logements");
      // Dans une application réelle, utilisez la navigation React Router
      // history.push('/logements');
    };
    
    // Fonction pour toggler l'affichage des photos
    const toggleShowAllPhotos = () => {
      setShowAllPhotos(!showAllPhotos);
    };
    
    // Fonction pour gérer le changement d'état "en ligne"
    const toggleOnlineStatus = () => {
      console.log("Changer le statut en ligne à:", !logement.online);
      // Dans une application réelle, mettez à jour l'état et envoyez une requête API
    };

    return <> 
        <div className="px-4 ms-10 mx-auto lg:ms-0 sm:px-6 lg:px-[75px]  sm:mx-auto pt-[33px] flex flex-col items-stretch md:justify-start justify-center">

            {/* <Link className="p-2.5 h-[44px] w-fit rounded-4xl cursor-pointer text-white bg-(--primary-green) flex items-center justify-center gap-3">
                <i className="fa-solid fa-arrow-left"></i>
                <span>retour</span>
            </Link>
            <div className="title mt-[15px] flex items-center  justify-between">
                <div className="flex flex-col items-start justify-center">
                    <div className="up text-[26px] text-(--text-color) font-medium">
                        Harmony City
                    </div>
                    <div className="down flex justify-start items-center gap-2 ">
                        <div className="firs flex justify-start items-center gap-1">
                            <i className="fa-solid fa-location-dot text-(--primary-green) text-2xl"></i>
                            <span>Dja, Bandjoun</span>
                        </div>
                        <div className="sec hidden sm:flex justify-start items-center gap-1">
                            <i className="fa-solid fa-star text-(--primary-green) text-2xl"></i>
                            <span>4,6 (56 avis) </span>
                        </div>
                    </div>
                </div>
                <ModalContainer />
            </div> */}
             {/* Stats Link */}
        <div className="mb-6">
          <a href="#" className="text-green-500 hover:underline">stats logements</a>
        </div>

        {/* Return Button and Online Toggle */}
        <div className="flex justify-between items-center mb-6">
          <Link 
            onClick={handleRetour}
            className="p-2.5 h-[44px] w-fit rounded-4xl cursor-pointer text-white bg-(--primary-green) flex items-center justify-center gap-3"          >
                <i className="fa-solid fa-arrow-left"></i>
                <span>retour</span>
          </Link>
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">en ligne</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={logement.online} 
                onChange={toggleOnlineStatus}
                className="checkbox-custom"
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        {/* Logement Title and Info */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{logement.nom}</h2>
          <div className="flex items-center text-gray-600 gap-2">
          <i className="fa-solid fa-location-dot text-(--primary-green) text-2xl"></i>
          <span>{logement.location}</span>
            <div className="ml-4 flex items-center">
              < i className=" fa-solid fa-star text-(--primary-green) text-2xl" />
              <span>{logement.rating} ({logement.reviews} avis)</span>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 row-span-2">
            <img 
              src="/api/placeholder/360/450" 
              alt="Main bedroom" 
              className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
              onClick={toggleShowAllPhotos}
            />
          </div>
          <div className="col-span-1">
            <img 
              src="/api/placeholder/180/210" 
              alt="Coastal view" 
              className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
              onClick={toggleShowAllPhotos}
            />
          </div>
          <div className="col-span-1">
            <img 
              src="/images/pla" 
              alt="Bedroom night" 
              className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
              onClick={toggleShowAllPhotos}
            />
          </div>
          <div className="col-span-1">
            <img 
              src="/api/placeholder/180/210" 
              alt="Coastal view" 
              className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer"
              onClick={toggleShowAllPhotos}
            />
          </div>
          <div className="col-span-1 relative">
            <img 
              src="/api/placeholder/180/210" 
              alt="Additional photos" 
              className="w-full h-full object-cover rounded-lg shadow-md brightness-50 cursor-pointer"
              onClick={toggleShowAllPhotos}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
              + 4 autres photos
            </div>
          </div>
        </div>

        {/* Publication Date */}
        <div className="mt-12 text-gray-500 text-sm">
          publié le {logement.publishDate}
        </div>

        {/* Photo Modal */}
        {showAllPhotos && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-8">
            <div className="max-w-6xl w-full">
              <div className="flex justify-between items-center mb-6 text-white">
                <h3 className="text-xl font-medium">Toutes les photos</h3>
                <button 
                  onClick={toggleShowAllPhotos}
                  className="text-white text-2xl"
                >
                  &times;
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {logement.photos.map((photo, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-9">
                    <img 
                      src="/api/placeholder/400/300"
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
</>
}