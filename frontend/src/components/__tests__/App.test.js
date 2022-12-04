import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import MainScreen from '../MainScreen';

/**
 */
 test('App Renders', async () => {
  render(<App />);
});



test('Sucess', async () => {
  render(<App />);
  const email = screen.getByLabelText("Email");
  fireEvent.change(email, {target: {value: 'jsmith0@ucsc.edu'}})
  const passwd = screen.getByLabelText('Password');
  await userEvent.type(passwd, '1234');
  fireEvent.click(screen.getByText('Login'));
  await waitFor(() => {
    expect(localStorage.getItem('user')).not.toBe(null);
  });
});
