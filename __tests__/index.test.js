import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../pages/index';

it('should match', () => {
  const { container } = render(<HomePage />);
  expect(container).toMatchSnapshot();
});
