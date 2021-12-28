import React from 'react';

const styles = {
  ev: {
    color: 'rgb(90 85 85)',
  },
};

function Welcome() {
  return (
    <div className="text-center">
      <h2 className="mb-5">
        Welcome to{' '}
        <strong>
          Pok<span style={styles.ev}>ÉV</span> Tracker!
        </strong>
      </h2>
      <p>
        <span className="text-success">Sign Up</span> or{' '}
        <span className="text-success">Log In</span> to begin using this
        application.
      </p>
    </div>
  );
}

export default Welcome;
