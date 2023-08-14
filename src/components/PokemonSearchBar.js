import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import PokemonThumbnail from './PokemonThumbnail'


const PokemonSearchBar = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [pokemonData, setPokemonData] = useState(null)

    const handleSearch = async () => {
        console.log('Performing search for: ', searchQuery);
        if (searchQuery !== '') {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
                setPokemonData(response.data);
                onSearch(response.data);
                console.log(response.data);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        }
    };
    

    return (
        <div className="searchBar">
            <div className="input-group" id="input-group">
                <div className="search-container">
                    <input type="text" name="" id="search-bar" placeholder='Search a pokemon' className='no-highlight' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            handleSearch()
                        }
                    }}/>
                </div>
                <div className="search-icon">
                    <button type="submit" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} id='search-icon'/>
                    </button>
                </div>
                <div className="sort-icon">
                    <button type="submit">
                        <FontAwesomeIcon icon={faSort} id='sort-icon'/>
                    </button>
                </div>
            </div>
                {pokemonData && (
                <PokemonThumbnail
                    id={pokemonData.id}
                    name={pokemonData.name}
                    image={pokemonData.sprites.front_default}
                    type={pokemonData.types[0].type.name}
                />
            )}
        </div>
    );
}

export default PokemonSearchBar;
