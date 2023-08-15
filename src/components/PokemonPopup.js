import React from 'react'

const PokemonPopup = ({ pokemonData, onClose }) => {
    return (
      <div className="popup">
        <div className="popup-content">
          <h2>{pokemonData.name}</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  export default PokemonPopup;