import React from 'react';

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
  goalEv: {
    color: 'rgb(197 197 197)',
  },
  trashButton: {
    color: '#ff004f',
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
    if (parseInt(ev) < parseInt(goalEv)) {
      return 'text-warning';
    } else if (ev === goalEv && goalEv !== '0') {
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
      {statArray.map(({ ev, nature, goalEv }) => {
        return (
          <td style={styles.td} className={`${getEVClassColor(ev, goalEv)}`}>
            {ev}
            {renderNatureIcon(nature)}
            {goalEv !== '0' && goalEv !== ev ? (
              <span style={styles.goalEv} class="ml-2">
                {goalEv}
              </span>
            ) : null}
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
