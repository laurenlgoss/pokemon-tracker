import React from 'react';

const styles = {
    pageTitle: {
        fontSize: '30px',
        fontFamily: 'Staatliches',
    }
}

function AddPokemon() {
  return (
    <>
      <div class="row">
        <div style={styles.pageTitle} class="col-6 my-auto">Add New Pokémon</div>
        {/* <div class="col-6 text-right my-auto">
          <a type="button" class="btn btn-success ml-auto" href="/addPokemon">
            Add New Pokémon +
          </a>
        </div> */}
      </div>
      <div class="row">
        <div class="col">
            <select class="form-select">
                <option></option>
                <option>Test</option>
            </select>
        </div>
      </div>
    </>
  );
}

export default AddPokemon;
