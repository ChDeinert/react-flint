import React from 'react';
import {
  render,
} from '@testing-library/react';
import App from 'AppSource';

describe('<App />', () => {
  it('renders the Header component', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
