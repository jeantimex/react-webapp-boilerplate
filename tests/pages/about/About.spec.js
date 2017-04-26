import React from 'react';
import { shallow } from 'enzyme';
import { assert } from 'chai';

import About from 'pages/about/About';

describe('About Page', () => {
  it('should render the about page', () => {
    const wrapper = shallow(
      <About />
    );
    assert.ok(wrapper.hasClass('viewport'));
  });
});
