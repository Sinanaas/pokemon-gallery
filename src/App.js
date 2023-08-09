import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import PokemonThumbnail from './components/PokemonThumbnail'

const App = () => {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=40')

  const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)

    function createPokemonObject(result) {
      result.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemons(currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
        // await console.log(allPokemons)
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
              name={pokemon.name}
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
