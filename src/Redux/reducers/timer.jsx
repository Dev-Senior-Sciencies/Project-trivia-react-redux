import { INPUT_SECONDS, INPUT_INTERVAL_ID } from '../actions';

const INITIAL_STATE = {
  seconds: 30,
  intervalId: 0,
};

function timerReducer(state = INITIAL_STATE, { type, seconds, intervalId }) {
  switch (type) {
  case INPUT_SECONDS:
    return { ...state, seconds };
  case INPUT_INTERVAL_ID:
    return { ...state, intervalId };
  default:
    return state;
  }
}

export default timerReducer;
