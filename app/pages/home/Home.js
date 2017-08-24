import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import './styles.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Su',
      unreadCount: 1000,
    };
  }

  render() {
    const { name, unreadCount } = this.state;

    return (
      <div className="viewport home">
        <h1>
          <FormattedMessage
            id="helloWorld"
            description="Say hello to the world"
            defaultMessage="Hello World"
          />
        </h1>
        <FormattedMessage
          id="welcome"
          defaultMessage={`Hello {name}, you have {unreadCount, number} {unreadCount, plural,
            one {message}
            other {messages}
          }`}
          values={{
            name,
            unreadCount,
          }}
        />
      </div>
    );
  }
}

export default Home;
