import React from 'react';

const styles = {
  footer: {
    maxHeight: '30px',
  },
  footerText: {
    color: '#ababab',
  }
}

function Footer() {
  return (
    <footer style={styles.footer} class="fixed-bottom">
      <div className="row">
        <div className="col text-center">
          <p style={styles.footerText}>© Lauren Goss {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
