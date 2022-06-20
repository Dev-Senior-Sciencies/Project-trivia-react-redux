import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import '../style/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      gravatarUrl: '',
    };

    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    this.getImage();
  }

  getImage() {
    const { gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    this.setState({
      gravatarUrl: `https://www.gravatar.com/avatar/${hash}`,
    });
  }

  render() {
    const { gravatarUrl } = this.state;
    const { name, score } = this.props;
    return (
      <header className="header-container">
        <div className="header-img-user">
          <img
            data-testid="header-profile-picture"
            className="header-img"
            src={ gravatarUrl }
            alt={ name }
          />
          <span data-testid="header-player-name">
            { `Jogador: ${name}` }
          </span>
        </div>
        <section>
          <span>Pontos: </span>
          <span data-testid="header-score">
            {score}
          </span>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps({ player: { name, gravatarEmail, score } }) {
  return {
    name,
    gravatarEmail,
    score,
  };
}

export default connect(mapStateToProps)(Header);
