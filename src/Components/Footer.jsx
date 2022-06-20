import React, { Component } from 'react';
import '../style/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer-container">
        <span>Feito com muito </span>
        <span role="img" aria-label="coffee">☕</span>
        <span> por: kikuti, tiago, kaio, samuca e leonardo.</span>
      </footer>
    );
  }
}

export default Footer;
