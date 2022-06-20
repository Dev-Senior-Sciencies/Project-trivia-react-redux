import { INPUT_TOKEN } from '../actions';

const INITIAL_STATE = '';

function tokenReducer(state = INITIAL_STATE, { type, token }) {
  switch (type) {
  case INPUT_TOKEN:
    return token;
  default:
    return state;
  }
}

export default tokenReducer;
