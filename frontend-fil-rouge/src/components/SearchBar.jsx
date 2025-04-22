import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { SearchInput } from "./SearchInput";
export function SearchBar()
{

      const inputRef = useRef(null);
      const [showCountriesSuggestion, setshowCountriesSuggestion] = useState(false);
      const [showUniversitiesSuggestion, setShowUniversitiesSuggestion] = useState(false)
    
      useEffect(() => {
        const handleOutsideClick = (event) => {
          if (inputRef.current && !inputRef.current.contains(event.target)) {
            setshowCountriesSuggestion(false);
            setShowUniversitiesSuggestion(false)
          }
        };
    
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, [inputRef]);

      const handleCountryInputFocus = () => {
        setshowCountriesSuggestion(true); // Afficher les suggestions au focus
      };

      const handleUniversityInputFocus = () => {
        setShowUniversitiesSuggestion(true); // Afficher les suggestions au focus
      };
    
    return(
        <div className="bg-white hidden  z-20 search relative py-5 px-10 h-fit min-h-[80px] gap-[30px] rounded-full md:flex  items-center justify-center" style={{boxShadow: "0 0 7px rgba(0, 0, 0, .25)"}} ref={inputRef}>
            <div className="w-[210px] z-100 relative flex-grow sm:flex-grow-0">
                <SearchInput handleInputFocus={handleCountryInputFocus} showSuggestions={showCountriesSuggestion} label="Régions" data={['Bonjour', 'comment', 'allez', 'vous']}/>
            </div>

            <div className="h-[30px] w-[2px] bg-(--primary-green)">

            </div>

            <div className="w-[210px] z-100 relative flex-grow sm:flex-grow-0">
                <SearchInput handleInputFocus={handleUniversityInputFocus} showSuggestions={showUniversitiesSuggestion} label="Universités" data={['Bonjour', 'comment', 'allez', 'vous']}/>
            </div>

            <Button>
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>rechercher</span>
            </Button>
        </div>
    )
}