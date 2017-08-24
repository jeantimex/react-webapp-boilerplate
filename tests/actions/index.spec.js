import { assert } from 'chai';
import {
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  TOGGLE_TODO_ITEM,
  SET_TODO_FILTER_TYPE,
  addTodoItemAction,
  toggleTodoItemAction,
  deleteTodoItemAction,
  setTodoFilterTypeAction,
} from 'actions';

describe('todo actions', () => {
  it('should return a payload with text', () => {
    const action = addTodoItemAction('release product');
    const expected = {
      type: ADD_TODO_ITEM,
      payload: {
        text: 'release product',
      },
    };
    assert.deepEqual(expected, action);
  });

  it('should return a payload with todo item id', () => {
    const action = toggleTodoItemAction('123-456');
    const expected = {
      type: TOGGLE_TODO_ITEM,
      payload: {
        id: '123-456',
      },
    };
    assert.deepEqual(expected, action);
  });

  it('should return a payload with todo item id', () => {
    const action = deleteTodoItemAction('123-456');
    const expected = {
      type: DELETE_TODO_ITEM,
      payload: {
        id: '123-456',
      },
    };
    assert.deepEqual(expected, action);
  });

  it('should return a payload with correct filter type', () => {
    const action = setTodoFilterTypeAction('all');
    const expected = {
      type: SET_TODO_FILTER_TYPE,
      payload: {
        filterType: 'all',
      },
    };
    assert.deepEqual(expected, action);
  });
});
