import React from 'react';

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
};

function PokemonTable({ pokemonArray }) {
  return (
    <>
      <div class="row mb-3">
        <div style={styles.tableTitle} class="col-6 my-auto">
          Your Pokémon
        </div>
        <div class="col-6 text-right my-auto">
          <button
            style={styles.button}
            type="button"
            class="btn btn-success ml-auto"
          >
            Add New Pokémon +
          </button>
        </div>
      </div>
      <table class="table">
        <thead style={styles.tableHead} class="thead">
          <tr>
            <th scope="col">Pokémon</th>
            <th scope="col">HP</th>
            <th scope="col">ATK</th>
            <th scope="col">DEF</th>
            <th scope="col">SPATK</th>
            <th scope="col">SPDEF</th>
            <th scope="col">SPD</th>
            <th scope="col" width="10%">
              REMAINING EVs
            </th>
          </tr>
        </thead>
        <tbody style={styles.tableBody}>
          {pokemonArray.map((pokemon) => {
            return (
              <tr>
                {pokemon.nickname ? (
                  <td>{pokemon.nickname}</td>
                ) : (
                  <td>{pokemon.name}</td>
                )}
                <td>{pokemon.hp}</td>
                <td>{pokemon.atk}</td>
                <td>{pokemon.def}</td>
                <td>{pokemon.spatk}</td>
                <td>{pokemon.spdef}</td>
                <td>{pokemon.spd}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default PokemonTable;
