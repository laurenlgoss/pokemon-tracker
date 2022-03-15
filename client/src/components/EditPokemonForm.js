import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { UPDATE_POKEMON } from '../utils/mutations';

import {
  capitalizeFirstLetter,
  calculateRemainingEVs,
  getNatureClassName,
  translateStatName,
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

function EditPokemonForm({ pokemonData, natureArray, pokemonArray }) {
  // Get different forms of selected Pokémon species (Gigantamax, Mega, etc.)
  const differentPokemonForms = pokemonArray.filter((pokemon) => {
    return pokemonData.species.split('-')[0].toLowerCase() === pokemon.name.split('-')[0];
  });

  const [formData, setFormData] = useState(pokemonData);
  const [addedEVs, setAddedEVs] = useState({
    hp: {
      ev: '0',
    },
    atk: {
      ev: '0',
    },
    def: {
      ev: '0',
    },
    spatk: {
      ev: '0',
    },
    spdef: {
      ev: '0',
    },
    spd: {
      ev: '0',
    },
  });

  const [updatePokemon, { loading, data }] = useMutation(UPDATE_POKEMON);

  let remainingGoalEVs = calculateRemainingEVs(
    formData.hp.goalEv,
    formData.atk.goalEv,
    formData.def.goalEv,
    formData.spatk.goalEv,
    formData.spdef.goalEv,
    formData.spd.goalEv
  );

  async function fetchData(url) {
    const results = await fetch(url);
    const data = results.json();
    return data;
  }

  // TODO: Add form input validation
  async function handleFormChange(event) {
    let { name, value, checked } = event.target;

    // --- Nature ---
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
        }
      }
    }

    // --- Species/Sprite ---
    else if (name === 'species') {
      // Empty out species value if user chooses 'Species'
      if (!value) {
        setFormData({ ...formData, [name]: '' });
      } else {
        const pokemonData = await fetchData(value);
        console.log(pokemonData);

        // Update sprite/species formData state
        setFormData({
          ...formData,
          sprite: pokemonData.sprites.front_default,
          [name]: capitalizeFirstLetter(pokemonData.name),
        });
      }
    }

    // --- Stats ---
    else if (
      name.split(' ')[0] === 'hp' ||
      name.split(' ')[0] === 'atk' ||
      name.split(' ')[0] === 'def' ||
      name.split(' ')[0] === 'spatk' ||
      name.split(' ')[0] === 'spdef' ||
      name.split(' ')[0] === 'spd'
    ) {
      let statName = name.split(' ')[0];
      let inputType = name.split(' ')[1]; // Determine if ev, goalEv, or bestIv

      // --- EVs ---
      if (inputType === 'ev' || inputType === 'goalEv') {
        if (value > 255) {
          value = '255';
        } else if (!value) {
          value = '0';
        }
        // Ensure no numbers start with a zero
        if (value.split('')[0] === '0' && value.split('').length > 1) {
          value = value.split('')[1];
        }

        // --- Current EVs ---
        if (inputType === 'ev') {
          if (value < -255) {
            value = '-255';
          }

          // TODO: Ensure user can't add over 510 EVs
          const newEV = parseInt(pokemonData[statName].ev) + parseInt(value);
          if (newEV > 255 || newEV < 0) {
            return;
          }

          setAddedEVs({
            ...addedEVs,
            [statName]: { ...addedEVs[statName], ev: value },
          });

          setFormData({
            ...formData,
            [statName]: { ...formData[statName], ev: newEV.toString() },
          });
        }

        // --- Goal EVs ---
        if (inputType === 'goalEv') {
          if (value < 0) {
            value = '0';
          }

          // TODO: Ensure user can't add over 510 EVs
          setFormData({
            ...formData,
            [statName]: {
              ...formData[statName],
              [inputType]: value,
            },
          });
        }
      }

      // --- IVs ---
      else if (inputType === 'bestIv') {
        setFormData({
          ...formData,
          [statName]: { ...formData[statName], bestIv: checked },
        });
      }
    }

    // Any other inputs
    else {
      setFormData({ ...formData, [name]: value });
    }

    console.log(formData);
  }

  // TODO: Add form input validation
  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await updatePokemon({
        variables: { pokemon: formData },
      });

      window.location.assign(`/pokemon/${data.updatePokemon._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="row">
        <div className="col-4 ml-auto">
          <div className="row text-right">
            <div className="col-12">
              <div style={styles.pageTitle} className="mt-2">
                <strong>Edit</strong>{' '}
                {pokemonData.nickname
                  ? pokemonData.nickname
                  : pokemonData.species}
              </div>

              {/* Species */}
              {differentPokemonForms.length > 1 ? (
                <select
                  style={styles.input}
                  className="form-control mt-2"
                  name="species"
                  onChange={handleFormChange}
                >
                  {differentPokemonForms.map((pokemon) => {
                    return (
                      <option
                        key={pokemon.name}
                        value={pokemon.url}
                        selected={
                          formData.species.toLowerCase() === pokemon.name
                            ? true
                            : false
                        }
                      >
                        {capitalizeFirstLetter(pokemon.name)}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  style={styles.input}
                  className="form-control mt-2"
                  name="species"
                  value={formData.species}
                  disabled
                />
              )}

              {/* Nature */}
              <select
                style={styles.input}
                className="form-control mt-2"
                name="nature"
                onChange={handleFormChange}
              >
                {natureArray.map((natureData) => {
                  return (
                    <option
                      key={natureData.name}
                      value={natureData.url}
                      selected={
                        natureData.name === formData.nature.toLowerCase()
                          ? true
                          : false
                      }
                    >
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
            <a href={`/pokemon/${pokemonData._id}`}>
              <img
                style={styles.sprite}
                alt={capitalizeFirstLetter(formData.species) + ' sprite'}
                src={formData.sprite}
              />
            </a>
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
                <th style={styles.tableTitle} scope="col">
                  &nbsp;
                </th>
                <th style={styles.tableTitle} scope="col">
                  Goal EVs
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
                    className={`${getNatureClassName(formData.hp.nature)}`}
                  >
                    HP
                  </td>
                  {/* Current EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={pokemonData.hp.ev}
                      disabled
                    />
                  </td>
                  <td>+</td>
                  {/* Added EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="hp ev"
                      onChange={handleFormChange}
                      value={addedEVs.hp.ev}
                    />
                  </td>
                  <td>=</td>
                  {/* New EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={formData.hp.ev}
                      disabled
                    />
                  </td>
                  <td>&nbsp;</td>
                  {/* Goal EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="hp goalEv"
                      onChange={handleFormChange}
                      value={formData.hp.goalEv}
                    />
                  </td>
                  <td>
                    <input
                      style={styles.checkbox}
                      className="form-check-input"
                      type="checkbox"
                      name="hp bestIv"
                      checked={formData.hp.bestIv ? true : false}
                      onChange={handleFormChange}
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
                  {/* Current EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={pokemonData.atk.ev}
                      disabled
                    />
                  </td>
                  <td>+</td>
                  {/* Added EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="atk ev"
                      onChange={handleFormChange}
                      value={addedEVs.atk.ev}
                    />
                  </td>
                  <td>=</td>
                  {/* New EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={formData.atk.ev}
                      disabled
                    />
                  </td>
                  <td>&nbsp;</td>
                  {/* Goal EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="atk goalEv"
                      onChange={handleFormChange}
                      value={formData.atk.goalEv}
                    />
                  </td>
                  <td>
                    <input
                      style={styles.checkbox}
                      className="form-check-input"
                      type="checkbox"
                      name="atk bestIv"
                      checked={formData.atk.bestIv ? true : false}
                      onChange={handleFormChange}
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
                  {/* Current EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={pokemonData.def.ev}
                      disabled
                    />
                  </td>
                  <td>+</td>
                  {/* Added EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="def ev"
                      onChange={handleFormChange}
                      value={addedEVs.def.ev}
                    />
                  </td>
                  <td>=</td>
                  {/* New EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={formData.def.ev}
                      disabled
                    />
                  </td>
                  <td>&nbsp;</td>
                  {/* Goal EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="def goalEv"
                      onChange={handleFormChange}
                      value={formData.def.goalEv}
                    />
                  </td>
                  <td>
                    <input
                      style={styles.checkbox}
                      className="form-check-input"
                      type="checkbox"
                      name="def bestIv"
                      checked={formData.def.bestIv ? true : false}
                      onChange={handleFormChange}
                    />
                  </td>
                </tr>

                {/* SPATK */}
                <tr>
                  <td
                    style={styles.td}
                    className={`${getNatureClassName(formData.spatk.nature)}`}
                  >
                    SPATK
                  </td>
                  {/* Current EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={pokemonData.spatk.ev}
                      disabled
                    />
                  </td>
                  <td>+</td>
                  {/* Added EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="spatk ev"
                      onChange={handleFormChange}
                      value={addedEVs.spatk.ev}
                    />
                  </td>
                  <td>=</td>
                  {/* New EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={formData.spatk.ev}
                      disabled
                    />
                  </td>
                  <td>&nbsp;</td>
                  {/* Goal EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="spatk goalEv"
                      onChange={handleFormChange}
                      value={formData.spatk.goalEv}
                    />
                  </td>
                  <td>
                    <input
                      style={styles.checkbox}
                      className="form-check-input"
                      type="checkbox"
                      name="spatk bestIv"
                      checked={formData.spatk.bestIv ? true : false}
                      onChange={handleFormChange}
                    />
                  </td>
                </tr>

                {/* SPDEF */}
                <tr>
                  <td
                    style={styles.td}
                    className={`${getNatureClassName(formData.spdef.nature)}`}
                  >
                    SPDEF
                  </td>
                  {/* Current EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={pokemonData.spdef.ev}
                      disabled
                    />
                  </td>
                  <td>+</td>
                  {/* Added EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="spdef ev"
                      onChange={handleFormChange}
                      value={addedEVs.spdef.ev}
                    />
                  </td>
                  <td>=</td>
                  {/* New EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={formData.spdef.ev}
                      disabled
                    />
                  </td>
                  <td>&nbsp;</td>
                  {/* Goal EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="spdef goalEv"
                      onChange={handleFormChange}
                      value={formData.spdef.goalEv}
                    />
                  </td>
                  <td>
                    <input
                      style={styles.checkbox}
                      className="form-check-input"
                      type="checkbox"
                      name="spdef bestIv"
                      checked={formData.spdef.bestIv ? true : false}
                      onChange={handleFormChange}
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
                  {/* Current EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={pokemonData.spd.ev}
                      disabled
                    />
                  </td>
                  <td>+</td>
                  {/* Added EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="spd ev"
                      onChange={handleFormChange}
                      value={addedEVs.spd.ev}
                    />
                  </td>
                  <td>=</td>
                  {/* New EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      value={formData.spd.ev}
                      disabled
                    />
                  </td>
                  <td>&nbsp;</td>
                  {/* Goal EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="spd goalEv"
                      onChange={handleFormChange}
                      value={formData.spd.goalEv}
                    />
                  </td>
                  <td>
                    <input
                      style={styles.checkbox}
                      className="form-check-input"
                      type="checkbox"
                      name="spd bestIv"
                      checked={formData.spd.bestIv ? true : false}
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
                  <td></td>
                  <td style={styles.td}>
                    <div>{remainingGoalEVs}</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button style={styles.submitButton} className="btn btn-primary">
              Submit Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditPokemonForm;
