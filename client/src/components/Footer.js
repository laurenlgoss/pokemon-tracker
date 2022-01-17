import React from 'react';
import { useLocation } from 'react-router-dom';

const styles = {
  footer: {
    maxHeight: '30px',
  },
  footerText: {
    color: '#ababab',
  },
};

function Footer() {
  return (
    <footer
      style={styles.footer}
      className={useLocation().pathname === '/' ? 'fixed-bottom' : null} // Footer is fixed to bottom only if url is '/'
    >
      <div className="row">
        <div className="col text-center">
          <p style={styles.footerText}>
            © Lauren Goss {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
