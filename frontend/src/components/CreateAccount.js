/* eslint-disable */

import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {FormGroup, TextField, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useAuth} from './AuthProvider';
/**
 * Component that displays the Login Page.
 *
 * @return {object} JSX
 */
function CreateAccount() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({name: '', email: '', password: ''});
  const [password, setPassword] = React.useState('');
  const authentication = useAuth();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    console.log(value, name);
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const handlePasswordVerification = (event) => {
    const value = event.target.value;
    setPassword(value);
    //   .then(() => {
    // });
  };

  const onCreateSubmit = (event) => {
    event.preventDefault();

    if (password.localeCompare(user.password) === 0) {
      fetch('http://localhost:3010/v0/signup', {
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
        })
        .catch((error) => {
          console.log(error);
          alert('Account already exists with given email.');
        });
    } else {
      alert(`Passwords don't match!`);
    }
  };

  const onReturnSubmit = (event) => {
    navigate('/');
  };

  return (
    <Box sx={{
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      pt: '5%',
    }}>
      <Grid container direction={'column'} columns={1} spacing={3}
        justifyContent='center' alignItems={'center'}>
        <Grid item>
          <FormGroup sx={{
            justifyContent: 'center',
            alignContent: 'center',
            verticalAlign: 'center',
          }}>
            <Typography sx={{
              textAlign: 'center',
              fontSize: '26px',
              pb: '25px',
            }}>Create an Account</Typography>
            <TextField label='Username' size='small'
              onChange={handleInputChange} name='name'
              sx={{
                alignSelf: 'center',
                pb: '20px',
                minWidth: '100px',
              }}/>
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
            <TextField label='Confirm Password' size='small'
              onChange={handlePasswordVerification}
              sx={{
                alignSelf: 'center',
                pb: '20px',
                minWidth: '100px',
              }}/>
            <Button variant='contained' size='large'
              onClick={onCreateSubmit}
              sx={{
                alignSelf: 'center',
                backgroundColor: 'darkblue',
                height: '35px',
              }}>Sign Up</Button>
          </FormGroup>
        </Grid>
        <Grid item>
          <Button variant='contained' size='large'
            onClick={onReturnSubmit} sx={{
              alignSelf: 'center',
              backgroundColor: 'darkblue',
              height: '35px',
            }}>Return</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateAccount;
