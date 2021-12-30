import React from 'react';

import Auth from '../utils/auth';

import PokemonTableRow from '../components/PokemonTableRow';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POKEMONS } from '../utils/queries';
import { DELETE_POKEMON } from '../utils/mutations';

const styles = {
  tableHead: {
    fontFamily: 'Staatliches',
    position: 'sticky',
    top: '0',
    zIndex: '1',
    backgroundColor: '#eeeeee',
  },
  button: {
    fontFamily: 'Staatliches',
  },
  table: {
    maxHeight: '65vh',
    overflowY: 'scroll',
  },
  tableTitle: {
    fontSize: '30px',
    fontFamily: 'Staatliches',
  },
  tableBody: {
    fontFamily: 'Staatliches',
  },
};

function PokemonTable() {
  // Get current user's Pokémon
  const { loading, data } = useQuery(QUERY_POKEMONS, {
    variables: { username: Auth.getProfile().data.username },
  });
  const pokemonArray = data?.pokemons.pokemon || [];

  const [deletePokemon] = useMutation(DELETE_POKEMON);

  async function handleDelete(pokemonId) {
    try {
      await deletePokemon({
        variables: { pokemonId },
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
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
          {pokemonArray.length === 0 ? (
            <h5 className="text-center mt-5">No Pokémon added yet...</h5>
          ) : (
            <div style={styles.table}>
              <table className="table">
                <thead style={styles.tableHead} className="thead">
                  <tr>
                    <th scope="col" width="25%">
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
                    <th width="5%"></th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {pokemonArray.map((pokemon) => {
                    return (
                      <PokemonTableRow
                        pokemon={pokemon}
                        handleDelete={handleDelete}
                        key={pokemon._id}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PokemonTable;
