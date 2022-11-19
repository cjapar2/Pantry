/* eslint-disable */

import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {FormControl, FormGroup, TextField, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useAuth} from './AuthProvider';

/**
 * Component that displays the Login Page.
 *
 * @return {object} JSX
 */
function Login() {
  const [user, setUser] = React.useState({email: '', password: ''});
  const authentication = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    // console.log(value, name);
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const goToCreateAccount = (event) => {
    navigate('/createaccount');
  };

  const onLoginSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3010/v0/authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        authentication.login(json);
        authentication.navigateToMainlist();
      })
      .catch((error) => {
        console.log(error);
        alert('Error logging in, please try again');
      });
  };

  return (
    <Box className='outerContainer'>
      <Box sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        pt: '5%',
      }}>
        <Grid container className='gridContainer' direction={'column'}
          columns={1} spacing={3} alignItems={'center'}>
          <Grid item>
            <FormControl className='formControl'>
              <Typography sx={{
                textAlign: 'center',
                fontSize: '26px',
                pb: '25px',
              }}>Welcome to Pantry</Typography>
              <TextField label='Email' size='small'
                onChange={handleInputChange} name='email'
                sx={{
                  alignSelf: 'center',
                  pb: '20px',
                  minWidth: '100px',
                }}/>
              <TextField label='Password' size='small'
                onChange={handleInputChange} name='password'
                sx={{
                  alignSelf: 'center',
                  pb: '20px',
                  minWidth: '100px',
                }}/>
              <Button variant='contained' type='submit' size='large'
                onClick={onLoginSubmit}
                sx={{
                  alignSelf: 'center',
                  backgroundColor: 'darkblue',
                  height: '35px',
                }}>Login</Button>
            </FormControl>
          </Grid>
          <Grid item alignContent='center'>
            <FormGroup sx={{
              justifyContent: 'center',
              alignContent: 'center',
              pt: '35px',
            }}>
              <Typography sx={{
                textAlign: 'center',
                fontSize: '22px',
                pb: '5px',
              }}>Don't have an account?</Typography>
              <Button variant='contained' size='large'
                onClick={goToCreateAccount}
                sx={{
                  alignSelf: 'center',
                  backgroundColor: 'darkblue',
                  height: '35px',
                }}>Sign Up</Button>
            </FormGroup>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Login;
