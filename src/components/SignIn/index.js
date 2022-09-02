import React, { useEffect, useState } from 'react';
import './styles.css'
import logo from '../../images/logo.png'
import { TextField, InputAdornment, Button, Checkbox, FormControlLabel, Snackbar, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import validator from 'validator';
import { login } from '../../services/authService';

const SignIn = (props) => {
  const { setIsLogged, setUserDataCookie } = props

  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const disableValue = phoneNumber?.length > 1 && validator.isMobilePhone(phoneNumber) && password?.length > 0
    setDisabled(!disableValue)
  }, [phoneNumber, password])

  const handleLogin = async () => {
    setDisabled(true)
    const body = {
      username: phoneNumber,
      password: password
    }
    try {
      const response = await login(body)
      if (response.status === 201) {
        setUserDataCookie('user', response.data)
        setIsLogged(true)
      } else {
        setErrorMessage('Invalid username or passwords!')
      }
    } catch (_) {
      setErrorMessage('Invalid username or passwords!')
    }
    setDisabled(false)
  }

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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            disabled={disabled}
            onClick={handleLogin}
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

      {errorMessage &&
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={10000}
          onClose={() => setErrorMessage(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setErrorMessage(null)} severity={`error`}>
            {errorMessage}
          </Alert>
        </Snackbar>
      }
    </div>
  )
};

export default SignIn;
