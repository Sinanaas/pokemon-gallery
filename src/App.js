import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import PokemonThumbnail from './components/PokemonThumbnail'

const App = () => {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=22')

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
  }, [])

  return (
    <div className="App">
      <div className="header">
        <h1>Pokemon Gallery</h1>
      </div>
      <div className="pokemon-container">
        <div className="all-container">
          { allPokemons.map((pokemon, index) =>
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
            />
          ) }
        </div>
        <button className="load-more" onClick={() => getAllPokemons()} >Load more</button>
      </div>
    </div>
  );
}

export default App;
