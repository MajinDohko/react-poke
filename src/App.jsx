import { useEffect, useState } from 'react';
import './App.css';
import './App.css'
import './index.css'
function App () {
  const [nombre, setNombre] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    if(nombre) {
      getPokemon(nombre)
    }
  }, [nombre])

  const getPokemon = async (name) => {
    setError('');
    try {
      const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`)
      if(!response.ok){
        throw new Error("Pokemon no encontrado");
      }
      const data = await response.json()
      setPokemon(data)
    } catch (error) {
      setPokemon(null)
      setError(error.message)
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    getPokemon(nombre)
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor='nombre'>Nombre del pokmemon</label>
      <input
          type='text'
          id='nombre'
          placeholder='nombre'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type='submit'>Buscar</button>
      </form>
      {error && <h2 className='error'>Pokemon no encontrado</h2>}

      {pokemon && (
        <div className='pokemon'>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt='pokemon name' className='logo'/>
          <div className='pokemon-characteristics'>
            <h2>Altura: {pokemon.height} dm</h2>
            <h2>Peso: {pokemon.weight} hg</h2>
            <div class= 'pokemon-abilities'>
              <h2>Habilidades: </h2>
              <ul>
                {pokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
       )}

    </>
  )

};

export default App;
