import React from 'react';

import Auth from '../utils/auth';

import PokemonTable from '../components/PokemonTable';
import Welcome from '../components/Welcome';

function Home() {
  return <>{Auth.loggedIn() ? <PokemonTable /> : <Welcome />}</>;
}

export default Home;
