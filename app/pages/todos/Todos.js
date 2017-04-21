import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  addTodoItemAction,
  toggleTodoItemAction,
  deleteTodoItemAction,
} from 'actions';

import './todos.scss';

class Todos extends Component {

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

  render() {
    const { filterTodoItems } = this.props;
    const items = filterTodoItems().map((item) => {
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
              onChange={this.handleChange}
            />
            <span>{item.text}</span>
            <button
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
          <input type="text" onKeyPress={this.handleKeyPress} />
        </div>
        <ul className="todo-list">
          {items}
        </ul>
      </div>
    );
  }

}

Todos.defaultProps = {
  filterTodoItems: () => [],
  addTodoItem: () => {},
  toggleTodoItem: () => {},
  deleteTodoItem: () => {},
};

Todos.propTypes = {
  filterTodoItems: PropTypes.func,
  addTodoItem: PropTypes.func,
  toggleTodoItem: PropTypes.func,
  deleteTodoItem: PropTypes.func,
};

const mapStateToProps = state => ({
  filterTodoItems: () => state.todo.items.toArray(),
});

const mapDispatchToProps = dispatch => ({
  addTodoItem: (text) => {
    dispatch(addTodoItemAction(text));
  },
  toggleTodoItem: (id) => {
    dispatch(toggleTodoItemAction(id));
  },
  deleteTodoItem: (id) => {
    dispatch(deleteTodoItemAction(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
