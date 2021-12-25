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
  // Query single Pokémon data using params passed through url
  const { pokemonId: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_POKEMON, {
    variables: { pokemonId: userParam },
  });
  const pokemonData = data?.pokemon || {};
  console.log(pokemonData);

  const [natureArray, setNatureArray] = useState([]);

  const [formData, setFormData] = useState(pokemonData);

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
                    <strong>Edit</strong> Your Pokémon
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
                    value={formData.nature}
                    defaultValue={formData.nature}
                    //   onChange={handleFormChange}
                  >
                    <option value="">Nature</option>
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
                    //   onChange={handleFormChange}
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
                          value={formData.hp.ev}
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="hp bestIv"
                          // onChange={handleFormChange}
                          value={true}
                        />
                      </td>
                    </tr>

                    {/* ATK */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(formData.atk.nature)}`}
                      >
                        ATK
                      </td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="atk"
                          // onChange={handleFormChange}
                          value={formData.atk.ev}
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="atk bestIv"
                          // onChange={handleFormChange}
                          value={true}
                        />
                      </td>
                    </tr>

                    {/* DEF */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(formData.def.nature)}`}
                      >
                        DEF
                      </td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="def"
                          // onChange={handleFormChange}
                          value={formData.def.ev}
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="def bestIv"
                          // onChange={handleFormChange}
                          value={true}
                        />
                      </td>
                    </tr>

                    {/* SPATK */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(
                          formData.spatk.nature
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
                          value={formData.spatk.ev}
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="spatk bestIv"
                          // onChange={handleFormChange}
                          value={true}
                        />
                      </td>
                    </tr>

                    {/* SPDEF */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(
                          formData.spdef.nature
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
                          value={formData.spdef.ev}
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="spdef bestIv"
                          // onChange={handleFormChange}
                          value={true}
                        />
                      </td>
                    </tr>

                    {/* SPD */}
                    <tr>
                      <td
                        style={styles.td}
                        className={`${getNatureClassName(formData.spd.nature)}`}
                      >
                        SPD
                      </td>
                      <td style={styles.td}>
                        <input
                          className="form-control mb-2"
                          type="number"
                          name="spd"
                          // onChange={handleFormChange}
                          value={formData.spd.ev}
                        />
                      </td>
                      <td>
                        <input
                          style={styles.checkbox}
                          className="form-check-input"
                          type="checkbox"
                          name="spd bestIv"
                          // onChange={handleFormChange}
                          value={true}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td style={styles.td}>Remaining EVs</td>
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
                <button
                  style={styles.submitButton}
                  className="btn btn-success"
                  // onClick={handleFormSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EditPokemon;
