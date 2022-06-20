import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveLogin, saveToken } from '../Redux/actions';
import getToken from '../services/getToken';
import triviaLogo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isBtnDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.saveOnRedux = this.saveOnRedux.bind(this);
  }

  onInputChange({ target }) {
    this.setState({ [target.id]: target.value }, () => {
      this.validateLogin();
    });
  }

  validateLogin() {
    const { name, email } = this.state;
    const minNumber = 1;

    this.setState({ isBtnDisabled: name.length < minNumber || email.length < minNumber });
  }

  async saveOnRedux(name, email) {
    const { dispatch, history } = this.props;
    dispatch(saveLogin(name, email));
    dispatch(saveToken(await getToken()));
    history.push('/game');
  }

  render() {
    const { name, email, isBtnDisabled } = this.state;

    return (
      <section>
        <img src={ triviaLogo } alt="trivia logo" />
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            onChange={ this.onInputChange }
            value={ name }
            data-testid="input-player-name"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            onChange={ this.onInputChange }
            value={ email }
            data-testid="input-gravatar-email"
          />
        </label>

        <button
          type="button"
          disabled={ isBtnDisabled }
          onClick={ () => this.saveOnRedux(name, email) }
          data-testid="btn-play"
        >
          Play
        </button>

        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
