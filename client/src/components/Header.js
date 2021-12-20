import React from 'react';

import pokeball from '../images/pokeball.png';

const styles = {
  header: {
    height: '100px',
    backgroundColor: '#ff004f',
  },
  headerBrand: {
    color: 'white',
    fontSize: '50px',
    fontFamily: 'Staatliches',
  },
  button: {
    fontFamily: 'Staatliches',
  },
  pokeball: {
      maxHeight: '20px',
  }
};

function Header() {
  return (
    <header>
      <div style={styles.header} className="row px-2 align-content-center">
        <div className="col-6 my-auto">
          <a style={styles.headerBrand} href="/">
            PokÉV Tracker
          </a>
          <img style={styles.pokeball} src={pokeball} />
        </div>
        <div className="col-6 text-right my-auto">
          <button
            style={styles.button}
            className="btn btn-light mr-2"
            type="button"
          >
            Sign Up
          </button>
          <button style={styles.button} className="btn btn-light" type="button">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
