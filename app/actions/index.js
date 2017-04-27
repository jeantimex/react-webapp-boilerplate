export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const TOGGLE_TODO_ITEM = 'TOGGLE_TODO_ITEM';
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';
export const SET_TODO_FILTER_TYPE = 'SET_TODO_FILTER_TYPE';

export const addTodoItemAction = text => ({
  type: ADD_TODO_ITEM,
  payload: {
    text,
  },
});

export const toggleTodoItemAction = id => ({
  type: TOGGLE_TODO_ITEM,
  payload: {
    id,
  },
});

export const deleteTodoItemAction = id => ({
  type: DELETE_TODO_ITEM,
  payload: {
    id,
  },
});

export const setTodoFilterTypeAction = filterType => ({
  type: SET_TODO_FILTER_TYPE,
  payload: {
    filterType,
  },
});
