import { useEffect, useRef, useState } from 'react';
import { useFilter } from '../hooks/useFilter';
import { AdvancedFilter } from './AdvancedFilter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

export function FilterScrollbarWithModal() {
    const [availableTags, setAvailableTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectedTags, updateTags } = useFilter();
    const carouselRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

    // Récupération des tags depuis l'API
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('/api/property-tags');
                setAvailableTags(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des tags:', error);
                setLoading(false);
            }
        };
        fetchTags();
    }, []);

    const handleTagSelect = (tag) => {
        updateTags([...selectedTags, tag]);
        setAvailableTags(prev => prev.filter(t => t.id !== tag.id));
    };

    const handleTagRemove = (tag) => {
        updateTags(selectedTags.filter(t => t.id !== tag.id));
        setAvailableTags(prev => [...prev, tag]);
    };
    const scroll = (direction) => {
      const container = carouselRef.current;
      const scrollAmount = 200; // Ajustez selon vos besoins

      if (container) {
          const newPosition = direction === 'left' 
              ? Math.max(scrollPosition - scrollAmount, 0)
              : Math.min(scrollPosition + scrollAmount, container.scrollWidth - container.clientWidth);
          
          container.scrollTo({
              left: newPosition,
              behavior: 'smooth'
          });
          setScrollPosition(newPosition);
      }
  };

  return (
      <div className="w-full px-4 mt-[30px]">
          {/* Tags sélectionnés */}
          <div className='flex items-center mb-2 justify-between'>
            <div className='flex items-center gap-2'>
              <i className="fa-solid fa-filter text-xl text-(--primary-green)"></i>
              <span>appliquer un filtre</span>
            </div>
            <button onClick={()=> setIsAdvancedFilterOpen(true)} className='flex items-center cursor-pointer gap-2 text-[#10B981] hover:text-[#059669] transition-colors'>
                <i className="fa-solid fa-bars-staggered"></i>
                 <span>filtre avancé</span>
            </button>
            <AdvancedFilter 
                isOpen={isAdvancedFilterOpen}
                onClose={() => setIsAdvancedFilterOpen(false)}
            />
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                  <button
                      key={tag.id}
                      onClick={() => handleTagRemove(tag)}
                      className="px-4 py-2 bg-[#10B981] text-white rounded-full 
                      flex items-center gap-2 hover:bg-[#059669] transition-colors"
                  >
                      {tag.tag_name}
                      <span className="text-sm font-bold">×</span>
                  </button>
              ))}
          </div>

          {/* Carousel personnalisé */}
          <div className="relative">
              <button 
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                  bg-white p-2 rounded-full shadow-md hover:bg-gray-50
                  disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={scrollPosition === 0}
              >
                  <ChevronLeft className="w-5 h-5 text-[#10B981]" />
              </button>

              <div 
                  ref={carouselRef}
                  className="overflow-x-hidden scroll-smooth py-2 px-10"
              >
                  <div className="flex gap-2">
                      {availableTags.map(tag => (
                          <button
                              key={tag.id}
                              onClick={() => handleTagSelect(tag)}
                              className="px-4 py-2 bg-gray-100 hover:bg-gray-200
                              text-[#374151] rounded-full transition-colors
                              whitespace-nowrap flex-shrink-0"
                          >
                              {tag.tag_name}
                          </button>
                      ))}
                  </div>
              </div>

              <button 
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                  bg-white p-2 rounded-full shadow-md hover:bg-gray-50
                  disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={carouselRef.current && 
                      scrollPosition >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth}
              >
                  <ChevronRight className="w-5 h-5 text-[#10B981]" />
              </button>
          </div>
      </div>
  );
}