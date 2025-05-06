import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";


export  function FilterScrollbarWithModal() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  const filters = [
    { 
      id: 1, 
      label: "Studio meublés",
      formFields: [
        { id: "meuble", type: "checkbox", label: "Meublé uniquement" }
      ]
    },
    { 
      id: 2, 
      label: "Prix", 
      formFields: [
        { id: "minPrice", type: "range", label: "Prix minimum", min: 0, max: 2000, step: 50 },
        { id: "maxPrice", type: "range", label: "Prix maximum", min: 0, max: 2000, step: 50 }
      ]
    },
    { 
      id: 3, 
      label: "Type de logement",
      formFields: [
        { id: "studio", type: "checkbox", label: "Studio" },
        { id: "t1", type: "checkbox", label: "T1" },
        { id: "t2", type: "checkbox", label: "T2" },
        { id: "t3", type: "checkbox", label: "T3+" }
      ]
    },
    { 
      id: 4, 
      label: "Distance au campus",
      formFields: [
        { id: "distance", type: "range", label: "Distance maximale (km)", min: 0, max: 10, step: 0.5 }
      ]
    },
    { 
      id: 5, 
      label: "Chambre simple",
      formFields: [
        { id: "chambreSimple", type: "checkbox", label: "Chambre simple uniquement" }
      ]
    },
    { id: 6, label: "Colocation" },
    { id: 7, label: "Appartement" },
    { id: 8, label: "Autre" }
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const openModal = (filter) => {
    setActiveFilter(filter);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveFilter(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Ici vous traiteriez les données du formulaire
    // Pour l'exemple, affichons simplement les valeurs dans la console
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log("Valeurs du formulaire:", formValues);
    
    closeModal();
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  // Gestionnaire pour fermer le modal si on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalElement = document.getElementById('filter-modal');
      if (modalOpen && modalElement && !modalElement.contains(event.target)) {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <div className="w-full bg-white relative border-b border-gray-200">
      <div className="flex items-stretch justify-start flex-col px-2 ">
        <div className="flex items-center gap-3 text-gray-700 p-4">
          <SlidersHorizontal size={18} />
          <span className="text-sm font-medium min-w-max text-green-500 ">Trier par</span>
        </div>
        
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')} 
            className=" overlay absolute left-0 z-10 bg-white shadow-md rounded-full p-2 ml-2 text-green-500 hover:bg-gray-50"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-2 py-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => openModal(filter)}
              className="whitespace-nowrap px-4 py-2 rounded-full border text-green-500 border-gray-200 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 z-10 bg-white shadow-md rounded-full p-2 mr-2 text-green-500 hover:bg-gray-50"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Modal avec formulaire */}
      {modalOpen && activeFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            id="filter-modal"
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
          >
            <button 
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-lg font-semibold mb-4 text-green-500">
              {activeFilter.label}
            </h3>
            
            {activeFilter.formFields && activeFilter.formFields.length > 0 ? (
              <form onSubmit={handleFormSubmit}>
                <div className="space-y-4">
                  {activeFilter.formFields.map((field) => (
                    <div key={field.id} className="flex flex-col">
                      <label htmlFor={field.id} className="text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      
                      {field.type === 'checkbox' ? (
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={field.id}
                            name={field.id}
                            className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={field.id} className="ml-2 text-sm text-gray-700">
                            {field.label}
                          </label>
                        </div>
                      ) : field.type === 'range' ? (
                        <div className="space-y-2">
                          <input
                            type="range"
                            id={field.id}
                            name={field.id}
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            defaultValue={field.min + (field.max - field.min) / 2}
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{field.min}</span>
                            <span>{field.max}</span>
                          </div>
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Appliquer
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-gray-500">Options non disponibles pour ce filtre.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}