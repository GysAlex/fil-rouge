import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

export  function FilterScrollbar() {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const filters = [
    { id: 1, label: "Studio meublés" },
    { id: 2, label: "Prix" },
    { id: 3, label: "Type de logement" },
    { id: 4, label: "Distance au campus" },
    { id: 5, label: "Chambre simple" },
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
      <div className="flex items-center  px-2 py-1 gap-2">
        <div className="flex items-center gap-1 text-gray-700 mb-18" >
        <SlidersHorizontal  className= "text-green-500" size={18} />
          <span className="text-sm font-medium " >Trier par</span>
        </div>
        
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 z-10 bg-white shadow-md rounded-full p-2 ml-2 text-green-500 hover:bg-gray-50"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-2 py-2 ml-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
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