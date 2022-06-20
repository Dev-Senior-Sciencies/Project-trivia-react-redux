import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import '../style/Questions.css';

class Questions extends Component {
  render() {
    const { category, question } = this.props;
    return (
      <section className="trivia-questions-category">
        <p data-testid="question-category">
          { category }
        </p>
        <p data-testid="question-text">
          { question }
        </p>
      </section>
    );
  }
}

Questions.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default Questions;
