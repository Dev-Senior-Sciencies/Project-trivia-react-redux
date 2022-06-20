import { combineReducers } from 'redux';
import player from './player';
import timer from './timer';
import token from './token';

const rootReducer = combineReducers({ player, timer, token });

export default rootReducer;
