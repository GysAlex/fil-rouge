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

        
    </div>
  );
}