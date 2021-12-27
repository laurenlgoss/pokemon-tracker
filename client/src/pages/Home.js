import React from 'react';

import Auth from '../utils/auth';

import PokemonTableRow from '../components/PokemonTableRow';

import { useQuery } from '@apollo/client';
import { QUERY_POKEMONS } from '../utils/queries';

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

function Home() {
  // console.log(Auth.getProfile().data);

  // Hardcoded username for now because auth isn't working...
  const { loading, data } = useQuery(QUERY_POKEMONS, {
    variables: { username: 'lgoss' },
  });
  const pokemonArray = data?.pokemons.pokemon || [];
  console.log(pokemonArray);

  return (
    <>
      {/* {
      Auth.loggedIn() ? ( */}

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
          <div style={styles.table}>
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
                  return <PokemonTableRow pokemon={pokemon} />;
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ) : (
        <div>Welcome Page</div>
      )
      } */}
    </>
  );
}

export default Home;
