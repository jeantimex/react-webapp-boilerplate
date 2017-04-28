import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import noop from 'lodash.noop';

import {
  addTodoItemAction,
  toggleTodoItemAction,
  deleteTodoItemAction,
  setTodoFilterTypeAction,
} from 'actions';

import './todos.scss';

export class Todos extends Component {

  handleKeyPress = (e) => {
    const { addTodoItem } = this.props;
    const input = e.target;
    const text = input.value;

    if (e.key === 'Enter' && text && text.length > 0) {
      addTodoItem(text);
      // Clear the text field
      input.value = '';
    }
  };

  handleChange = (e) => {
    const { toggleTodoItem } = this.props;
    const input = e.target;

    toggleTodoItem(input.id);
  };

  handleClose = (id) => {
    const { deleteTodoItem } = this.props;

    deleteTodoItem(id);
  };

  handleFilterTypeChange = (filterType) => {
    const { setTodoFilterType } = this.props;

    setTodoFilterType(filterType);
  }

  render() {
    const {
      todoItems,
      activeItemsCount,
    } = this.props;

    const items = todoItems.map((item) => {
      const className = classNames('todo-item', {
        completed: item.completed
      });

      return (
        <li
          key={item.id}
          className={className}
        >
          <div>
            <input
              type="checkbox"
              id={item.id}
              checked={item.completed}
              onChange={this.handleChange}
            />
            <span>{item.text}</span>
            <button
              className="close-button"
              onClick={() => this.handleClose(item.id)}
            >
              ×
            </button>
          </div>
        </li>
      );
    });

    return (
      <div className="viewport">
        <div>
          <input
            type="text"
            onKeyPress={this.handleKeyPress}
            placeholder="What needs to be done?"
          />
        </div>
        <ul className="todo-list">
          {items}
        </ul>
        <div>
          { activeItemsCount } items left
        </div>
        <div>
          <button
            className="filter-button"
            onClick={() => this.handleFilterTypeChange('all')}
          >
            All
          </button>
          <button
            className="filter-button"
            onClick={() => this.handleFilterTypeChange('active')}
          >
            Active
          </button>
          <button
            className="filter-button"
            onClick={() => this.handleFilterTypeChange('completed')}
          >
            Completed
          </button>
        </div>
      </div>
    );
  }

}

Todos.defaultProps = {
  todoItems: [],
  addTodoItem: noop,
  toggleTodoItem: noop,
  deleteTodoItem: noop,
  setTodoFilterType: noop,
  activeItemsCount: 0,
};

Todos.propTypes = {
  todoItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool,
  })),
  addTodoItem: PropTypes.func,
  toggleTodoItem: PropTypes.func,
  deleteTodoItem: PropTypes.func,
  setTodoFilterType: PropTypes.func,
  activeItemsCount: PropTypes.number,
};

export const mapStateToProps = (state) => {
  const { items, filterType } = state.todo;
  let todoItems = items.toArray();

  if (filterType === 'active') {
    todoItems = todoItems.filter(item => !item.completed);
  } else if (filterType === 'completed') {
    todoItems = todoItems.filter(item => item.completed);
  }

  return {
    todoItems,
    activeItemsCount: items.toArray().filter(item => !item.completed).length,
  };
};

export const mapDispatchToProps = dispatch => ({
  addTodoItem: (text) => {
    dispatch(addTodoItemAction(text));
  },
  toggleTodoItem: (id) => {
    dispatch(toggleTodoItemAction(id));
  },
  deleteTodoItem: (id) => {
    dispatch(deleteTodoItemAction(id));
  },
  setTodoFilterType: (filterType) => {
    dispatch(setTodoFilterTypeAction(filterType));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
