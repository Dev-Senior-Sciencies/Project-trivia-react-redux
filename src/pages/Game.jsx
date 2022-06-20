import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Questions from '../Components/Questions';
import Answers from '../Components/Answers';
import Footer from '../Components/Footer';
import getQuestions from '../services/getQuestions';
import '../style/Game.css';
import { saveCount } from '../Redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      sortedAnswers: [],
      questionNumber: 0,
      isVisible: false,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.showNext = this.showNext.bind(this);
  }

  async componentDidMount() {
    await this.loadQuestion();
    await this.sortAnswers();
  }

  async loadQuestion() {
    const { token } = this.props;
    this.setState({ questions: await getQuestions(token) });
  }

  nextQuestion() {
    const resetTimer = 30;
    const { dispatch } = this.props;
    dispatch(saveCount(resetTimer));

    this.setState((prevState) => (
      { questionNumber: prevState.questionNumber + 1, isVisible: false }
    ), () => {
      const { questionNumber } = this.state;
      const maxQuestions = 5;
      if (questionNumber < maxQuestions) {
        this.sortAnswers();
      }
    });
  }

  // Idéia retirada do https://flaviocopes.com/how-to-shuffle-array-javascript/
  sortAnswers() {
    const { questions, questionNumber } = this.state;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionNumber];
    const number = 0.5;
    this.setState({
      sortedAnswers: [correctAnswer, ...incorrectAnswers]
        .sort(() => Math.random() - number),
    });
  }

  showNext() {
    this.setState({ isVisible: true });
  }

  render() {
    const {
      questions,
      sortedAnswers,
      questionNumber,
      isVisible,
      isDisabled,
    } = this.state;

    const maxQuestions = 4;

    if (questionNumber > maxQuestions) return <Redirect to="/feedback" />;
    return (
      <>
        <Header />
        {
          sortedAnswers.length ? (
            <main className="main-container">
              <div className="trivia-content">
                <Questions
                  category={ questions[questionNumber].category }
                  question={ questions[questionNumber].question }
                />
                <Answers
                  key={ questions[questionNumber].correct_answer }
                  isDisabled={ isDisabled }
                  sortedAnswers={ sortedAnswers }
                  correctAnswers={ questions[questionNumber].correct_answer }
                  difficulty={ questions[questionNumber].difficulty }
                  showNext={ this.showNext }
                />
                <button
                  type="button"
                  style={ { visibility: isVisible ? 'visible' : 'hidden' } }
                  className="trivia-next-button"
                  onClick={ this.nextQuestion }
                  data-testid="btn-next"
                >
                  PRÓXIMA
                </button>
              </div>
            </main>
          ) : <h2>Loading</h2>
        }
        <Footer />
      </>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps({ token }) {
  return { token };
}

export default connect(mapStateToProps)(Game);
