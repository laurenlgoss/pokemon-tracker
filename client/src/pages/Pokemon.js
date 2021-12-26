import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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

function Pokemon() {
  //   const [pokemonData, setpokemonData] = useState({});

  // Query single Pokémon data using params passed through url
  const { pokemonId: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_POKEMON, {
    variables: { pokemonId: userParam },
  });
  const pokemonData = data?.pokemon || {};
  console.log(pokemonData);

  //   if (!loading) {
  //     setpokemonData(pokemonData);
  //     console.log(pokemonData);
  //   }

  // const [natureArray, setNatureArray] = useState([]);

  // useEffect(() => {
  //   // Fetch nature data
  //   fetch('https://pokeapi.co/api/v2/nature?limit=50')
  //     .then((results) => results.json())
  //     .then((natureData) => {
  //       const nature = natureData.results;
  //       console.log(nature);
  //       setNatureArray(nature);
  //     });
  // }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="row">
            <div className="col-3 ml-auto">
              <div className="row text-right">
                <div className="col-12">
                  <div style={styles.pageTitle} className="mt-2">
                    <strong>
                      {pokemonData.nickname
                        ? pokemonData.nickname
                        : pokemonData.species}
                    </strong>{' '}
                    Details
                  </div>

                  {/* Species */}
                  <input
                    style={styles.input}
                    className="form-control mt-2"
                    name="species"
                    value={pokemonData.species}
                    disabled
                  />

                  {/* Nature */}
                  <input
                    style={styles.input}
                    className="form-control mt-2"
                    name="nature"
                    value={pokemonData.nature}
                    disabled
                  />

                  {/* Nickname */}
                  <input
                    style={styles.input}
                    className="form-control mt-2"
                    placeholder="Nickname"
                    name="nickname"
                    value={
                      pokemonData.nickname
                        ? pokemonData.nickname
                        : 'No Nickname'
                    }
                    //   onChange={handleFormChange}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Sprite */}
            <div className="col-3 mr-auto">
              {pokemonData.sprite ? (
                <img
                  style={styles.sprite}
                  alt={capitalizeFirstLetter(pokemonData.species) + ' sprite'}
                  src={pokemonData.sprite}
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
                      Stat
                    </th>
                    <th style={styles.tableTitle} scope="col">
                      EVs
                    </th>
                    <th style={styles.tableTitle} width="15%">
                      Best IV?
                    </th>
                  </thead>
                  <tbody>
                    {/* HP */}
                    <tr>
                      <td style={styles.td}>HP</td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="hp"
                          // onChange={handleFormChange}
                          value={pokemonData.hp.ev}
                          disabled
                        />
                      </td>
                      <td>
                        {pokemonData.hp.bestIv ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : null}
                      </td>
                    </tr>

                    {/* ATK */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.atk.nature
                        )}`}
                      >
                        ATK
                      </td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="atk"
                          // onChange={handleFormChange}
                          value={pokemonData.atk.ev}
                          disabled
                        />
                      </td>
                      <td>
                      {pokemonData.atk.bestIv ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : null}
                      </td>
                    </tr>

                    {/* DEF */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.def.nature
                        )}`}
                      >
                        DEF
                      </td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="def"
                          // onChange={handleFormChange}
                          value={pokemonData.def.ev}
                          disabled
                        />
                      </td>
                      <td>
                      {pokemonData.def.bestIv ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : null}
                      </td>
                    </tr>

                    {/* SPATK */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.spatk.nature
                        )}`}
                      >
                        SPATK
                      </td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spatk"
                          // onChange={handleFormChange}
                          value={pokemonData.spatk.ev}
                          disabled
                        />
                      </td>
                      <td>
                      {pokemonData.spatk.bestIv ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : null}
                      </td>
                    </tr>

                    {/* SPDEF */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.spdef.nature
                        )}`}
                      >
                        SPDEF
                      </td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spdef"
                          // onChange={handleFormChange}
                          value={pokemonData.spdef.ev}
                          disabled
                        />
                      </td>
                      <td>
                      {pokemonData.spdef.bestIv ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : null}
                      </td>
                    </tr>

                    {/* SPD */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(
                          pokemonData.spd.nature
                        )}`}
                      >
                        SPD
                      </td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spd"
                          // onChange={handleFormChange}
                          value={pokemonData.spd.ev}
                          disabled
                        />
                      </td>
                      <td>
                      {pokemonData.spd.bestIv ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : null}
                      </td>
                    </tr>

                    <tr>
                      <td style={styles.td}>Remaining EVs</td>
                      <td style={styles.td}>
                        <div>
                          {calculateRemainingEVs(
                            pokemonData.hp.ev,
                            pokemonData.atk.ev,
                            pokemonData.def.ev,
                            pokemonData.spatk.ev,
                            pokemonData.spdef.ev,
                            pokemonData.spd.ev
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  style={styles.submitButton}
                  className="btn btn-warning"
                  // onClick={handleFormSubmit}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Pokemon;
