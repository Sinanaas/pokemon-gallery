import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import PokemonDetailCard from './PokemonDetailCard';

const PokemonSearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pokemonData, setPokemonData] = useState(null);

    const handleSearch = async () => {
        console.log('Performing search for: ', searchQuery);
        if (searchQuery !== '') {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
                setPokemonData(response.data);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        }
    };

    const handleCloseDetailCard = () => {
        setPokemonData(null);
    };

    return (
        <div className="searchBar">
            <div className="input-group" id="input-group">
                <div className="search-container">
                    <input
                        type="text"
                        name=""
                        id="search-bar"
                        placeholder="Search a pokemon..."
                        className="no-highlight"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                </div>
                <div className="search-icon">
                    <button type="submit" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} id="search-icon" />
                    </button>
                </div>
            </div>
            {pokemonData && (
                <PokemonDetailCard
                    pokemonData={pokemonData}
                    onClose={handleCloseDetailCard}
                />
            )}
        </div>
    );
};

export default PokemonSearchBar;
