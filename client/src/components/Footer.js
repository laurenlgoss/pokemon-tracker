import React from 'react';
import { useLocation } from 'react-router-dom';

const styles = {
  footerText: {
    color: '#ababab',
  },
  footerLink: {
    color: 'var(--secondary)',
    textDecoration: 'underline',
  },
  footerDivider: {
    color: 'var(--secondary)',
  },
};

function Footer() {
  return (
    <footer
      className={useLocation().pathname === '/' ? 'fixed-bottom' : null} // Footer is fixed to bottom only if url is '/'
    >
      <div className="row my-3">
        <div className="col-12 text-center">
          <div style={styles.footerText}>
            © {new Date().getFullYear()} Lauren Goss
            <br />
            <small>
              <a href="/" style={styles.footerLink}>
                Home
              </a>
              <span className="mx-3" style={styles.footerDivider}>
                |
              </span>
              <a
                target="_blank"
                href="https://github.com/laurenlgoss/pokemon-tracker/issues"
                style={styles.footerLink}
                rel="noreferrer"
              >
                Report Issues
              </a>
              <span className="mx-3" style={styles.footerDivider}>
                |
              </span>
              {/* <a href="#" style={styles.footerLink}>
                Privacy Policy
              </a>
              <span className="mx-3">|</span> */}
              <a
                target="_blank"
                href="https://laurenlgoss.github.io/lauren-goss-portfolio-react/"
                style={styles.footerLink}
                rel="noreferrer"
              >
                About Me
              </a>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
