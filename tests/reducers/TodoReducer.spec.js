jest.mock('uuid/v4');

import uuid from 'uuid/v4';
import { assert } from 'chai';
import reducer, { defaultState } from 'reducers/TodoReducer';

uuid.mockImplementation(() => '123-456');

describe('todo reducer', () => {
  it('should default to the default state when initially called', () => {
    const state = reducer(undefined, { type: 'unknown-type' });
    assert.deepEqual(state, defaultState);
  });

  it('should return the default state', () => {
    const state = reducer(undefined);
    assert.deepEqual(defaultState, state);
  });

  it('should add todo item', () => {
    const state = reducer(undefined, {
      type: 'ADD_TODO_ITEM',
      payload: {
        text: 'release product'
      }
    });
    const { items } = state;
    const expected = [{
      id: '123-456',
      text: 'release product',
      completed: false,
    }];
    assert.deepEqual(expected, items.toArray());
  });

  it('should toggle todo item', () => {
    let state = reducer(undefined, {
      type: 'ADD_TODO_ITEM',
      payload: {
        text: 'release product'
      }
    });
    state = reducer(state, {
      type: 'TOGGLE_TODO_ITEM',
      payload: {
        id: '123-456'
      }
    });
    const { items } = state;
    const expected = [{
      id: '123-456',
      text: 'release product',
      completed: true,
    }];
    assert.deepEqual(expected, items.toArray());
  });

  it('should delete todo item', () => {
    let state = reducer(undefined, {
      type: 'ADD_TODO_ITEM',
      payload: {
        text: 'release product'
      }
    });
    state = reducer(state, {
      type: 'DELETE_TODO_ITEM',
      payload: {
        id: '123-456'
      }
    });
    const { items } = state;
    const expected = [];
    assert.deepEqual(expected, items.toArray());
  });

  it('should set the todo filter type', () => {
    const state = reducer(undefined, {
      type: 'SET_TODO_FILTER_TYPE',
      payload: {
        filterType: 'all'
      }
    });
    const { filterType } = state;
    assert.deepEqual('all', filterType);
  });
});
