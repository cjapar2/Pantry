import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {FormGroup, TextField, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

/**
 * Component that displays the Login Page.
 *
 * @return {object} JSX
 */
function CreateAccount() {
  const navigate = useNavigate();

  const onLoginSubmit = (event) => {
    navigate('/mainlist');
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
      <Grid columns={1} spacing={3} justifyContent='center' sx={{
        alignItems: 'center',
      }}>
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
            <TextField label='Username' size='small' sx={{
              alignSelf: 'center',
              pb: '20px',
              minWidth: '100px',
            }}/>
            <TextField label='Password' size='small' sx={{
              alignSelf: 'center',
              pb: '20px',
              minWidth: '100px',
            }}/>
            <TextField label='Confirm Password' size='small' sx={{
              alignSelf: 'center',
              pb: '20px',
              minWidth: '100px',
            }}/>
            <Button variant='contained' size='large'
              onClick={onLoginSubmit}
              sx={{
                alignSelf: 'center',
                backgroundColor: 'darkblue',
                height: '35px',
              }}>Login</Button>
            <Button variant='contained' size='large'
              onClick={onReturnSubmit}
              sx={{
                alignSelf: 'center',
                backgroundColor: 'darkblue',
                height: '35px',
              }}>Return</Button>
          </FormGroup>
        </Grid>

      </Grid>
    </Box>
  );
}

export default CreateAccount;
