import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { UPDATE_POKEMON } from '../utils/mutations';

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

function EditPokemonForm({ pokemonData, natureArray }) {
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

  async function fetchData(url) {
    const results = await fetch(url);
    const data = results.json();
    return data;
  }

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
      if (value < -255) {
        value = -255;
      }
      // Ensure no numbers start with a zero
      if (value.split('')[0] === '0' && value.split('').length > 1) {
        value = value.split('')[1];
      }

      setAddedEVs({ ...addedEVs, [name]: { ...addedEVs[name], ev: value } });

      const newEV = parseInt(pokemonData[name].ev) + parseInt(value);
      setFormData({
        ...formData,
        [name]: { ...formData[name], ev: newEV.toString() },
      });
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
  async function handleFormSubmit(event) {
    event.preventDefault();
    console.log(formData);

    try {
      const { data } = await updatePokemon({
        variables: { pokemon: formData },
      });

    //   window.location.assign(`/pokemon/${data.updatePokemon._id}`);
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
                    className={`${getNatureClassName(formData.hp.nature)}`}
                  >
                    HP
                  </td>
                  {/* Current EVs */}
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
                  {/* Added EVs */}
                  <td style={styles.td}>
                    <input
                      className="form-control mb-2"
                      type="number"
                      name="hp"
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
                      name="hp"
                      value={formData.hp.ev}
                      disabled
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
                      name="atk"
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
                      name="atk"
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
                      name="atk"
                      value={formData.atk.ev}
                      disabled
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
                      name="def"
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
                      name="def"
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
                      name="def"
                      value={formData.def.ev}
                      disabled
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
                      name="spatk"
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
                      name="spatk"
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
                      name="spatk"
                      value={formData.spatk.ev}
                      disabled
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
                      name="spdef"
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
                      name="spdef"
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
                      name="spdef"
                      value={formData.spdef.ev}
                      disabled
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
                      name="spd"
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
                      name="spd"
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
                      name="spd"
                      value={formData.spd.ev}
                      disabled
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
  );
}

export default EditPokemonForm;
