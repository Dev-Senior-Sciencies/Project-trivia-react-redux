export const INPUT_LOGIN = 'INPUT_LOGIN';
export const INPUT_SCORE = 'INPUT_SCORE';
export const INPUT_SECONDS = 'INPUT_SECONDS';
export const INPUT_TOKEN = 'INPUT_TOKEN';
export const INPUT_ASSERTIONS = 'INPUT_ASSERTIONS';
export const INPUT_INTERVAL_ID = 'INPUT_INTERVAL_ID';

export function saveLogin(name, gravatarEmail) {
  return {
    type: INPUT_LOGIN,
    name,
    gravatarEmail,
  };
}

export function saveToken(token) {
  return {
    type: INPUT_TOKEN,
    token,
  };
}

export function saveScore(score) {
  return {
    type: INPUT_SCORE,
    score,
  };
}

export function saveAssertions(assertions) {
  return {
    type: INPUT_ASSERTIONS,
    assertions,
  };
}

export function saveCount(seconds) {
  return {
    type: INPUT_SECONDS,
    seconds,
  };
}

export function saveId(intervalId) {
  return {
    type: INPUT_INTERVAL_ID,
    intervalId,
  };
}
