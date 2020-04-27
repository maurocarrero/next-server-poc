import React from 'react';
import { render } from '@testing-library/react';
import { Layout } from '../layout';

it('should match', () => {
  const { container } = render(<Layout><h1>{`Hi!`}</h1></Layout>);
  expect(container).toMatchSnapshot();
});
