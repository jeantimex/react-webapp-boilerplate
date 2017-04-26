import { assert } from 'chai';
import reducer, {
  defaultState,
  __Rewire__,
  __ResetDependency__,
} from 'reducers/TodoReducer';

const sandbox = sinon.sandbox.create();

describe('todo reducer', () => {
  beforeEach(() => {
    const uuid = sandbox.stub().returns('123-456');
    reducer.__Rewire__('uuid', uuid);
  });

  afterEach(() => {
    reducer.__ResetDependency__('uuid');
    sandbox.verifyAndRestore();
  });

  it('should default to the default state when initially called', () => {
    const state = reducer(undefined, { type: 'unknown-type' });
    assert.deepEqual(state, defaultState);
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
