import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_POKEMON } from '../utils/queries';

import EditPokemonForm from '../components/EditPokemonForm';

function EditPokemon() {
  const [natureArray, setNatureArray] = useState([]);

  // Query single Pokémon data using params passed through url
  const { pokemonId: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_POKEMON, {
    variables: { pokemonId: userParam },
  });
  const pokemonData = data?.pokemon || {};
  console.log(pokemonData);

  useEffect(() => {
    // Fetch nature data
    fetch('https://pokeapi.co/api/v2/nature?limit=50')
      .then((results) => results.json())
      .then((natureData) => {
        const nature = natureData.results;
        console.log(nature);
        setNatureArray(nature);
      });
  }, []);

  return (
    <>
      {loading || natureArray === [] ? (
        <div className="text-center">Loading...</div>
      ) : (
        <EditPokemonForm pokemonData={pokemonData} natureArray={natureArray} />
      )}
    </>
  );
}

export default EditPokemon;
