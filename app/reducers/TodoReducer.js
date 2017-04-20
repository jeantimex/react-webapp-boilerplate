import {
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  COUNT_TODO_ITEMS,
} from 'actions';

const defaultState = {
  items: [{
    id: '1',
    text: 'hihi',
    completed: false,
  }],
};

const todoReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case ADD_TODO_ITEM:
      return state;
    case DELETE_TODO_ITEM:
      return state;
    case COUNT_TODO_ITEMS:
      return state;
    default:
      return state;
  }
};

export default todoReducer;
