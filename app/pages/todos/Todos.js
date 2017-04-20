import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  addTodoItemAction,
} from 'actions';

class Todos extends Component {

  handleAddTodo = () => {
    const { addTodoItem } = this.props;
    addTodoItem('Hello World!');
  };

  render() {
    const { todoItems } = this.props;
    const items = todoItems.map(item =>
      <li key={item.id}>
        {item.text}
      </li>
    );

    return (
      <div className="viewport">
        <button onClick={this.handleAddTodo}>
          Add
        </button>
        <ul>
          {items}
        </ul>
      </div>
    );
  }

}

Todos.defaultProps = {
  todoItems: [],
  addTodoItem: () => {}
};

Todos.propTypes = {
  todoItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool
  })),
  addTodoItem: PropTypes.func
};

const mapStateToProps = state => ({
  todoItems: state.todo.items,
});

const mapDispatchToProps = dispatch => ({
  addTodo: (text) => {
    dispatch(addTodoItemAction(text));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
