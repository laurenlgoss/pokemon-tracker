const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # --- Types ---
  type User {
    _id: ID
    username: String
    email: String
    password: String
    pokemon: [Pokemon]!
  }

  type Pokemon {
    _id: ID
    species: String
    nature: String
    nickname: String
    sprite: String
    associatedUser: String
    createdAt: String
    hp: hpStat
    atk: statWithNature
    def: statWithNature
    spatk: statWithNature
    spdef: statWithNature
    spd: statWithNature
  }

  type hpStat {
    ev: String
    bestIv: Boolean
  }

  type statWithNature {
    ev: String
    bestIv: Boolean
    nature: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  # --- Inputs ---
  input PokemonData {
    species: String
    nature: String
    nickname: String
    sprite: String
    associatedUser: String
    hp: hpStatData
    atk: statWithNatureData
    def: statWithNatureData
    spatk: statWithNatureData
    spdef: statWithNatureData
    spd: statWithNatureData
  }

  input UpdatePokemonData {
    _id: ID
    species: String
    nature: String
    nickname: String
    sprite: String
    associatedUser: String
    hp: hpStatData
    atk: statWithNatureData
    def: statWithNatureData
    spatk: statWithNatureData
    spdef: statWithNatureData
    spd: statWithNatureData
  }

  input hpStatData {
    ev: String
    bestIv: Boolean
  }

  input statWithNatureData {
    ev: String
    bestIv: Boolean
    nature: Boolean
  }

  # --- Queries ---
  type Query {
    pokemons(username: String!): User
    pokemon(pokemonId: ID!): Pokemon
  }

  # --- Mutations ---
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPokemon(pokemon: PokemonData!): Pokemon
    updatePokemon(pokemon: UpdatePokemonData!): Pokemon
  }
`;

module.exports = typeDefs;
