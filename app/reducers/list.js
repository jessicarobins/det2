import { combineReducers } from 'redux';
import * as types from 'types';

const list = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_LIST_REQUEST:
      return {
        id: action.id,
        count: action.count,
        text: action.text
      };
    default:
      return state;
  }
};

const lists = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_LIST_REQUEST:
      return [...state, list(undefined, action)];
    default:
      return state;
  }
};

const newList = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING:
      return action.newList;
    case types.CREATE_LIST_REQUEST:
      return '';
    default:
      return state;
  }
};

const listReducer = combineReducers({
  lists,
  newList
});

export default listReducer;
