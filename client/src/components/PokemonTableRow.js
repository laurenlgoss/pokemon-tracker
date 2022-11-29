import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { calculateTotalRemainingEVs, getEVClassColor } from '../utils/utils';

const styles = {
  tableRow: {
    backgroundColor: 'white',
  },
  td: {
    borderTop: '0.5em var(--background) solid',
  },
  link: {
    color: 'black',
  },
  sprite: {
    maxHeight: '35px',
  },
  goalEv: {
    color: 'var(--secondary)',
  },
  trashButton: {
    color: 'var(--accent)',
    backgroundColor: 'transparent',
    border: 'transparent',
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
      {statArray.map(({ ev, nature, goalEv }) => {
        return (
          <td
            style={styles.td}
            className={`text-${getEVClassColor(ev, goalEv)}`}
          >
            {ev}
            {renderNatureIcon(nature)}
            {goalEv !== ev ? (
              <span style={styles.goalEv} className="ml-2">
                {goalEv}
              </span>
            ) : null}
          </td>
        );
      })}
      <td style={styles.td}>
        {calculateTotalRemainingEVs(
          pokemon.hp.ev,
          pokemon.atk.ev,
          pokemon.def.ev,
          pokemon.spatk.ev,
          pokemon.spdef.ev,
          pokemon.spd.ev
        )}
      </td>
      <td style={styles.td}>
        <button
          style={styles.trashButton}
          className="btn"
          onClick={() => handleDelete(pokemon._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
}

export default PokemonTableRow;
