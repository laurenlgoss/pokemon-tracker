import React, { useState, useEffect } from 'react';

import capitalizeFirstLetter from '../utils/utils';

const styles = {
  pageTitle: {
    fontSize: '30px',
    fontFamily: 'Staatliches',
  },
  topRow: {
    minHeight: '150px',
  },
  sprite: {
    height: '100%',
  },
};

function AddPokemon() {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
      .then((results) => results.json())
      .then((pokemonData) => {
        const pokemon = pokemonData.results;
        console.log(pokemon);
        setPokemonArray(pokemon);
      });
  }, []);

  // When user selects Pokémon, fetch that Pokémon's data from PokéAPI
  function handleSelect(event) {
    const { value } = event.target;
    console.log(value);

    fetch(value)
      .then((results) => results.json())
      .then((pokemonData) => {
        console.log(pokemonData);
        setSelectedPokemon(pokemonData);
      });
  }

  return (
    <>
      <div style={styles.topRow} className="row">
        <div className="col-6">
          <div className="row text-right">
            <div style={styles.pageTitle} className="col-12">
              Add New Pokémon
            </div>
            <div className="col-12">
              <select className="form-select" onChange={handleSelect}>
                <option></option>
                {pokemonArray.map((pokemonData) => {
                  return (
                    <option key={pokemonData.name} value={pokemonData.url}>
                      {capitalizeFirstLetter(pokemonData.name)}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="col-6">
          {selectedPokemon ? (
            <img
              style={styles.sprite}
              alt={capitalizeFirstLetter(selectedPokemon.name) + ' sprite'}
              src={selectedPokemon.sprites.front_default}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default AddPokemon;
