import React, { useState, useEffect } from 'react';

import capitalizeFirstLetter from '../utils/utils';

const styles = {
  pageTitle: {
    fontSize: '30px',
    fontFamily: 'Staatliches',
  },
};

function AddPokemon() {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState({});

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
      .then((results) => results.json())
      .then((pokemonData) => {
        const pokemon = pokemonData.results;
        console.log(pokemon);
        setPokemonArray(pokemon);
      });
  }, []);

  return (
    <>
      <div className="row mb-3">
        <div style={styles.pageTitle} className="col-6 my-auto">
          Add New Pokémon
        </div>
        {/* <div className="col-6 text-right my-auto">
          <a type="button" className="btn btn-success ml-auto" href="/addPokemon">
            Add New Pokémon +
          </a>
        </div> */}
      </div>
      <div className="row">
        <div className="col">
          <select className="form-select">
            <option></option>
            {pokemonArray.map((pokemonData) => {
              return (
                <option key={pokemonData.name} value={pokemonData.name}>
                  {capitalizeFirstLetter(pokemonData.name)}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
}

export default AddPokemon;
