import { useState } from "react";
import { ArrowItem } from "../../components/ArrowItem";
import { HomeTags } from "../../components/Tags";

export function Favoris() {

    const [favoriteProperties, setFavoriteProperties] = useState([
        {
          id: 1,
          name: "MCK APPARTEMENT",
          image: "/api/placeholder/400/300",
          rating: 3.3,
          reviews: 4,
          location: "IUT de Douala",
          bedrooms: 1,
          bathrooms: 2,
          distance: 30, // en minutes du campus
          tags: ["wifi", "air conditionné", "salle d'études", "réfrigérateur", "TV disponible"],
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          collaboration: true
        },
        {
          id: 2,
          name: "MCK APPARTEMENT",
          image: "/api/placeholder/400/300",
          rating: 3.3,
          reviews: 4,
          location: "IUT de Douala",
          bedrooms: 1,
          bathrooms: 2,
          distance: 30, // en minutes du campus
          tags: ["wifi", "air conditionné", "salle d'études", "réfrigérateur", "TV disponible"],
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          collaboration: true
        }
      ]);


      // État pour la notification
  const [notificationSettings, setNotificationSettings] = useState({
    priceUpdates: true,
    newListings: true,
    comments: false
  });

    // Fonction pour supprimer une propriété des favoris
    const removeFromFavorites = (propertyId) => {
        setFavoriteProperties(favoriteProperties.filter(prop => prop.id !== propertyId));
    };

    // Fonction pour gérer les changements dans les paramètres de notification
    const handleNotificationChange = (setting) => {
        setNotificationSettings({
        ...notificationSettings,
        [setting]: !notificationSettings[setting]
        });
    };

    // Fonction pour voir l'annonce en ligne
    const viewListing = (propertyId) => {
        alert(`Redirection vers l'annonce #${propertyId}`);
        // Ici vous pouvez rediriger vers la page de l'annonce
        // window.location.href = `/property/${propertyId}`;
    };

    return <div className="max-w-[1258px]  px-[75px] xl:px-0 mx-auto lg:px-[60px] pt-[33px] flex flex-col items-stretch justify-start mb-[20px]">
            <div className="py-6 w-full mx-auto">
                <h2 className="text-(--primary-green)  mb-1">Favoris</h2>
                <h1 className="text-[28px] mb-6">Les Logements que vous avez apprécié</h1>
            </div>
            <div className="space-y-6">
            {favoriteProperties.map((property, index) => (
              <div 
                key={property.id} 
                className={`bg-white rounded-lg overflow-hidden shadow-sm border `}
              >
                <div className="grid md:grid-cols-3 grid-cols-1 grid-rows-2 md:grid-rows-1 " >
                  {/* Property Image */}
                  <div className="">
                    <div className="relative h-full">
                      <img 
                        src={property.image} 
                        alt={property.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-3 py-1 rounded-md text-sm font-medium">
                        {property.location}
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
                          {tag}
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
                            <span>{property.bedrooms} chambre, {property.bathrooms} douches</span>
                        </ArrowItem>
                      </div>
                      <div className="flex items-center text-sm">
                        <ArrowItem >
                            <span>{property.distance} minutes du campus</span>
                        </ArrowItem>
                      </div>
                      <div className="flex items-center text-sm">
                        <ArrowItem >
                            <span>Colocation possible</span>
                        </ArrowItem>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="text-center">
                      <button 
                        onClick={() => viewListing(property.id)}
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-2xl"
                      >
                        Voir l'annonce en ligne
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
    </div>
}