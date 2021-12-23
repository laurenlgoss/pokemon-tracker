const db = require('../config/connection');
const { User, Pokemon } = require('../models');
const userSeeds = require('./userSeeds.json');
const pokemonSeeds = require('./pokemonSeeds.json');

db.once('open', async () => {
  try {
    await Pokemon.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < pokemonSeeds.length; i++) {
      const { _id, associatedUser } = await Pokemon.create(pokemonSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: associatedUser },
        {
          $addToSet: {
            pokemon: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
