import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    const minAssertions = 3;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">Text FeedBack</h1>

        <h1 data-testid="feedback-text">
          { assertions < minAssertions ? 'Could be better...' : 'Well Done!' }
        </h1>

        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>

        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

function mapStateToProps({ player: { score, assertions } }) {
  return {
    score,
    assertions,
  };
}

export default connect(mapStateToProps)(Feedback);
