import React, { useState, useEffect } from 'react';

import { capitalizeFirstLetter } from '../utils/utils';

const styles = {
  pageTitle: {
    fontSize: '30px',
    fontFamily: 'Staatliches',
  },
  sprite: {
    height: '100%',
    // background: 'white',
    // borderRadius: '50%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0px',
    border: 'none',
  },
  select: {
    fontFamily: 'Staatliches',
  },
  input: {
    fontFamily: 'Staatliches',
  },
  submitButton: {
    width: '100%',
    fontFamily: 'Staatliches',
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
      <div className="row">
        <div className="col-3 ml-auto">
          <div className="row text-right">
            <div className="col-12">
              <div style={styles.pageTitle} className="mt-2">
                Add New Pokémon
              </div>
              <select
                style={styles.select}
                className="form-control mt-2"
                onChange={handleSelect}
              >
                <option value="" selected></option>
                {pokemonArray.map((pokemonData) => {
                  return (
                    <option key={pokemonData.name} value={pokemonData.url}>
                      {capitalizeFirstLetter(pokemonData.name)}
                    </option>
                  );
                })}
              </select>
              <input
                style={styles.input}
                className="form-control mt-2"
                placeholder="Nickname"
              />
            </div>
          </div>
        </div>
        <div className="col-3 mr-auto">
          {selectedPokemon ? (
            <img
              style={styles.sprite}
              alt={capitalizeFirstLetter(selectedPokemon.name) + ' sprite'}
              src={selectedPokemon.sprites.front_default}
            />
          ) : null}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6 mx-auto">
          <div style={styles.card} className="card p-2">
            <table className="table">
              <thead className="thead">
                <th style={styles.input} scope="col" width="10%">
                  EVs
                </th>
                <th scope="col"></th>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.input}>HP:</td>
                  <td>
                    <input
                      style={styles.input}
                      className="form-control mb-2"
                      type="number"
                      value={0}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.input}>ATK:</td>
                  <td>
                    <input
                      style={styles.input}
                      className="form-control mb-2"
                      type="number"
                      value={0}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.input}>DEF:</td>
                  <td>
                    <input
                      style={styles.input}
                      className="form-control mb-2"
                      type="number"
                      value={0}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.input}>SPATK:</td>
                  <td>
                    <input
                      style={styles.input}
                      className="form-control mb-2"
                      type="number"
                      value={0}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.input}>SPDEF:</td>
                  <td>
                    <input
                      style={styles.input}
                      className="form-control mb-2"
                      type="number"
                      value={0}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.input}>SPD:</td>
                  <td>
                    <input
                      style={styles.input}
                      className="form-control mb-2"
                      type="number"
                      value={0}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button style={styles.submitButton} className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPokemon;
