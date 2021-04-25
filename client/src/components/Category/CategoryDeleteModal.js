import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {deleteCategory} from '../../services/category';
import {useHistory} from 'react-router-dom';
import SnackbarSuccess from '../Utilities/SnackbarSuccess';
import SnackbarError from '../Utilities/SnackbarError';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  paper: {
    boxShadow: theme.shadows[5],
  },
  root: {
    padding: theme.spacing(2),
  },
  mt: {
    marginTop: theme.spacing(2),
  },
}));

export default function CategoryDeleteModal(props) {
  const history = useHistory();
  const classes = useStyles();

  //   Error
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleCloseError = () => {
    setError(false);
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };
  // Error End

  const handleClose = () => {
    props.close();
  };

  const handleDeletion = () => {
    deleteCategory(props.cat._id).then(result => {
      if (result.success) {
        setSuccess(true);
        history.go(0);
      } else {
        console.log(result);
        if (!result.error) {
          setErrorMessage('Fixing the brewign machine! Please Try again later ;)');
        } else {
          setErrorMessage(result.error.statusText);
        }
        setError(true);
      }
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} variant="h5" component="h2" gutterBottom>
                  Confirmation of Deletion
                </Typography>

                <Typography variant="body2">
                  Are you sure to delete{' '}
                  <Typography color="secondary" display="inline">
                    {props.cat.name}
                  </Typography>{' '}
                  forever?
                </Typography>
              </CardContent>
              <Divider className={classes.mt} />
              <CardActions>
                <Button size="small" color="secondary" onClick={handleDeletion}>
                  Confirm Deletion
                </Button>
                <Button size="small" onClick={handleClose}>
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </div>
        </Fade>
      </Modal>
      <SnackbarError errorState={error} closeError={handleCloseError} errorMessage={errorMessage} />
      <SnackbarSuccess
        successState={success}
        closeSuccess={handleCloseSuccess}
        message="Category Deleted Successfully!"
      />
    </div>
  );
}
