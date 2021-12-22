import React, { useState, useEffect } from 'react';

import { capitalizeFirstLetter, calculateRemainingEVs } from '../utils/utils';

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
  input: {
    fontFamily: 'Staatliches',
  },
  submitButton: {
    width: '100%',
    fontFamily: 'Staatliches',
  },
  td: {
    padding: '0',
    fontFamily: 'Staatliches',
  },
  tableTitle: {
    fontSize: '25px',
    padding: '0em 0em 0.5em 0em',
    fontFamily: 'Staatliches',
  },
};

function AddPokemon() {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [natureArray, setNatureArray] = useState([]);

  const [formData, setFormData] = useState({
    species: '',
    nature: '',
    nickname: '',
    sprite: '',
    hp: {
      ev: '0',
      bestIv: false,
      nature: null,
    },
    atk: {
      ev: '0',
      bestIv: false,
      nature: null,
    },
    def: {
      ev: '0',
      bestIv: false,
      nature: null,
    },
    spatk: {
      ev: '0',
      bestIv: false,
      nature: null,
    },
    spdef: {
      ev: '0',
      bestIv: false,
      nature: null,
    },
    spd: {
      ev: '0',
      bestIv: false,
      nature: null,
    },
  });

  async function fetchData(url) {
    const results = await fetch(url);
    const data = results.json();
    return data;
  }

  useEffect(() => {
    // Fetch Pokémon species data
    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
      .then((results) => results.json())
      .then((pokemonData) => {
        const pokemon = pokemonData.results;
        console.log(pokemon);
        setPokemonArray(pokemon);
      });

    // Fetch nature data
    fetch('https://pokeapi.co/api/v2/nature?limit=50')
      .then((results) => results.json())
      .then((natureData) => {
        const nature = natureData.results;
        console.log(nature);
        setNatureArray(nature);
      });
  }, []);

  async function handleFormChange(event) {
    let { name, value } = event.target;

    // Nature
    if (name === 'nature') {
      const natureData = await fetchData(value);
      console.log(natureData);

      setFormData({ ...formData, [name]: natureData.name });
    }
    // Species/Sprite
    else if (name === 'species') {
      const pokemonData = await fetchData(value);
      console.log(pokemonData);

      // Update sprite/species formData state
      setFormData({
        ...formData,
        sprite: pokemonData.sprites.front_default,
        [name]: pokemonData.species.name,
      });
      console.log(formData);
    }
    // EVs
    else if (
      name === 'hp' ||
      name === 'atk' ||
      name === 'def' ||
      name === 'spatk' ||
      name === 'spdef' ||
      name === 'spd'
    ) {
      setFormData({ ...formData, [name]: { ...formData[name], ev: value } });
      console.log(formData);
    } else {
      setFormData({ ...formData, [name]: value });
      console.log(formData);
    }
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

              {/* Species */}
              <select
                style={styles.input}
                className="form-control mt-2"
                name="species"
                onChange={handleFormChange}
              >
                <option value="" selected>
                  Species
                </option>
                {pokemonArray.map((pokemonData) => {
                  return (
                    <option key={pokemonData.name} value={pokemonData.url}>
                      {capitalizeFirstLetter(pokemonData.name)}
                    </option>
                  );
                })}
              </select>

              {/* Nature */}
              <select
                style={styles.input}
                className="form-control mt-2"
                name="nature"
                onChange={handleFormChange}
              >
                <option value="" selected>
                  Nature
                </option>
                {natureArray.map((natureData) => {
                  return (
                    <option key={natureData.name} value={natureData.url}>
                      {capitalizeFirstLetter(natureData.name)}
                    </option>
                  );
                })}
              </select>

              {/* Nickname */}
              <input
                style={styles.input}
                className="form-control mt-2"
                placeholder="Nickname"
                name="nickname"
              />
            </div>
          </div>
        </div>

        {/* Sprite */}
        <div className="col-3 mr-auto">
          {formData.sprite ? (
            <img
              style={styles.sprite}
              alt={capitalizeFirstLetter(formData.species) + ' sprite'}
              src={formData.sprite}
            />
          ) : null}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6 mx-auto">
          <div style={styles.card} className="card p-3">
            <table className="table">
              <thead className="thead">
                <th style={styles.tableTitle} scope="col" width="20%">
                  EVs
                </th>
                <th scope="col"></th>
              </thead>
              <tbody>
                {/* HP */}
                <tr>
                  <td style={styles.td}>HP:</td>
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="hp"
                      onChange={handleFormChange}
                      value={formData.hp.ev}
                    />
                  </td>
                </tr>

                {/* ATK */}
                <tr>
                  <td style={styles.td}>ATK:</td>
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="atk"
                      onChange={handleFormChange}
                      value={formData.atk.ev}
                    />
                  </td>
                </tr>

                {/* DEF */}
                <tr>
                  <td style={styles.td}>DEF:</td>
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="def"
                      onChange={handleFormChange}
                      value={formData.def.ev}
                    />
                  </td>
                </tr>

                {/* SPATK */}
                <tr>
                  <td style={styles.td}>SPATK:</td>
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="spatk"
                      onChange={handleFormChange}
                      value={formData.spatk.ev}
                    />
                  </td>
                </tr>

                {/* SPDEF */}
                <tr>
                  <td style={styles.td}>SPDEF:</td>
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="spdef"
                      onChange={handleFormChange}
                      value={formData.spdef.ev}
                    />
                  </td>
                </tr>

                {/* SPD */}
                <tr>
                  <td style={styles.td}>SPD:</td>
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="spd"
                      onChange={handleFormChange}
                      value={formData.spd.ev}
                    />
                  </td>
                </tr>

                <tr>
                  <td style={styles.td}>Remaining EVs:</td>
                  <td style={styles.td}>
                    <div>
                      {calculateRemainingEVs(
                        formData.hp.ev,
                        formData.atk.ev,
                        formData.def.ev,
                        formData.spatk.ev,
                        formData.spdef.ev,
                        formData.spd.ev
                      )}
                    </div>
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
