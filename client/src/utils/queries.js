import { gql } from '@apollo/client';

export const QUERY_POKEMON = gql`
  query pokemon($pokemonId: ID!) {
    pokemon(_id: $pokemonId!) {
      _id: ID
      species: String
      nature: String
      nickname: String
      sprite: String
      hp: {
        ev: String
        bestIv: Boolean
      }
      atk: {
        ev: String
        bestIv: Boolean
        nature: Boolean
      }
      def: {
        ev: String
        bestIv: Boolean
        nature: Boolean
      }
      spatk: {
        ev: String
        bestIv: Boolean
        nature: Boolean
      }
      spdef: {
        ev: String
        bestIv: Boolean
        nature: Boolean
      }
      spd: {
        ev: String
        bestIv: Boolean
        nature: Boolean
      }
    }
  }
`;

export const QUERY_POKEMONS = gql`
  query pokemons {
    pokemons {
      _id: ID
      species: String
      nature: String
      nickname: String
      sprite: String
      hp: {
        ev: String
        bestIv: Boolean
      }
      atk: {
        ev: String
        bestIv: Boolean
        nature: Boolean
      }
      def: {
        ev: String
        bestIv: Boolean
        nature: Boolean
      }
      spatk: {
        ev: String
        bestIv: Boolean
        nature: Boolean
      }
      spdef: {
        ev: String
        bestIv: Boolean
        nature: Boolean
      }
      spd: {
        ev: String
        bestIv: Boolean
        nature: Boolean
      }
    }
  }
`;
