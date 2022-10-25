import * as React from 'react';
// import {useNavigate} from 'react-router-dom';
import {FormControl, FormGroup, TextField, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

/**
 * Component that displays the Login Page.
 *
 * @return {object} JSX
 */
function Login() {
  const [user, setUser] = React.useState({username: '', password: ''});
  // const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    console.log(value, name);
    const u = user;
    u[name] = value;
    setUser(u);
  };

  // Do backend call/authentication here
  // Doesn't work
  const onLoginSubmit = (event) => {
    event.preventDefault();
  /*  fetch('/authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
        alert('Error logging in, please try again');
      });
    */
  };

  return (
    <Box sx={{
      width: '100%',
      height: '95vh',
    //  border: 'solid',
    }}>
      <Box sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        pt: '5%',
      }}>
        <Grid container direction={'column'} columns={1}
          spacing={3} justifyContent='center'
          sx={{
            alignItems: 'center',
          }}>
          <Grid item>
            <FormControl sx={{
              justifyContent: 'center',
              alignContent: 'center',
              verticalAlign: 'center',
            }}>
              <Typography sx={{
                textAlign: 'center',
                fontSize: '26px',
                pb: '25px',
              }}>Welcome to Pantry</Typography>
              <TextField label='Username' size='small'
                onChange={handleInputChange} name='username'
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
              <Button variant='contained' size='large' sx={{
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
