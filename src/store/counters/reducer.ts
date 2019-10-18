import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';

import * as counters from './actions';
import {ADD, INCREMENT, SET_MAP} from './constants';

export type CountersAction = ActionType<typeof counters>;

export type CountersState = {
  readonly reduxCounter: number;
  reduxMap: any;
};

export default combineReducers<CountersState, CountersAction>({
  reduxCounter: (state = 0, action) => {
    switch (action.type) {
      case INCREMENT:
        return state + 1; // action: { type: "INCREMENT"; }
      case ADD:
        return state + action.payload; // action: { type: "ADD"; payload: number; }
      default:
        return state;
    }
  },
  reduxMap: (map = {}, action) => {
    switch (action.type) {
      case SET_MAP:
        return action.payload; // action: { type: "ADD"; payload: number; }
      default:
        return map;
    }
  },
});
