import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { calculateTotalRemainingEVs } from '../utils/utils';

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

  // Color EV text based on reached goal EV or not
  function getEVClassColor(ev, goalEv) {
    // If goal is reached OR EVs are maxed out w/o goal
    if (
      (ev === goalEv && goalEv !== '0') ||
      (ev === '252' && (!goalEv || goalEv === '0'))
    ) {
      return 'text-success';
    }
    // If EVs and goals do not match (over or under)
    else if (parseInt(ev) !== parseInt(goalEv) && goalEv && goalEv !== '0') {
      return 'text-warning';
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
      {statArray.map(({ ev, nature, goalEv }) => {
        return (
          <td style={styles.td} className={`${getEVClassColor(ev, goalEv)}`}>
            {ev}
            {renderNatureIcon(nature)}
            {goalEv !== '0' && goalEv !== ev ? (
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
