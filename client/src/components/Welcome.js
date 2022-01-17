import React from 'react';

// import pokemonWallpaper from '../images/pokemon-wallpaper.png';
import pokemonShieldWallpaper from '../images/pokemon-shield-wallpaper.png';

const styles = {
  backgroundImg: {
    height: '90vh',
    backgroundImage: `url(${pokemonShieldWallpaper})`,
    position: 'relative',
  },
  welcomeDiv: {
    position: 'absolute',
  },
};

function Welcome() {
  return (
    <>
      {/* Image */}
      <div style={styles.backgroundImg}></div>

      {/* Welcome Message */}
      <div style={styles.welcomeDiv}>
        <h2>
          Welcome to <strong>PokÉV Tracker!</strong>
        </h2>
        {/* <p>
          <span className="text-success">Sign Up</span> or{' '}
          <span className="text-success">Log In</span> to begin using this
          application.
        </p> */}
      </div>
    </>
  );
}

export default Welcome;
