import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';

import {useHistory} from 'react-router-dom';
import {addCategory} from '../../services/category';
import SnackbarSuccess from '../Utilities/SnackbarSuccess';
import SnackbarError from '../Utilities/SnackbarError';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2, 4, 3),
  },
  themeButton: {
    backgroundColor: 'black',
    color: 'white',
  },
  title: {
    fontSize: '25px',
    textAlign: 'center',
    fontWeight: 500,
    color: theme.palette.grey[600],
    margin: theme.spacing(3),
  },
  form: {
    maxWidth: theme.spacing(50),
    marginTop: theme.spacing(1),
  },
  mt: {
    marginTop: theme.spacing(2),
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
}));

export default function CategoryAddModal() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [category, setItem] = useState({
    name: '',
  });

  const handleCloseError = () => {
    setError(false);
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = e => {
    setItem({...category, ...{[e.target.name]: e.target.value}});
  };

  const handleSubmit = e => {
    e.preventDefault();
    addCategory(category).then(result => {
      if (result.success) {
        setSuccess(true);
        history.go(0);
      } else {
        if (!result.error) {
          setErrorMessage('Fixing the brewign machine! Please Try again later ;)');
        } else {
          setErrorMessage(result.error.data.err);
        }
        setError(true);
      }
    });
  };

  return (
    <>
      <Button type="button" variant="contained" className={classes.themeButton} onClick={handleOpen}>
        Add New Category
      </Button>
      <Container maxWidth="xs" className={classes.containr}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Typography className={classes.title} variant="h2">
                  Add New Category
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="New Category Name"
                  name="name"
                  autoFocus
                  onChange={handleInput}
                  multiline
                />

                <Grid container spacing={1} className={classes.mt}>
                  <Grid item xs={12} md={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                      onClick={handleSubmit}
                    >
                      Create
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button type="button" fullWidth color="default" onClick={handleClose}>
                      Discard
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Fade>
        </Modal>
        <SnackbarError />
      </Container>
      <SnackbarError errorState={error} closeError={handleCloseError} errorMessage={errorMessage} />
      <SnackbarSuccess
        successState={success}
        closeSuccess={handleCloseSuccess}
        message="Category Created Successfully!"
      />
    </>
  );
}
