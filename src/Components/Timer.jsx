import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveCount, saveId } from '../Redux/actions';
import '../style/Timer.css';

class Timer extends Component {
  componentDidMount() {
    this.timeLeft();
  }

  componentWillUnmount() {
    const { intervalId } = this.props;
    clearInterval(intervalId);
  }

  timeLeft() {
    const magicNumber = 1000;
    const { dispatch } = this.props;
    const interval = (
      setInterval(() => {
        const { seconds, callback } = this.props;
        if (seconds === 0) {
          callback();
          clearInterval(interval);
        }
        dispatch(saveCount(seconds - 1));
      }, magicNumber)
    );
    dispatch(saveId(interval));
  }

  render() {
    const { seconds } = this.props;
    return (
      <p data-testid="question-category" className="trivia-timer">
        { seconds }
      </p>
    );
  }
}

Timer.propTypes = {
  seconds: PropTypes.number.isRequired,
  intervalId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
};

function mapStateToProps({ timer: { seconds, intervalId } }) {
  return {
    seconds,
    intervalId,
  };
}

export default connect(mapStateToProps)(Timer);
