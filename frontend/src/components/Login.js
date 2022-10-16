import * as React from 'react';
import { FormGroup, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

/**
 * Component that displays the Login Page.
 *
 * @return {object} JSX
 */
function Login() {

    return (
      <Box sx={{
        width:'50%',
        display:'flex',
        flexDirection:'column',
        pt:'5%'
      }}>
        <Grid columns={1} spacing={3} justifyContent='center' sx={{
          alignItems:'center'
        }}>
          <Grid item>
            <FormGroup sx={{
              justifyContent: 'center',
              alignContent: 'center',
              verticalAlign: "center",
            }}>
              <Typography sx={{
                textAlign: "center",
                fontSize: "26px",
                pb: "25px"
              }}>Welcome to Pantry</Typography>
              <TextField label="Username" size="small" sx={{
                alignSelf: "center",
                pb:"20px",
                minWidth: "100px",
              }}/>
              <TextField label="Password" size="small" sx={{
                alignSelf: "center",
                pb:"20px",
                minWidth: "100px",
              }}/>
              <Button variant="contained" size="large" sx={{
                alignSelf: "center",
                backgroundColor:"darkblue",
                height: "35px",
              }}>Login</Button>
            </FormGroup>
          </Grid>
          <Grid item alignContent="center">
            <FormGroup sx={{
              justifyContent: 'center',
              alignContent: 'center',
              pt: '35px'
            }}>
              <Typography sx={{
                textAlign: "center",
                fontSize: "22px",
                pb: "5px"
              }}>Don't have an account?</Typography>
              <Button variant="contained" size="large" sx={{
                alignSelf: "center",
                backgroundColor:"darkblue",
                height: "35px",
              }}>Sign Up</Button>
            </FormGroup>
          </Grid>
        </Grid>
      </Box>
    );
}

export default Login;