import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import PokemonThumbnail from './components/PokemonThumbnail'
import PokemonSearchBar from './components/PokemonSearchBar'
import PokemonDetailCard from './components/PokemonDetailCard'

const App = () => {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=22')
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const handleSelectedPokemon = (pokemonData) => {
    setSelectedPokemon(pokemonData)
  }

  const getAllPokemons = async () => {
    const response = await axios.get(loadMore)
    const data = response.data
    setLoadMore(data.next)
    async function createPokemonObject(result) {
      const newData = await Promise.all(
        result.map( async (pokemon) => {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          return response.data
        })
      ) 

      console.log('newData: ', newData)

      setAllPokemons((currentList) => {
        const updatedList = [...currentList, ...newData]
        return updatedList.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

  useEffect(() => {
    getAllPokemons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <div className="header">
        <div className="banner">
          <a href="/App.js"><h1>Pokemon Gallery</h1></a>
        </div>
        <div className="search-bar">
          <PokemonSearchBar/>
        </div>
        {selectedPokemon && (
            <PokemonDetailCard
              pokemonData={selectedPokemon}
              onClose={() => setSelectedPokemon(null)}
            />
        )}
      </div>
      <div className="pokemon-container">
        <div className="all-container">
          { allPokemons.map((pokemon, index) =>
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              onClick={() => handleSelectedPokemon(pokemon)}
              key={index}
            />
          )}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()} >Load more</button>
      </div>
    </div>
  );
}

export default App;
