import { useEffect, useRef, useState } from "react";
import { SearchInput } from "../../components/SearchInput"
import { useModal } from "../../hooks/useModal"
import { ButtonModal } from "../../components/Button";


export function SearchModal()
{
    const {closeModal} = useModal()
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
    return <>
        <form className="max-w-[400px] searchModal flex flex-col items-stretch gap-6 md:w-[70%] w-[80%] bg-white mt-[300px] p-4 rounded-xl" style={{boxShadow: "1px 5px 10px rgba(0, 0, 0, .2)"}} ref={inputRef}>
            <div className="my-4">
                <span className="text-xl text-(--title-color)">Rechercher</span>
                <button onClick={closeModal} type="button" className="cursor-pointer float-right p-2 rounded-full bg-red-100 size-[30px] flex items-center justify-center" style={{transform: 'translateY(-5px)'}}><i className="fa-solid fa-x text-sm text-red-800"></i></button>
            </div>
            <div className="relative flex-grow sm:flex-grow-0">
                <SearchInput handleInputFocus={handleCountryInputFocus} showSuggestions={showCountriesSuggestion} label="Régions" data={['Bonjour', 'comment', 'allez', 'vous']}/>
            </div>
            <div className="relative flex-grow sm:flex-grow-0">
                <SearchInput handleInputFocus={handleUniversityInputFocus} showSuggestions={showUniversitiesSuggestion} label="Universités" data={['Bonjour', 'comment', 'allez', 'vous']}/>
            </div>

            <ButtonModal>
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>rechercher</span>
            </ButtonModal>
        </form>
    
    </>
    
 
}