import React from 'react';

import PokemonTable from '../components/PokemonTable';

import charizardImg from '../images/charizard.png';
import mienshaoImg from '../images/mienshao.png';

function Home() {
  // Hardcoded pokémon for now
  const charizard = {
    name: 'Charizard',
    nickname: '',
    sprite: charizardImg,
    hp: 0,
    atk: 0,
    def: 4,
    spatk: 252,
    spdef: 0,
    spd: 252,
  };
  const mienshao = {
    name: 'Mienshao',
    nickname: '',
    sprite: mienshaoImg,
    hp: 4,
    atk: 252,
    def: 0,
    spatk: 0,
    spdef: 0,
    spd: 252,
  };
  const pokemonArray = [charizard, mienshao];

  return <PokemonTable pokemonArray={pokemonArray} />;
}

export default Home;
