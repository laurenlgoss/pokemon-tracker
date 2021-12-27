import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_POKEMON } from '../utils/queries';

import {
  capitalizeFirstLetter,
  calculateRemainingEVs,
  getNatureClassName,
} from '../utils/utils';

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
  checkbox: {
    // webkitTransform: 'scale(2)',
    margin: '0',
  },
};

function EditPokemon() {
  const [natureArray, setNatureArray] = useState([]);

  // Query single Pokémon data using params passed through url
  const { pokemonId: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_POKEMON, {
    variables: { pokemonId: userParam },
  });
  const pokemonData = data?.pokemon || {};
  console.log(pokemonData);

  // Hardcoded username for now because auth not working...
  const [formData, setFormData] = useState({
    species: '',
    nature: '',
    nickname: '',
    sprite: '',
    associatedUser: 'lgoss',
    hp: {
      ev: '0',
      bestIv: false,
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
    // Fetch nature data
    fetch('https://pokeapi.co/api/v2/nature?limit=50')
      .then((results) => results.json())
      .then((natureData) => {
        const nature = natureData.results;
        console.log(nature);
        setNatureArray(nature);
      });
  }, []);

  // Needed because the API stat name is different than my variables
  function translateStatName(stat) {
    let newStatName;

    switch (stat) {
      case 'attack':
        newStatName = 'atk';
        break;
      case 'defense':
        newStatName = 'def';
        break;
      case 'special-attack':
        newStatName = 'spatk';
        break;
      case 'special-defense':
        newStatName = 'spdef';
        break;
      case 'speed':
        newStatName = 'spd';
        break;
      default:
        newStatName = null;
    }
    return newStatName;
  }

  async function handleFormChange(event) {
    let { name, value, checked } = event.target;

    // Nature
    if (name === 'nature') {
      // Empty out nature value if user chooses 'Nature'
      if (!value) {
        setFormData({
          ...formData,
          [name]: '',
          atk: { ...formData.atk, nature: null },
          def: { ...formData.def, nature: null },
          spatk: { ...formData.spatk, nature: null },
          spdef: { ...formData.spdef, nature: null },
          spd: { ...formData.spd, nature: null },
        });
        console.log(formData);
      } else {
        const natureData = await fetchData(value);
        console.log(natureData);

        // Need this check because some natures don't affect stats
        if (!natureData.increased_stat || !natureData.decreased_stat) {
          setFormData({
            ...formData,
            [name]: capitalizeFirstLetter(natureData.name),
            atk: { ...formData.atk, nature: null },
            def: { ...formData.def, nature: null },
            spatk: { ...formData.spatk, nature: null },
            spdef: { ...formData.spdef, nature: null },
            spd: { ...formData.spd, nature: null },
          });
          console.log(formData);
        } else {
          let decreasedStat = translateStatName(natureData.decreased_stat.name);
          let increasedStat = translateStatName(natureData.increased_stat.name);

          setFormData({
            ...formData,
            [name]: capitalizeFirstLetter(natureData.name),
            atk: { ...formData.atk, nature: null },
            def: { ...formData.def, nature: null },
            spatk: { ...formData.spatk, nature: null },
            spdef: { ...formData.spdef, nature: null },
            spd: { ...formData.spd, nature: null },
            [decreasedStat]: { ...formData[decreasedStat], nature: false },
            [increasedStat]: { ...formData[increasedStat], nature: true },
          });
          console.log(formData);
        }
      }
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
      if (value > 255) {
        value = 255;
      }
      if (value < 0) {
        value = 0;
      }
      // Ensure no numbers start with a zero
      if (value.split('')[0] === '0' && value.split('').length > 1) {
        value = value.split('')[1];
      }

      setFormData({ ...formData, [name]: { ...formData[name], ev: value } });
      console.log(formData);
    }

    // IVs
    else if (name.split(' ')[1] === 'bestIv') {
      name = name.split(' ')[0];
      setFormData({
        ...formData,
        [name]: { ...formData[name], bestIv: checked },
      });
      console.log(formData);
    }

    // Any other inputs
    else {
      setFormData({ ...formData, [name]: value });
      console.log(formData);
    }
  }

  // TODO: Add form input validation
  function handleFormSubmit(event) {
    try {
      // const { data } = addPokemon({
      //   variables: { pokemon: formData },
      // });
      //   setFormData(initialFormState);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-4 ml-auto">
              <div className="row text-right">
                <div className="col-12">
                  <div style={styles.pageTitle} className="mt-2">
                    <strong>Edit</strong>{' '}
                    {formData.nickname ? formData.nickname : formData.species}
                  </div>

                  {/* Species */}
                  <input
                    style={styles.input}
                    className="form-control mt-2"
                    name="species"
                    value={formData.species}
                    disabled
                  />

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
                    value={formData.nickname}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>

            {/* Sprite */}
            <div className="col-4 mr-auto">
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
            <div className="col-8 mx-auto">
              <div style={styles.card} className="card p-3">
                <table className="table">
                  <thead className="thead">
                    <th style={styles.tableTitle} scope="col" width="20%">
                      Stat
                    </th>
                    <th style={styles.tableTitle} scope="col">
                      Current EVs
                    </th>
                    <th style={styles.tableTitle} scope="col"></th>
                    <th style={styles.tableTitle} scope="col">
                      Added EVs
                    </th>
                    <th style={styles.tableTitle} scope="col"></th>
                    <th style={styles.tableTitle} scope="col">
                      New EVs
                    </th>
                    <th style={styles.tableTitle} width="15%">
                      Best IV?
                    </th>
                  </thead>
                  <tbody>
                    {/* HP */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.hp.nature
                        )}`}
                      >
                        HP
                      </td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="hp"
                          value={pokemonData.hp.ev}
                          disabled
                        />
                      </td>
                      <td>+</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="hp"
                          onChange={handleFormChange}
                          value={formData.hp.ev}
                        />
                      </td>
                      <td>=</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="hp"
                          value={pokemonData.hp.ev}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="hp bestIv"
                          onChange={handleFormChange}
                        />
                      </td>
                    </tr>

                    {/* ATK */}
                    <tr>
                      <td style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.atk.nature
                        )}`}>ATK</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="atk"
                          value={pokemonData.atk.ev}
                          disabled
                        />
                      </td>
                      <td>+</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="atk"
                          onChange={handleFormChange}
                          value={formData.atk.ev}
                        />
                      </td>
                      <td>=</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="atk"
                          value={pokemonData.atk.ev}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="atk bestIv"
                          onChange={handleFormChange}
                        />
                      </td>
                    </tr>

                    {/* DEF */}
                    <tr>
                      <td style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.def.nature
                        )}`}>DEF</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="def"
                          value={pokemonData.def.ev}
                          disabled
                        />
                      </td>
                      <td>+</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="def"
                          onChange={handleFormChange}
                          value={formData.def.ev}
                        />
                      </td>
                      <td>=</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="def"
                          value={pokemonData.def.ev}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="def bestIv"
                          onChange={handleFormChange}
                        />
                      </td>
                    </tr>

                    {/* SPATK */}
                    <tr>
                      <td style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.spatk.nature
                        )}`}>SPATK</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spatk"
                          value={pokemonData.spatk.ev}
                          disabled
                        />
                      </td>
                      <td>+</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spatk"
                          onChange={handleFormChange}
                          value={formData.spatk.ev}
                        />
                      </td>
                      <td>=</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spatk"
                          value={pokemonData.spatk.ev}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="spatk bestIv"
                          onChange={handleFormChange}
                        />
                      </td>
                    </tr>

                    {/* SPDEF */}
                    <tr>
                      <td style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.spdef.nature
                        )}`}>SPDEF</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spdef"
                          value={pokemonData.spdef.ev}
                          disabled
                        />
                      </td>
                      <td>+</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spdef"
                          onChange={handleFormChange}
                          value={formData.spdef.ev}
                        />
                      </td>
                      <td>=</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spdef"
                          value={pokemonData.spdef.ev}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="spdef bestIv"
                          onChange={handleFormChange}
                        />
                      </td>
                    </tr>

                    {/* SPD */}
                    <tr>
                      <td style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.spd.nature
                        )}`}>SPD</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spd"
                          value={pokemonData.spd.ev}
                          disabled
                        />
                      </td>
                      <td>+</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spd"
                          onChange={handleFormChange}
                          value={formData.spd.ev}
                        />
                      </td>
                      <td>=</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spd"
                          value={pokemonData.spd.ev}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="spd bestIv"
                          onChange={handleFormChange}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td style={styles.td}>Remaining EVs</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
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
        </form>
      )}
    </>
  );
}

export default EditPokemon;
