import { useEffect, useState } from "react";
import { ArrowItem } from "../../components/ArrowItem";
import { HomeTags } from "../../components/Tags";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { FavorisSkeleton } from "../../components/FavorisSkeleton";
import { ModalContainer } from "../../containers/modals.jsx/ModalFilterContainer";
import { useModal } from "../../hooks/useModal";
import { ContactOwnerModal } from "../../containers/modals.jsx/ContactOwnerModal";

axios.defaults.withCredentials=true
axios.defaults.withXSRFToken=true

export function Favoris() {
    const { openModal } = useModal();

    const handleContactOwner = (propertyId) => {
        openModal(ContactOwnerModal, propertyId );
    };

    const [favoriteProperties, setFavoriteProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const nav = useNavigate()

    const fetchFavorites = async () => {
        try {
            const response = await axios.get('/api/favorites');
            if (response.data.status === 'success') {
                setFavoriteProperties(response.data.favorites);
                console.log("Bonjour")
            }
        } catch (error) {
            toast.error('Erreur lors de la récupération des favoris');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
      fetchFavorites();
  }, []);
    


    const removeFromFavorites = async (propertyId) => {
        try {
            const response = await axios.post(`/api/favorites/toggle`,{
              property_id: propertyId,
            } );

            if (response.data.status === 'removed') {
                setFavoriteProperties(prev => prev.filter(prop => prop.id !== propertyId));
                toast.success('Propriété retirée des favoris');
            }
        } catch (error) {
            toast.error('Erreur lors de la suppression du favori');
        }
    };



      // État pour la notification
  const [notificationSettings, setNotificationSettings] = useState({
    priceUpdates: true,
    newListings: true,
    comments: false
  });

    // Fonction pour supprimer une propriété des favoris


    // Fonction pour gérer les changements dans les paramètres de notification
    const handleNotificationChange = (setting) => {
        setNotificationSettings({
        ...notificationSettings,
        [setting]: !notificationSettings[setting]
        });
    };

    const viewListing = (propertyId) => {
        nav('/detail/'+propertyId)
    };

    if(loading){
      return <FavorisSkeleton />
    }

    return (<>
      <Toaster richColors position="top-right" />
       <div className="max-w-[1258px]  px-[75px] xl:px-0 mx-auto lg:px-[60px] pt-[33px] flex flex-col items-stretch justify-start mb-[20px]">
            <div className="py-6 w-full mx-auto">
                <h2 className="text-(--primary-green)  mb-1">Favoris</h2>
                <h1 className="text-[28px] mb-6">Les Logements que vous avez apprécié</h1>
            </div>
            <div className="space-y-6">
            {favoriteProperties.length > 0 ? favoriteProperties.map((property, index) => (
              <div 
                key={property.id} 
                className={`bg-white rounded-lg overflow-hidden`} style={{boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)"}}  
              >
                <div className="grid md:grid-cols-3 grid-cols-1 grid-rows-2 md:grid-rows-1 " >
                  {/* Property Image */}
                  <div className="">
                    <div className="relative h-full">
                      <img 
                        src={"http://localhost:8000/storage/"+property.image_path} 
                        alt={property.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-3 py-1 rounded-md text-sm font-medium">
                          {property.university.universitie_name}
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-4 relative col-span-2">
                    <button 
                      onClick={() => removeFromFavorites(property.id)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                    >
                        <i className="fa-solid fa-trash text-xl"></i>
                    </button>

                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium">{property.name}</h3>
                    </div>

                    <div className="flex items-center mb-3">
                      <i className="fa-solid fa-star text-(--primary-green)"></i>
                      <span className="ml-1 text-gray-700">{property.rating}</span>
                      <span className="ml-1 text-gray-500">({property.reviews} avis)</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.tags.map((tag, i) => (
                        <HomeTags key={i} >
                          {tag.tag_name}
                        </HomeTags>

                      ))}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-1">Description:</h4>
                      <p className="text-sm text-gray-600">
                        {property.description}
                        <span className="text-green-500 cursor-pointer ml-1">En plus</span>
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <ArrowItem >
                            <span>{property.nombre_chambres ? property.nombre_chambres > 1 ? `${property.nombre_chambres} chambres`:`${property.nombre_chambres} chambre ` : "" } , 
                            {property.nombre_douches ? property.nombre_douches > 1 ? `${property.nombre_douches} douches`:`${property.nombre_douches} douche ` : "" }, 
                            {property.nombre_salon ? property.nombre_salon > 1 ? `${property.nombre_salon} salons`:`${property.nombre_salon} salon ` : "" } 
                            {property.nombre_cuisine ? property.nombre_cuisine > 1 ? `${property.nombre_cuisine} cuisines`:`${property.nombre_cuisine} cuisine ` : "" } 
                            </span>
                            
                        </ArrowItem>
                      </div>
                      <div className="flex items-center text-sm">
                        <ArrowItem >
                            <span>5 minutes du campus</span>
                        </ArrowItem>
                      </div>
                    {property.coloc && <div className="flex items-center text-sm">
                        <ArrowItem >
                          <span>Colocation possible</span>
                        </ArrowItem>
                      </div>}
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-start gap-4 my-3">
                      <button 
                        onClick={() => viewListing(property.id)}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-6 rounded-2xl"
                      >
                        Voir l'annonce en ligne
                      </button>

                      <button 
                        onClick={()=>  openModal(ContactOwnerModal, property )}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-6 rounded-2xl"
                      >
                        Contacter le propriétaire
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            )) : 
            <div className="text-xl text-red-400 h-[300px] grid place-items-center">
                Aucun favoris pour le moment
            </div> }
        </div>
    </div>
  </>  
  )
}