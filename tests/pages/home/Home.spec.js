import React from 'react';
import { assert } from 'chai';
import { shallowWithIntl } from 'enzyme-intl';

import Home from 'pages/home/Home';

describe('Home Page', () => {
  it('should render the home page', () => {
    const wrapper = shallowWithIntl(<Home />);
    assert.ok(wrapper.hasClass('viewport'));
    assert.ok(wrapper.hasClass('home'));
    assert.equal(wrapper.state('name'), 'Su');
    assert.equal(wrapper.state('unreadCount'), 1000);
  });
});
