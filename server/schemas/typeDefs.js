const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

  type Query {
    pokemons(username: String!): [Pokemon]
    pokemon(pokemonId: ID!): Pokemon
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
