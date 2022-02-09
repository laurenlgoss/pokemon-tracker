import { gql } from '@apollo/client';

export const QUERY_POKEMON = gql`
  query pokemon($pokemonId: ID!) {
    pokemon(pokemonId: $pokemonId) {
      _id
      species
      nature
      nickname
      sprite
      associatedUser
      hp {
        ev
        bestIv
        goalEv
      }
      atk {
        ev
        bestIv
        nature
        goalEv
      }
      def {
        ev
        bestIv
        nature
        goalEv
      }
      spatk {
        ev
        bestIv
        nature
        goalEv
      }
      spdef {
        ev
        bestIv
        nature
        goalEv
      }
      spd {
        ev
        bestIv
        nature
        goalEv
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
          goalEv
        }
        atk {
          ev
          bestIv
          nature
          goalEv
        }
        def {
          ev
          bestIv
          nature
          goalEv
        }
        spatk {
          ev
          bestIv
          nature
          goalEv
        }
        spdef {
          ev
          bestIv
          nature
          goalEv
        }
        spd {
          ev
          bestIv
          nature
          goalEv
        }
      }
    }
  }
`;
