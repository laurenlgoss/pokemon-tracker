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
    nature: '',
    hp: {
      ev: '0',
      bestIv: true,
      nature: null,
    },
    atk: {
      ev: '0',
      bestIv: false,
      nature: false,
    },
    def: {
      ev: '4',
      bestIv: true,
      nature: null,
    },
    spatk: {
      ev: '252',
      bestIv: true,
      nature: null,
    },
    spdef: {
      ev: '0',
      bestIv: true,
      nature: null,
    },
    spd: {
      ev: '252',
      bestIv: true,
      nature: true,
    },
  };
  const mienshao = {
    name: 'Mienshao',
    nickname: '',
    sprite: mienshaoImg,
    nature: '',
    hp: {
      ev: '4',
      bestIv: true,
      nature: null,
    },
    atk: {
      ev: '252',
      bestIv: true,
      nature: null,
    },
    def: {
      ev: '0',
      bestIv: true,
      nature: null,
    },
    spatk: {
      ev: '0',
      bestIv: false,
      nature: false,
    },
    spdef: {
      ev: '0',
      bestIv: true,
      nature: null,
    },
    spd: {
      ev: '252',
      bestIv: true,
      nature: true,
    },
  };
  const pokemonArray = [charizard, mienshao];

  return <PokemonTable pokemonArray={pokemonArray} />;
}

export default Home;
