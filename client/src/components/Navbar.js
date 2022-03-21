import React from 'react';

import Auth from '../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import pokeball from '../images/pokeball.png';

const styles = {
  navbar: {
    backgroundColor: '#ff004f',
    paddingTop: '0',
    paddingBottom: '0',
  },
  headerBrand: {
    color: 'white',
    fontSize: '50px',
  },
  ev: {
    color: 'rgb(255 219 219)',
  },
  pokeball: {
    maxHeight: '20px',
    position: 'absolute',
    bottom: '24px',
    left: '290px',
  },
  userIcon: {
    color: 'white',
  },
};

function Navbar() {
  return (
    <nav style={styles.navbar} className="navbar navbar-expand-md navbar-light">
      <a style={styles.headerBrand} className="navbar-brand" href="/">
        Pok<span style={styles.ev}>ÉV</span> Tracker
        <img style={styles.pokeball} src={pokeball} alt="Pokeball" />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
        </ul>
        <button
          className="btn btn-light my-2 my-sm-0"
          type="button"
          onClick={() => Auth.logout()}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
