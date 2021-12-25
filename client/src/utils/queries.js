import { gql } from '@apollo/client';

export const QUERY_POKEMON = gql`
  query pokemon($pokemonId: ID!) {
    pokemon(pokemonId: $pokemonId) {
      _id
      species
      nature
      nickname
      sprite
      hp {
        ev
        bestIv
      }
      atk {
        ev
        bestIv
        nature
      }
      def {
        ev
        bestIv
        nature
      }
      spatk {
        ev
        bestIv
        nature
      }
      spdef {
        ev
        bestIv
        nature
      }
      spd {
        ev
        bestIv
        nature
      }
    }
  }
`;

export const QUERY_POKEMONS = gql`
  query pokemons($username: String!) {
    pokemons(username: $username) {
      pokemon {
        _id
        species
        nature
        nickname
        sprite
        hp {
          ev
          bestIv
        }
        atk {
          ev
          bestIv
          nature
        }
        def {
          ev
          bestIv
          nature
        }
        spatk {
          ev
          bestIv
          nature
        }
        spdef {
          ev
          bestIv
          nature
        }
        spd {
          ev
          bestIv
          nature
        }
      }
    }
  }
`;
