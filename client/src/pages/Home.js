import React from 'react';

import PokemonTable from '../components/PokemonTable';

function Home() {
  // Hardcoded pokémon for now
  const charizard = {
    name: 'Charizard',
    nickname: '',
    hp: 10,
    atk: 20,
    def: 30,
    spatk: 40,
    spdef: 50,
    spd: 60,
  };
  const mienshao = {
    name: 'Mienshao',
    nickname: '',
    hp: 10,
    atk: 20,
    def: 30,
    spatk: 40,
    spdef: 50,
    spd: 60,
  };
  const pokemonArray = [charizard, mienshao];

  return (
    <div class="row my-5">
      <div class="col-11 mx-auto">
        <PokemonTable pokemonArray={pokemonArray} />
      </div>
    </div>
  );
}

export default Home;
