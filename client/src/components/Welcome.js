import React from 'react';

import pokemonShieldWallpaper from '../images/pokemon-shield-wallpaper.png';

const styles = {
  backgroundImg: {
    minHeight: 'calc(100vh - 100px)', // Calculate 100% of viewport minus header size
    backgroundImage: `url(${pokemonShieldWallpaper})`,
    position: 'relative',
  },
  welcomeDiv: {
    position: 'absolute',
    top: '10em',
    left: '50%',
    webkitTransform: 'translateX(-50%)',
    transform: 'translateX(-50%)',
    width: '80%',
    textAlign: 'center',
  },
  link: {
    color: '#ff004f',
  },
  card: {
    background: 'rgba(255,255,255, 0.8)',
    borderRadius: '0px',
    border: '0px',
    width: '100%',
    height: '100%',
  },
};

function Welcome() {
  return (
    <>
      {/* Image */}
      <div style={styles.backgroundImg}></div>

      <div style={styles.welcomeDiv}>
        <div className="row mx-auto">
          <div style={styles.card} className="card p-5 m-1 col-md-11 mx-auto">
            <h1>Welcome to PokÉV Tracker!</h1>
          </div>
          {/* Why Use This Website? */}
          <div style={styles.card} className="card p-5 m-1 col-md-5 mx-auto">
            <h3 className="mb-4">Why use this website?</h3>
            <p className="text-left">
              This website allows an easy platform for a Pokémon trainer to keep
              track of their EV training. PokÉV Tracker allows you to:
            </p>
            <ul className="text-left">
              <li>
                Keep track of each Pokémon's species, nature, nickname, IVs, and of
                course EVs.
              </li>
              <li>
                View whether or not your Pokémons' EVs are maxed out and how
                many available EVs the Pokémon has remaining.
              </li>
              <li>
                Create your team from a vast database of Pokémon including
                different forms such as Gigantamax, Mega, and more.
              </li>
            </ul>
            <p className="text-left">
              <a style={styles.link} href="/signUp">Sign up</a> or <a style={styles.link} href="/login">log in</a> to begin using PokÉV Tracker!
            </p>
          </div>

          {/* What Is An EV? */}
          <div style={styles.card} className="card p-5 m-1 col-md-5 mx-auto">
            <h3 className="mb-4">What is an EV?</h3>
            <p className="text-left">
              According to{' '}
              <a
                style={styles.link}
                href="https://www.serebii.net/games/evs.shtml"
                target="_blank"
              >
                Serebii
              </a>
              , "EV stands for 'Effort Value.' They determine what stats your
              Pokémon gets upon levelling up and are gained from battling any
              Pokémon you come across that award Experience points."
            </p>
            <ul className="text-left">
              <li>
                Each Pokémon has a max allotment of 510 EVs, with each stat
                maxing out at 255.
              </li>
              <li>
                Stats go up by 1 point per every 4 EVs at level 100. Therefore,
                it is beneficial to EV train in only multiples of 4.
              </li>
              <li>
                This means you can max out 2 stats at 252, with 6 EVs left over,
                for a total of 510.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
