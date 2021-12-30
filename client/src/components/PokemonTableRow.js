import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { calculateRemainingEVs } from '../utils/utils';

const styles = {
  tableRow: {
    backgroundColor: 'white',
  },
  td: {
    borderTop: '0.5em #eeeeee solid',
  },
  link: {
    color: 'black',
  },
  sprite: {
    maxHeight: '35px',
  },
};

function PokemonTableRow({ pokemon, handleDelete }) {
  const statArray = [
    pokemon.hp,
    pokemon.atk,
    pokemon.def,
    pokemon.spatk,
    pokemon.spdef,
    pokemon.spd,
  ];

  function getEVClassColor(ev) {
    if (ev > 0 && ev < 252) {
      return 'text-warning';
    } else if (ev >= 252) {
      return 'text-success';
    }
  }

  function renderNatureIcon(nature) {
    if (nature) {
      return '+';
    } else if (nature === false) {
      return '-';
    } else {
      return null;
    }
  }

  return (
    <tr style={styles.tableRow}>
      <td style={styles.td}>
        <a style={styles.link} href={`/pokemon/${pokemon._id}`}>
          {pokemon.sprite ? (
            <img
              style={styles.sprite}
              className="mr-1"
              src={pokemon.sprite}
              alt={pokemon.species + ' sprite'}
            />
          ) : null}
          {pokemon.nickname ? pokemon.nickname : pokemon.species}
        </a>
      </td>
      {statArray.map(({ ev, nature }) => {
        return (
          <td style={styles.td} className={`${getEVClassColor(ev)}`}>
            {ev}
            {renderNatureIcon(nature)}
          </td>
        );
      })}
      <td style={styles.td}>
        {calculateRemainingEVs(
          pokemon.hp.ev,
          pokemon.atk.ev,
          pokemon.def.ev,
          pokemon.spatk.ev,
          pokemon.spdef.ev,
          pokemon.spd.ev
        )}
      </td>
      <td style={styles.td}>
        <button className="btn btn-danger" onClick={() => handleDelete(pokemon._id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
}

export default PokemonTableRow;
