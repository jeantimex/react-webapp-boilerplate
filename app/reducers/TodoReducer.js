import { OrderedMap } from 'immutable';
import uuid from 'uuid/v4';

import {
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  TOGGLE_TODO_ITEM,
  SET_TODO_FILTER_TYPE,
} from 'actions';

const defaultState = {
  items: OrderedMap(),
  filterType: 'all',
};

const todoReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case ADD_TODO_ITEM: {
      const { text } = action.payload;
      const id = uuid();
      const items = state.items.set(id, {
        id,
        text,
        completed: false,
      });

      return {
        ...state,
        items,
      };
    }
    case TOGGLE_TODO_ITEM: {
      const { id } = action.payload;
      const item = state.items.get(id);
      item.completed = !item.completed;
      const items = state.items.set(id, item);

      return {
        ...state,
        items,
      };
    }
    case DELETE_TODO_ITEM: {
      const { id } = action.payload;
      const items = state.items.delete(id);

      return {
        ...state,
        items,
      };
    }
    case SET_TODO_FILTER_TYPE: {
      const { filterType } = action.payload;

      return {
        ...state,
        filterType,
      }
    }
    default:
      return state;
  }
};

export default todoReducer;
