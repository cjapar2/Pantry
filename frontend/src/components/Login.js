/* eslint-disable */

import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {FormControl, FormGroup, TextField, Typography, Link, Paper} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useAuth} from './AuthProvider';

import pantry from '../asset/pantry.jpg'

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
    <div 
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      marginLeft: '4%'
    }}>
     
      <Grid container component="main" direction="column" sx={{ height: '65vh' }}>
        <Grid xs={6} item component={Paper} elevation={6} rounded justifyContent="center">
          <Box
            sx={{
              my: 17,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40vw'
            }}
          >
            <FormControl  sx={{ 
              mt: 2,
              justifyContent: 'center',
              alignContent: 'center',
              verticalAlign: 'center',
             }}>
               <Typography sx={{
                 fontSize: '26px',
                 pb: '25px',
               }}>Welcome to Pantry</Typography>
               <TextField aria-label='Email' size='small'
                 onChange={handleInputChange} name='email' fullWidth required
                 sx={{
                   alignSelf: 'center',
                   pb: '20px',
                   width: '150%'
                 }}/>
               <TextField aria-label='Password' size='small' type="password"
                 onChange={handleInputChange} name='password' required
                 sx={{
                   alignSelf: 'center',
                   pb: '20px',
                   width: '150%'
                 }}/>
               <Button variant='contained' type='submit' size='large' fullWidth
                 onClick={onLoginSubmit}
                 sx={{
                   alignSelf: 'center',
                   backgroundColor: 'darkblue',
                   height: '35px',
                   mt: 2, 
                   width: '150%'
                 }}>Login</Button>
             </FormControl>

             <Grid item >
              <Typography sx={{
                fontSize: '22px',
                alignSelf: 'center',
                mt: 3
              }}>
                Don't have an account?
              </Typography>
            </Grid>

            <Grid item>
              <Link onClick={goToCreateAccount} tabIndex={0} component="button" style={{textDecoration: 'none'}}>
                <Typography sx={{
                  fontSize: '16px',
                  alignSelf: 'left',
                }}>
                  Sign Up Here
                </Typography>
              </Link>          
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <img style={{ width: '45vw', height: '64vh' }} src={pantry} alt="pantry" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
