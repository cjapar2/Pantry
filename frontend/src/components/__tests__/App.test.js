import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

import App from '../App';
import MainScreen from '../MainScreen';

const URL = 'http://localhost:3010/v0/authenticate';

const server = setupServer(
  rest.post('http://localhost:3010/v0/signup', async (req, res, ctx) => {
    const user = await req.json();
    console.log(ctx.json(user));
    return res(ctx.json(user));
  }),
  rest.post('http://localhost:3010/v0/authenticate', async (req, res, ctx) => {
    const user = await req.json();
    return user.email === 'jsmith0@ucsc.edu' ?
      res(ctx.json({name: 'John Smith', accesToken: 'some-old-jwt'})) :
      res(ctx.status(401, 'Username or password incorrect'));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 */
 test('App Renders', async () => {
  render(<App />);
});

test('Sucess', async () => {
  render(<App />);
  window.alert = () => { };
  const email = screen.getByLabelText("Email");
  await userEvent.type(email, 'jsmith0@ucsc.edu');
  const passwd = screen.getByLabelText('Password');
  await userEvent.type(passwd, '1234');
  fireEvent.click(screen.getByText('Login'));
  await waitFor(() => {
    expect(localStorage.getItem('user')).toBe(null);
  });
});

test('Create Account + login back navigation', async () => {
  render(<App />);
  window.alert = () => { };
  fireEvent.click(screen.getByText('Sign Up Here'));
  await waitFor(() => {
    expect(screen.getByText("Create an Account")).toBeDefined();
  }) 
  fireEvent.click(screen.getByText('Return to Login'));
  await waitFor(() => {
    expect(screen.getByRole("button", { name: "Login" })).not.toBeDisabled();
  }) 
})

test('Creating new Account', async () => {
  render(<App />);
  window.alert = () => { };
  fireEvent.click(screen.getByText('Sign Up Here'));
  await waitFor(() => {
    expect(screen.getByText("Create an Account")).toBeDefined();
  }) 
  await waitFor(() => {
    userEvent.type(screen.getByLabelText("Username"), 'newUser1');
    userEvent.type(screen.getByLabelText("Email"), 'newuser1@gmail.com');
    userEvent.type(screen.getByLabelText('Password'), '1234');
    userEvent.type(screen.getByLabelText('Confirm Password'), '1234');
  }) 
  fireEvent.click(screen.getByText("Sign Up"));
  await waitFor(() => {
    expect(screen.getByText("Pantry")).toBeDefined();
  })
})