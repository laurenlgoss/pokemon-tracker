const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const pokemonSchema = new Schema({
  species: {
    type: String,
  },
  nature: {
    type: String,
  },
  nickname: {
    type: String,
  },
  sprite: {
    type: String,
  },
  associatedUser: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  hp: {
    ev: {
      type: String,
    },
    bestIv: {
      type: Boolean,
    },
  },
  atk: {
    ev: {
      type: String,
    },
    bestIv: {
      type: Boolean,
    },
    nature: {
      type: Boolean,
    },
  },
  def: {
    ev: {
      type: String,
    },
    bestIv: {
      type: Boolean,
    },
    nature: {
      type: Boolean,
    },
  },
  spatk: {
    ev: {
      type: String,
    },
    bestIv: {
      type: Boolean,
    },
    nature: {
      type: Boolean,
    },
  },
  spdef: {
    ev: {
      type: String,
    },
    bestIv: {
      type: Boolean,
    },
    nature: {
      type: Boolean,
    },
  },
  spd: {
    ev: {
      type: String,
    },
    bestIv: {
      type: Boolean,
    },
    nature: {
      type: Boolean,
    },
  },
});

const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon;
