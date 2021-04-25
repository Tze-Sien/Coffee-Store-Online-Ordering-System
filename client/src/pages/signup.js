// React
import React, {useState} from 'react';
// MUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// Utils
import {Redirect} from 'react-router-dom';
import {signup} from '../services/auth';
import Copyright from '../components/Utilities/Copyright';
import SnackbarError from '../components/Utilities/SnackbarError';
import SnackbarSuccess from '../components/Utilities/SnackbarSuccess';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [user, setUser] = useState(new FormData());
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleInput = e => {
    setUser({...user, ...{[e.target.name]: e.target.value}});
  };

  const handleSubmit = e => {
    e.preventDefault();
    signup(user).then(data => {
      if (!data.success) {
        setError(true);
        setSuccess(false);
      }
      if (data.success) {
        setError(false);
        setSuccess(true);
        setRedirect(true);
      }
    });
  };

  const handleCloseError = () => {
    setError(false);
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      {redirect && <Redirect to="/" />}
      <SnackbarError
        errorState={error}
        closeError={handleCloseError}
        errorMessage="Failed to Sign Up! Please Try again!"
      />
      <SnackbarSuccess successState={success} closeSuccess={handleCloseSuccess} message="Registered Successfully!" />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Your Full Name"
            name="fullname"
            autoFocus
            color="secondary"
            onChange={handleInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            name="email"
            autoFocus
            color="secondary"
            onChange={handleInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color="secondary"
            onChange={handleInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2" color="secondary">
                {'Registered? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
