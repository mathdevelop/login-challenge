import { render, screen } from '@testing-library/react';
import App from '../App';

test('should render the login form title', () => {
  render(<App />);

  const titleElement = screen.getByText(/E-mail/i);

  expect(titleElement).toBeInTheDocument();
});
