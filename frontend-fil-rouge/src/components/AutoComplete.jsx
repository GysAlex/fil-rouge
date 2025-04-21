import React, { useState, useEffect, useRef } from 'react';
import '../Autocomplete.css'; // Importez votre fichier CSS pour les styles et la transition

const Autocomplete = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [inputRef]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filtrer les suggestions en fonction de la valeur de l'input
    const newFilteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(newFilteredSuggestions);
    setShowSuggestions(true); // Afficher les suggestions dès qu'il y a une saisie
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false); // Cacher les suggestions après la sélection
  };

  const handleInputFocus = () => {
    setShowSuggestions(true); // Afficher les suggestions au focus
  };

  return (
    <div className="autocomplete-container" ref={inputRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className="autocomplete-input"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="autocomplete-suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="autocomplete-suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;