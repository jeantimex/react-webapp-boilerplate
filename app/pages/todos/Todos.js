import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import noop from 'lodash.noop';

import {
  addTodoItemAction,
  deleteTodoItemAction,
  setTodoFilterTypeAction,
  toggleTodoItemAction,
} from 'actions';

import 'todomvc-app-css/index.css';
import './todos.scss';

export class Todos extends Component {
  handleKeyPress = e => {
    const { addTodoItem } = this.props;
    const input = e.target;
    const text = input.value;

    if (e.key === 'Enter' && text && text.length > 0) {
      addTodoItem(text);
      // Clear the text field
      input.value = '';
    }
  };

  handleChange = e => {
    const { toggleTodoItem } = this.props;
    const input = e.target;

    toggleTodoItem(input.id);
  };

  handleClose = id => {
    const { deleteTodoItem } = this.props;

    deleteTodoItem(id);
  };

  handleFilterTypeChange = filterType => {
    const { setTodoFilterType } = this.props;

    setTodoFilterType(filterType);
  };

  render() {
    const { todoItems, filterType, activeItemsCount } = this.props;

    const items = todoItems.map(item => {
      const className = classNames('todo-item', {
        completed: item.completed,
      });

      return (
        <li key={item.id} className={className}>
          <div className="view">
            <input
              className="toggle"
              checked={item.completed}
              id={item.id}
              onChange={this.handleChange}
              type="checkbox"
            />
            <label htmlFor={item.id}>
              {item.text}
            </label>
            <button
              className="destroy"
              onClick={() => this.handleClose(item.id)}
            />
          </div>
        </li>
      );
    });

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            onKeyPress={this.handleKeyPress}
            placeholder="What needs to be done?"
            type="text"
          />
        </header>

        <div className="main">
          <ul className="todo-list">
            {items}
          </ul>
        </div>

        <footer className="footer">
          <span className="todo-count">
            {activeItemsCount} items left
          </span>
          <ul className="filters">
            <li>
              <a
                className={filterType === 'all' ? 'selected' : ''}
                onClick={() => this.handleFilterTypeChange('all')}
              >
                All
              </a>
            </li>
            <li>
              <a
                className={filterType === 'active' ? 'selected' : ''}
                onClick={() => this.handleFilterTypeChange('active')}
              >
                Active
              </a>
            </li>
            <li>
              <a
                className={filterType === 'completed' ? 'selected' : ''}
                onClick={() => this.handleFilterTypeChange('completed')}
              >
                Completed
              </a>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}

Todos.defaultProps = {
  todoItems: [],
  filterType: 'all',
  addTodoItem: noop,
  toggleTodoItem: noop,
  deleteTodoItem: noop,
  setTodoFilterType: noop,
  activeItemsCount: 0,
};

Todos.propTypes = {
  todoItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      completed: PropTypes.bool,
    })
  ),
  filterType: PropTypes.oneOf(['all', 'active', 'completed']),
  addTodoItem: PropTypes.func,
  toggleTodoItem: PropTypes.func,
  deleteTodoItem: PropTypes.func,
  setTodoFilterType: PropTypes.func,
  activeItemsCount: PropTypes.number,
};

export const mapStateToProps = state => {
  const { items, filterType } = state.todo;
  let todoItems = items.toArray();

  if (filterType === 'active') {
    todoItems = todoItems.filter(item => !item.completed);
  } else if (filterType === 'completed') {
    todoItems = todoItems.filter(item => item.completed);
  }

  return {
    todoItems,
    filterType,
    activeItemsCount: items.toArray().filter(item => !item.completed).length,
  };
};

export const mapDispatchToProps = dispatch => ({
  addTodoItem: text => {
    dispatch(addTodoItemAction(text));
  },
  toggleTodoItem: id => {
    dispatch(toggleTodoItemAction(id));
  },
  deleteTodoItem: id => {
    dispatch(deleteTodoItemAction(id));
  },
  setTodoFilterType: filterType => {
    dispatch(setTodoFilterTypeAction(filterType));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
