import React from 'react';
import { mount } from 'enzyme';

import App from 'AppSource';

describe('<App />', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<App />);
  });

  it('renders the Header component', () => {
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('renders the Footer component', () => {
    expect(wrapper.find('Footer')).toHaveLength(1);
  });
});
