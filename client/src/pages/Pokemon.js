import React from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faStar } from '@fortawesome/free-solid-svg-icons';

import { useQuery } from '@apollo/client';
import { QUERY_POKEMON } from '../utils/queries';

import {
  capitalizeFirstLetter,
  calculateTotalRemainingEVs,
  calculateEVsUntilGoal,
  getNatureClassName,
  getEVClassColor,
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
    padding: '0.75em 0',
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
  shinyIcon: {
    color: 'var(--secondary)',
  },
  remainingEVTr: {
    borderTop: '1px solid var(--background)',
  },
};

function Pokemon() {
  // Query single Pokémon data using params passed through url
  const { pokemonId: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_POKEMON, {
    variables: { pokemonId: userParam },
  });
  const pokemonData = data?.pokemon || {};

  const statArray = ['hp', 'atk', 'def', 'spatk', 'spdef', 'spd'];

  return (
    <>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3 ml-auto">
              <div className="row text-right">
                <div className="col-12">
                  <div style={styles.pageTitle} className="mt-2">
                    {pokemonData.shiny ? (
                      <FontAwesomeIcon
                        style={styles.shinyIcon}
                        icon={faStar}
                        className="mr-1"
                      />
                    ) : null}
                    <strong>
                      {pokemonData.nickname
                        ? pokemonData.nickname
                        : pokemonData.species}
                    </strong>
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
                  {pokemonData.nickname ? (
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
                      disabled
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {/* Sprite */}
            <div className="col-md-5 col-lg-4 col-xl-3 mr-auto">
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
            <div className="col-md-10 col-lg-8 col-xl-6 mx-auto">
              <div style={styles.card} className="card p-3">
                <table className="table">
                  <thead className="thead">
                    <th style={styles.tableTitle} scope="col" width="20%">
                      Stat
                    </th>
                    <th style={styles.tableTitle} scope="col" colSpan={2}>
                      Current EVs
                    </th>
                    <th style={styles.tableTitle} scope="col" width="6%">
                      &nbsp;
                    </th>
                    <th style={styles.tableTitle} scope="col" width="15%">
                      Goal EVs
                    </th>
                    <th style={styles.tableTitle} scope="col" width="15%">
                      Best IV?
                    </th>
                  </thead>
                  <tbody>
                    {statArray.map((stat) => {
                      return (
                        <tr>
                          {/* Stat */}
                          <td
                            style={styles.td}
                            className={`${
                              stat !== 'hp'
                                ? getNatureClassName(pokemonData[stat].nature)
                                : ''
                            }`}
                          >
                            {stat}
                          </td>

                          {/* Current EVs */}
                          <td style={{ padding: '0.75em 0', width: '5%' }}>
                            {pokemonData[stat].ev}
                          </td>
                          <td style={styles.td}>
                            <div
                              className={`bg-${getEVClassColor(
                                pokemonData[stat].ev,
                                pokemonData[stat].goalEv
                              )}`}
                              style={{
                                height: '20px',
                                width: (pokemonData[stat].ev / 255) * 100 + '%',
                                borderTopRightRadius: '3px',
                                borderBottomRightRadius: '3px',
                              }}
                            ></div>
                          </td>

                          {/* EVs Until Goal */}
                          <td style={styles.td}>
                            {calculateEVsUntilGoal(
                              pokemonData[stat].ev,
                              pokemonData[stat].goalEv
                            )}
                          </td>

                          {/* Goal EVs */}
                          <td style={styles.td}>{pokemonData[stat].goalEv}</td>

                          {/* Best IV */}
                          <td style={styles.td}>
                            {pokemonData[stat].bestIv ? (
                              <FontAwesomeIcon icon={faCheck} />
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}

                    <tr style={styles.remainingEVTr}>
                      <td style={styles.td}>Remaining EVs</td>
                      {/* Remaining Current EVs */}
                      <td style={styles.td}>
                        <div>
                          {calculateTotalRemainingEVs(
                            pokemonData.hp.ev,
                            pokemonData.atk.ev,
                            pokemonData.def.ev,
                            pokemonData.spatk.ev,
                            pokemonData.spdef.ev,
                            pokemonData.spd.ev
                          )}
                        </div>
                      </td>
                      <td style={styles.td}></td>
                      <td style={styles.td}></td>
                      {/* Remaining Goal EVs */}
                      <td style={styles.td}>
                        <div>
                          {calculateTotalRemainingEVs(
                            pokemonData.hp.goalEv,
                            pokemonData.atk.goalEv,
                            pokemonData.def.goalEv,
                            pokemonData.spatk.goalEv,
                            pokemonData.spdef.goalEv,
                            pokemonData.spd.goalEv
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <a
                  style={styles.submitButton}
                  className="btn btn-warning"
                  type="button"
                  href={`/editPokemon/${pokemonData._id}`}
                >
                  Edit
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Pokemon;
