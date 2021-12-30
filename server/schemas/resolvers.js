const { AuthenticationError } = require('apollo-server-express');
const { User, Pokemon } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get all pokemon from specific user
    pokemons: async (parent, { username }, context) => {
      // console.log(context);
      // const username = context.user.username;
      // console.log('username' + username);

      return User.findOne({ username }).populate({
        path: 'pokemon',
        options: { sort: { createdAt: -1 } },
      });
    },

    // Get specific pokemon
    pokemon: async (parent, { pokemonId }) => {
      return Pokemon.findOne({ _id: pokemonId });
    },
  },

  Mutation: {
    // Sign up
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // Login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // Add Pokémon
    addPokemon: async (parent, { pokemon }) => {
      const {
        species,
        nature,
        nickname,
        sprite,
        associatedUser,
        hp,
        atk,
        def,
        spatk,
        spdef,
        spd,
      } = pokemon;

      const newPokemon = await Pokemon.create({
        species,
        nature,
        nickname,
        sprite,
        associatedUser,
        hp,
        atk,
        def,
        spatk,
        spdef,
        spd,
      });

      await User.findOneAndUpdate(
        { username: associatedUser },
        { $addToSet: { pokemon: newPokemon._id } }
      );

      return newPokemon;
    },

    // Update Pokémon
    updatePokemon: async (parent, { pokemon }) => {
      const {
        species,
        nature,
        nickname,
        sprite,
        associatedUser,
        hp,
        atk,
        def,
        spatk,
        spdef,
        spd,
      } = pokemon;

      const updatedPokemon = await Pokemon.findByIdAndUpdate(
        { _id: pokemon._id },
        {
          species,
          nature,
          nickname,
          sprite,
          associatedUser,
          hp,
          atk,
          def,
          spatk,
          spdef,
          spd,
        }
      );

      return updatedPokemon;
    },

    // Delete Pokémon
    deletePokemon: async (parent, { pokemonId }, context) => {
      await Pokemon.findByIdAndDelete({ _id: pokemonId });

      const updatedUser = await User.findOne({
        username: context.user.username,
      });

      return updatedUser;
    },
  },
};

module.exports = resolvers;
