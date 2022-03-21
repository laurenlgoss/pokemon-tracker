import React from 'react';

import Auth from '../utils/auth';

import pokeball from '../images/pokeball.png';

const styles = {
  header: {
    height: '85px',
    backgroundColor: '#ff004f',
    position: 'relative',
  },
  headerBrand: {
    color: 'white',
    fontSize: '50px',
    fontFamily: 'Staatliches',
  },
  ev: {
    color: 'rgb(255 219 219)',
  },
  button: {
    fontFamily: 'Staatliches',
  },
  pokeball: {
    maxHeight: '20px',
    position: 'absolute',
    bottom: '19px',
  },
  welcome: {
    display: 'inline',
  },
};

function Header() {
  return (
    <header>
      <div style={styles.header} className="row px-3 align-content-center">
        <div className="col-6 my-auto">
          <a style={styles.headerBrand} href="/">
            Pok<span style={styles.ev}>ÉV</span> Tracker
          </a>
          <img style={styles.pokeball} src={pokeball} alt="Pokeball" />
        </div>
        {Auth.loggedIn() ? (
          <div className="col-6 text-right my-auto">
            <h5 style={styles.welcome} className="text-white mr-3">
              Welcome, {Auth.getProfile().data.username}
            </h5>
            <button
              style={styles.button}
              className="btn btn-light mr-2"
              type="button"
              onClick={() => Auth.logout()}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="col-6 text-right my-auto">
            <a
              style={styles.button}
              className="btn btn-light mr-2"
              type="button"
              href="/signUp"
            >
              Sign Up
            </a>
            <a
              style={styles.button}
              className="btn btn-light"
              type="button"
              href="/login"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
