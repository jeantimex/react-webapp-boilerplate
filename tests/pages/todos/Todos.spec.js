jest.mock('actions', () => ({
  addTodoItemAction: jest.fn(),
  toggleTodoItemAction: jest.fn(),
  deleteTodoItemAction: jest.fn(),
  setTodoFilterTypeAction: jest.fn(),
}));

import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { OrderedMap } from 'immutable';
import {
  addTodoItemAction,
  toggleTodoItemAction,
  deleteTodoItemAction,
  setTodoFilterTypeAction,
} from 'actions';
import { Todos, mapStateToProps, mapDispatchToProps } from 'pages/todos/Todos';

describe('Todos Page', () => {
  let wrapper;

  const addTodoItem = jest.fn();
  const toggleTodoItem = jest.fn();
  const deleteTodoItem = jest.fn();
  const setTodoFilterType = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Todos
        addTodoItem={addTodoItem}
        toggleTodoItem={toggleTodoItem}
        deleteTodoItem={deleteTodoItem}
        setTodoFilterType={setTodoFilterType}
      />
    );
  });

  afterEach(() => {
    addTodoItem.mockClear();
    toggleTodoItem.mockClear();
    deleteTodoItem.mockClear();
    setTodoFilterType.mockClear();
  });

  it('should render the todos page', () => {
    assert.ok(wrapper.hasClass('todoapp'));
  });

  it('should highlight the all button', () => {
    wrapper.setProps({ filterType: 'all' });
    const button = wrapper
      .find('.filters')
      .find('a')
      .at(0);
    assert.ok(button.hasClass('selected'));
  });

  it('should not highlight the all button', () => {
    wrapper.setProps({ filterType: 'active' });
    const button = wrapper
      .find('.filters')
      .find('a')
      .at(0);
    assert.notOk(button.hasClass('selected'));
  });

  it('should highlight the active button', () => {
    wrapper.setProps({ filterType: 'active' });
    const button = wrapper
      .find('.filters')
      .find('a')
      .at(1);
    assert.ok(button.hasClass('selected'));
  });

  it('should not highlight the active button', () => {
    wrapper.setProps({ filterType: 'completed' });
    const button = wrapper
      .find('.filters')
      .find('a')
      .at(1);
    assert.notOk(button.hasClass('selected'));
  });

  it('should trigger setTodoFilterType with all', () => {
    const button = wrapper
      .find('.filters')
      .find('a')
      .at(0);
    button.simulate('click');
    assert.lengthOf(setTodoFilterType.mock.calls, 1);
    assert.equal('all', setTodoFilterType.mock.calls[0][0]);
  });

  it('should trigger setTodoFilterType with active', () => {
    const button = wrapper
      .find('.filters')
      .find('a')
      .at(1);
    button.simulate('click');
    assert.lengthOf(setTodoFilterType.mock.calls, 1);
    assert.equal('active', setTodoFilterType.mock.calls[0][0]);
  });

  it('should trigger setTodoFilterType with completed', () => {
    const button = wrapper
      .find('.filters')
      .find('a')
      .at(2);
    button.simulate('click');
    assert.lengthOf(setTodoFilterType.mock.calls, 1);
    assert.equal('completed', setTodoFilterType.mock.calls[0][0]);
  });

  it('should render 2 todo items', () => {
    const todoItems = [
      { id: '1', text: 'item 1', completed: false },
      { id: '2', text: 'item 2', completed: true },
    ];
    wrapper.setProps({ todoItems });
    wrapper.update();
    const itemList = wrapper.find('.todo-item');
    assert.equal(itemList.length, 2);
  });

  it('should call handleClose', () => {
    const handleClose = jest.fn();
    const todoItems = [
      { id: '1', text: 'item 1', completed: false },
      { id: '2', text: 'item 2', completed: true },
    ];
    wrapper.instance().handleClose = handleClose;
    wrapper.setProps({ todoItems });
    wrapper.update();
    const closeButton = wrapper
      .find('.todo-item')
      .at(0)
      .find('.destroy');
    closeButton.simulate('click');
    assert.lengthOf(handleClose.mock.calls, 1);
    assert.equal('1', handleClose.mock.calls[0][0]);
  });

  it('should call deleteTodoItem', () => {
    wrapper.instance().handleClose('1');
    assert.equal('1', deleteTodoItem.mock.calls[0][0]);
  });

  it('should call toggleTodoItem', () => {
    wrapper.instance().handleChange({
      target: {
        id: '1',
      },
    });
    assert.equal('1', toggleTodoItem.mock.calls[0][0]);
  });

  it('should call addTodoItem', () => {
    wrapper.instance().handleKeyPress({
      key: 'Enter',
      target: {
        value: 'release product',
      },
    });
    assert.equal('release product', addTodoItem.mock.calls[0][0]);
  });

  it('should not call addTodoItem', () => {
    wrapper.instance().handleKeyPress({
      key: 'Esc',
      target: {
        value: 'release product',
      },
    });
    assert.lengthOf(addTodoItem.mock.calls, 0);
  });

  it('should setup mapDispatchToProps properly', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.addTodoItem('test');
    props.toggleTodoItem('1');
    props.deleteTodoItem('1');
    props.setTodoFilterType('all');
    assert.lengthOf(addTodoItemAction.mock.calls, 1);
    assert.lengthOf(toggleTodoItemAction.mock.calls, 1);
    assert.lengthOf(deleteTodoItemAction.mock.calls, 1);
    assert.lengthOf(setTodoFilterTypeAction.mock.calls, 1);
  });

  it('should map to the correct props when filter type is all', () => {
    const items = OrderedMap()
      .set('1', { id: '1', text: 'item 1', completed: false })
      .set('2', { id: '2', text: 'item 2', completed: true });
    const filterType = 'all';
    const state = { todo: { items, filterType } };
    const props = mapStateToProps(state);
    const expected = {
      todoItems: [
        { id: '1', text: 'item 1', completed: false },
        { id: '2', text: 'item 2', completed: true },
      ],
      filterType: 'all',
      activeItemsCount: 1,
    };
    assert.deepEqual(expected, props);
  });

  it('should map to the correct props when filter type is active', () => {
    const items = OrderedMap()
      .set('1', { id: '1', text: 'item 1', completed: false })
      .set('2', { id: '2', text: 'item 2', completed: true });
    const filterType = 'active';
    const state = { todo: { items, filterType } };
    const props = mapStateToProps(state);
    const expected = {
      todoItems: [{ id: '1', text: 'item 1', completed: false }],
      filterType: 'active',
      activeItemsCount: 1,
    };
    assert.deepEqual(expected, props);
  });

  it('should map to the correct props when filter type is completed', () => {
    const items = OrderedMap()
      .set('1', { id: '1', text: 'item 1', completed: false })
      .set('2', { id: '2', text: 'item 2', completed: true });
    const filterType = 'completed';
    const state = { todo: { items, filterType } };
    const props = mapStateToProps(state);
    const expected = {
      todoItems: [{ id: '2', text: 'item 2', completed: true }],
      filterType: 'completed',
      activeItemsCount: 1,
    };
    assert.deepEqual(expected, props);
  });
});
