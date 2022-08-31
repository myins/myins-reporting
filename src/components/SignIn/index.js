import React, {  } from 'react';
import './styles.css'
import logo from '../../images/logo.png'
import { TextField, InputAdornment, Button, Checkbox, FormControlLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';

const SignIn = (props) => {
  const { setIsLogged } = props

  return (
    <div className='sign_up'>
      <div className='sign_up_body'>
        <img alt="" className="sign_up_logo" src={logo} />
        <div className='welcome_text'>
          Welcome to <span className='welcome_text_bold'>MyINS Metrics <br /> Dashboard</span>, please Log In below.
        </div>
        <div className='sign_up_form'>
          <TextField
            autoFocus
            variant='outlined'
            placeholder="type username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant='outlined'
            placeholder="type password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SecurityIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant='contained'
            onClick={() => setIsLogged(true)}
          >
            Log In
          </Button>
          <FormControlLabel
            className='checkbox_remember_me'
            label="Remember me"
            control={
              <Checkbox />
            }
          />
        </div>
      </div>
      <div className='sign_up_footer'>
        <p>MyINS</p>
        <p>Copyright &copy;2022</p>
        <p>Squid40</p>
      </div>
    </div>
  )
};

export default SignIn;
