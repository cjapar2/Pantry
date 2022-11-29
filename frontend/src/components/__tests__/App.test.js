import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

/**
 */
 test('App Renders', async () => {
  console.log('test');
  render(<App />);
});

test('Sucess', async () => {
  render(<App />);
  const email = screen.getByPlaceholderText("Email");
  await userEvent.type(email, 'jsmith0@ucsc.edu');
  const passwd = screen.getByPlaceholderText('Password');
  await userEvent.type(passwd, '1234');
  fireEvent.click(screen.getByText('Login'));
  await waitFor(() => {
    expect(localStorage.getItem('user')).not.toBe(null);
  });
});