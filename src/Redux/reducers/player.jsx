import {
  INPUT_LOGIN,
  INPUT_SCORE,
  INPUT_ASSERTIONS,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

function loginReducer(state = INITIAL_STATE,
  { type, name, gravatarEmail, score, assertions }) {
  switch (type) {
  case INPUT_LOGIN:
    return {
      ...state,
      name,
      gravatarEmail,
    };
  case INPUT_SCORE:
    return {
      ...state,
      score: state.score + score,
    };
  case INPUT_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + assertions,
    };
  default:
    return state;
  }
}

export default loginReducer;
