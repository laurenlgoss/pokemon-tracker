import React from 'react';

import Auth from '../utils/auth';

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
  ev: {
    color: 'rgb(255 219 219)',
  },
  button: {
    fontFamily: 'Staatliches',
  },
  pokeball: {
    maxHeight: '20px',
  },
};

function Header() {
  console.log(Auth.loggedIn());

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
            <div>Welcome {Auth.getProfile().data.username}</div>
            <button
              style={styles.button}
              className="btn btn-light mr-2"
              type="button"
              onClick={Auth.logout()}
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
