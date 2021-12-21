import React from 'react';

import { calculateRemainingEVs } from '../utils/utils';

const styles = {
  tableHead: {
    fontFamily: 'Staatliches',
  },
  button: {
    fontFamily: 'Staatliches',
  },
  tableTitle: {
    fontSize: '30px',
    fontFamily: 'Staatliches',
  },
  tableBody: {
    fontFamily: 'Staatliches',
  },
  tableRow: {
    backgroundColor: 'white',
  },
  sprite: {
    maxHeight: '35px',
  },
  td: {
    borderTop: '0.5em #eeeeee solid',
  }
};

function PokemonTable({ pokemonArray }) {

  function getEVClassColor(ev) {
    if (ev > 0 && ev < 252) {
      return 'text-primary';
    } else if (ev >= 252) {
      return 'text-success';
    }
  }

  return (
    <>
      <div className="row mb-3">
        <div style={styles.tableTitle} className="col-6 my-auto">
          Your Pokémon
        </div>
        <div className="col-6 text-right my-auto">
          <a
            style={styles.button}
            type="button"
            className="btn btn-success ml-auto"
            href="/addPokemon"
          >
            Add New Pokémon +
          </a>
        </div>
      </div>
      <table className="table">
        <thead style={styles.tableHead} className="thead">
          <tr>
            <th scope="col" width="20%">
              Pokémon
            </th>
            <th scope="col" width="10%">
              HP
            </th>
            <th scope="col" width="10%">
              ATK
            </th>
            <th scope="col" width="10%">
              DEF
            </th>
            <th scope="col" width="10%">
              SPATK
            </th>
            <th scope="col" width="10%">
              SPDEF
            </th>
            <th scope="col" width="10%">
              SPD
            </th>
            <th scope="col" width="10%">
              REMAINING EVs
            </th>
          </tr>
        </thead>
        <tbody style={styles.tableBody}>
          {pokemonArray.map((pokemon) => {
            return (
              <tr style={styles.tableRow}>
                <td style={styles.td}>
                  {pokemon.sprite ? (
                    <img
                      style={styles.sprite}
                      className="mr-1"
                      src={pokemon.sprite}
                      alt={pokemon.name + ' sprite'}
                    />
                  ) : null}
                  {pokemon.nickname ? pokemon.nickname : pokemon.name}
                </td>
                <td style={styles.td} className={`${getEVClassColor(pokemon.hp)}`}>{pokemon.hp}</td>
                <td style={styles.td} className={`${getEVClassColor(pokemon.atk)}`}>{pokemon.atk}</td>
                <td style={styles.td} className={`${getEVClassColor(pokemon.def)}`}>{pokemon.def}</td>
                <td style={styles.td} className={`${getEVClassColor(pokemon.spatk)}`}>
                  {pokemon.spatk}
                </td>
                <td style={styles.td} className={`${getEVClassColor(pokemon.spdef)}`}>
                  {pokemon.spdef}
                </td>
                <td style={styles.td} className={`${getEVClassColor(pokemon.spd)}`}>{pokemon.spd}</td>
                <td style={styles.td}>{calculateRemainingEVs(pokemon)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default PokemonTable;
