import React from 'react';
import './PokemonDetailCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const PokemonDetailCard = ({ pokemonData, onClose }) => {
    const style = `detail-container ${pokemonData.types[0].type.name}`

    return (
        <div className={style}>
            <div className="detail-card">
                <div className="pokemon-image">
                    <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
                    <div className="image-details">
                        <h2>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
                        <h2 id='id'>#0{pokemonData.id}</h2>
                    </div>
                </div>
                <div className="stats">
                    <p><b>Type:</b> {pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1)}</p>
                    <p><b>Height:</b> {pokemonData.height/10} m</p>
                    <p><b>Weight:</b> {pokemonData.weight/10} kg</p>
                    <p><b>Base EXP:</b> {pokemonData.base_experience}</p>
                    <p><b>HP:</b> {pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                    <p><b>Attack:</b> {pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                    <p><b>Defense:</b> {pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                    <p><b>Special Attack:</b> {pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat}</p>
                    <p><b>Special Defense:</b> {pokemonData.stats.find(stat => stat.stat.name === 'special-defense').base_stat}</p>
                    <p><b>Speed:</b> {pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
                </div>
            </div>
            <button onClick={onClose}><FontAwesomeIcon icon={faClose} id="search-icon" /></button>
        </div>
    );
};

export default PokemonDetailCard;
