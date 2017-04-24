import React from 'react';
import { assert } from 'chai';
import { shallowWithIntl } from 'enzyme-intl';

import Home from '../Home';

describe('Home Page', () => {
  it('should render the home page', () => {
    const wrapper = shallowWithIntl(
      <Home />
    );
    assert.ok(wrapper.hasClass('viewport'));
    assert.ok(wrapper.hasClass('home'));
  });
});
