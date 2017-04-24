import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import Home from '../Home';

describe('Home Page', () => {
  it('should render the home page', () => {
    const wrapper = shallow(
      <Home />
    );
    assert.ok(wrapper.hasClass('viewport'));
    assert.ok(wrapper.hasClass('home'));
  });
});
