import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  const root = render(<App />);

  // display content of root in the console
  // console.log(root.debug());

  const linkElement = screen.getByText(/testing react/i);
  expect(linkElement).toBeInTheDocument();
});
