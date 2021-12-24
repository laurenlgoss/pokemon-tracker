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

    // Add pokemon
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
    // addComment: async (parent, { thoughtId, commentText }, context) => {
    //   if (context.user) {
    //     return Pokemon.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $addToSet: {
    //           comments: { commentText, commentAuthor: context.user.username },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // removeThought: async (parent, { thoughtId }, context) => {
    //   if (context.user) {
    //     const Pokemon = await Pokemon.findOneAndDelete({
    //       _id: thoughtId,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { thoughts: Pokemon._id } }
    //     );

    //     return Pokemon;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    // removeComment: async (parent, { thoughtId, commentId }, context) => {
    //   if (context.user) {
    //     return Pokemon.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.user.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};

module.exports = resolvers;
