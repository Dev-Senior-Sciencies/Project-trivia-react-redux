import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/Answers.css';
import { connect } from 'react-redux';
import Timer from './Timer';
import { saveScore, saveAssertions } from '../Redux/actions';

class Answers extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.addClass = this.addClass.bind(this);
  }

  handleClick({ target } = {}) {
    this.setState({ isDisabled: true }, () => {
      const { showNext, intervalId } = this.props;
      clearInterval(intervalId);
      this.sumScore(target);
      showNext();
    });
  }

  sumScore(target) {
    if (target && target.className.includes('correct')) {
      const { difficulty, dispatch, seconds } = this.props;
      dispatch(saveAssertions(1));
      const hard = 3;
      const medium = 2;
      const easy = 1;
      const points = 10;
      let score = 0;
      if (difficulty === 'hard') {
        score = points + (seconds * hard);
      } else if (difficulty === 'medium') {
        score = points + (seconds * medium);
      } else {
        score = points + (seconds * easy);
      }
      dispatch(saveScore(score));
    }
  }

  addClass(answer, isDisabled, correctAnswers) {
    if (isDisabled) {
      if (answer.includes(correctAnswers)) {
        return 'correct';
      }
      return 'wrong';
    }
    return '';
  }

  render() {
    const { sortedAnswers, correctAnswers } = this.props;
    const { isDisabled } = this.state;
    return (
      <div data-testid="answer-options" className="answer-options">
        {
          sortedAnswers.map((answer, index) => (
            <button
              key={ answer }
              type="button"
              disabled={ isDisabled }
              className={ `${this.addClass(answer, isDisabled, correctAnswers)} answer` }
              onClick={ this.handleClick }
              data-testid={
                answer.includes(correctAnswers)
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
            >
              { answer }
            </button>
          ))
        }
        <Timer callback={ this.handleClick } />
      </div>
    );
  }
}

Answers.propTypes = {
  showNext: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
  intervalId: PropTypes.number.isRequired,
  sortedAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswers: PropTypes.string.isRequired,
};

function mapStateToProps({ timer: { seconds, intervalId } }) {
  return {
    seconds,
    intervalId,
  };
}

export default connect(mapStateToProps)(Answers);
