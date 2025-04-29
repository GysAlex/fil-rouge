import { useState } from "react";

export function NotificationClient(){

    const [notifications, setNotifications] = useState([
        {
          id: 1,
          property: "Mcc appart",
          image: "http://localhost:5173/images/g1.jpg",
          time: "il y a 5 minutes",
          viewed: false
        },
        {
          id: 2,
          property: "Mcc appart",
          image: "http://localhost:5173/images/g2.jpg",
          time: "il y a 10 minutes",
          viewed: false
        },
        {
          id: 3,
          property: "Mcc appart",
          image: "http://localhost:5173/images/g3.jpg",
          time: "il y a 10 minutes",
          viewed: false
        }
      ]);
      

    return <div className="max-w-[1258px]  px-[75px] xl:px-0 mx-auto lg:px-[60px] pt-[33px] flex flex-col items-stretch justify-start">
              <div className="p-6 w-full mx-auto">
            <h2 className="text-(--primary-green)  mb-1">Notifications</h2>
            <h1 className="text-[28px] mb-6">Dernières mises à jours des prix et conditions</h1>
            
            {/* Notification List */}
            <div className="space-y-4 ">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 justify-between items-center ${notification.viewed ? 'opacity-70' : ''}`}
                >
                  <div className="flex items-center">
                    <span className="font-medium mr-6">{notification.property}</span>
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={notification.image} 
                        alt={notification.property} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                  
                  <div className="text-gray-500">
                    {notification.time}
                  </div>
                  
                  <button 
                    onClick={() => viewNotificationDetails(notification.id)}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md"
                  >
                    Voir les détails
                  </button>
                </div>
              ))}
            </div>
          </div>
    </div>
}