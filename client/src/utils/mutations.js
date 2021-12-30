import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POKEMON = gql`
  mutation addPokemon($pokemon: PokemonData!) {
    addPokemon(pokemon: $pokemon) {
      _id
    }
  }
`;

export const UPDATE_POKEMON = gql`
  mutation updatePokemon($pokemon: UpdatePokemonData!) {
    updatePokemon(pokemon: $pokemon) {
      _id
    }
  }
`;

export const DELETE_POKEMON = gql`
  mutation deletePokemon($pokemonId: ID!) {
    deletePokemon(pokemonId: $pokemonId) {
      username
      pokemon {
        species
        nickname
      }
    }
  }
`
