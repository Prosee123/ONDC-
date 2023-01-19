import React from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

import { verifyUserLogin } from '../ondc-dashboard/state/action';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  h2: {
    fontFamily: 'sans-serif',
    marginBottom: '30px'
  },
  formControl: {
    marginBottom: '20px'
  },
  mainDiv: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ecee'
  },
  loginBox: {
    backgroundColor: '#ffffff',
    padding: '25px',
    paddingTop: '10px',
    borderRadius: '5px',
    width: '400px'
  },
  loginLayoiut: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [error, setError] = React.useState(false)
  const [emailError, setEmailError] = React.useState(false)
  const userRef = React.useRef({
    email: '',
    password: '',
  })

  const getUserDet = (keyName, event) => {
    userRef.current[keyName] = event.target.value
  }

  const onSave = () => {
    const isEmpty = Object.values(userRef.current).every(x => x.trim() !== '');
    if (isEmpty) {
      let emailReg = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      if (emailReg.test(userRef.current.email)) {
        console.log('emial_true')
        const payload = {
          ...userRef.current,
          callFn: onSuccessLogin
        }
        dispatch(verifyUserLogin(payload))
        setEmailError(false)
      }

      else {
        console.log('emial_true')
        setEmailError(true)
      }
      setError(false)
    }
    else { setError(true) }
  }
  const onSuccessLogin = () => {
    console.log('login')
    navigate("/dashboard")
  }
  return (
    <div className={classes.mainDiv}>
      <div className={classes.loginBox}>
        <h2 className={classes.h2}>Login to your Ondc Account</h2>
        <div className={classes.formControl}>
          <TextField
            id="outlined-search"
            label="Email"
            type="text"
            fullWidth
            onChange={(event) => getUserDet('email', event)}
          />
          {emailError && <p style={{ color: 'red', textAlign: 'center' }}>Provide a valid email</p>}
        </div>

        <div className={classes.formControl}>
          <TextField
            id="outlined-search"
            label="password"
            type="text"
            fullWidth
            onChange={(event) => getUserDet('password', event)}
          />
          {error && <p style={{ color: 'red', textAlign: 'center' }}>Required Fields</p>}
        </div>

        <Button onClick={onSave} fullWidth variant="contained" size="large">Save </Button>
      </div>
    </div>
  )
}

export default Login