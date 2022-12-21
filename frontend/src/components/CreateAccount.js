/* eslint-disable */


import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {FormGroup, TextField, Typography, Link, Paper, Stack} from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useAuth} from './AuthProvider';
/**
 * Component that displays the Create Account Page.
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
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const handlePasswordVerification = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  //handles when user presses the create account button
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

  const onReturnSubmit = () => {
    navigate('/');
  };

 
  return (
    <div 
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <Paper elevation={3} variant="outlined" sx={{
        pt: 5,
        pb: 5,
        px: 14,
        margin: 'auto',
        maxWidth: 1000,
      }}>
        <Grid container spacing={2} justify="center" direction="column" align="center">
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
                width: '150%',
              }}/>
            <TextField label='Email' size='small'
              onChange={handleInputChange} name='email'
              sx={{
                alignSelf: 'center',
                pb: '20px',
                width: '150%',
              }}/>
            <TextField label='Password' size='small'
              onChange={handleInputChange} name='password'
              secureTextEntry={true}
              sx={{
                alignSelf: 'center',
                pb: '20px',
                width: '150%',
              }}/>
            <TextField label='Confirm Password' size='small'
              onChange={handlePasswordVerification}
              sx={{
                alignSelf: 'center',
                pb: '20px',
                width: '150%',
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
            <Link onClick={onReturnSubmit} tabIndex={0} component="button" style={{textDecoration: 'none'}}>
              <Typography sx={{
                textAlign: 'center',
                fontSize: '16px',
              }}>
                Return to Login
              </Typography>
            </Link>     
          </Grid>
        </Grid>           
      </Paper>
    </div>
  );
}

export default CreateAccount;
