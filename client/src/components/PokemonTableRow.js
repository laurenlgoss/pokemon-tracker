import React from 'react';

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

function PokemonTableRow({ pokemon }) {
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
      <td style={styles.td} className={`${getEVClassColor(pokemon.hp.ev)}`}>
        {pokemon.hp.ev}
      </td>
      <td style={styles.td} className={`${getEVClassColor(pokemon.atk.ev)}`}>
        {pokemon.atk.ev}
        {renderNatureIcon(pokemon.atk.nature)}
      </td>
      <td style={styles.td} className={`${getEVClassColor(pokemon.def.ev)}`}>
        {pokemon.def.ev}
        {renderNatureIcon(pokemon.def.nature)}
      </td>
      <td style={styles.td} className={`${getEVClassColor(pokemon.spatk.ev)}`}>
        {pokemon.spatk.ev}
        {renderNatureIcon(pokemon.spatk.nature)}
      </td>
      <td style={styles.td} className={`${getEVClassColor(pokemon.spdef.ev)}`}>
        {pokemon.spdef.ev}
        {renderNatureIcon(pokemon.spdef.nature)}
      </td>
      <td style={styles.td} className={`${getEVClassColor(pokemon.spd.ev)}`}>
        {pokemon.spd.ev}
        {renderNatureIcon(pokemon.spd.nature)}
      </td>
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
    </tr>
  );
}

export default PokemonTableRow;
