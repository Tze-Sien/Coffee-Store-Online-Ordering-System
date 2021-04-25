import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import SnackbarError from '../Utilities/SnackbarError';
import SnackbarSuccess from '../Utilities/SnackbarSuccess';

import {addToCart} from '../../services/cart';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: 'none',
    borderRadius: '5px',
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    width: 'auto',
    padding: theme.spacing(2, 2),
  },
  margin: {
    marginBottom: theme.spacing(4),
  },
  maxWidth: {
    maxWidth: 300,
  },
}));

const CartModel = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState(1);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = event => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const handleSubmit = () => {
    addToCart({
      itemId: props.data._id,
      quantity: value,
    }).then(result => {
      if (result.success) {
        setSuccess(true);
        setError(false);
        setValue(1);
        setOpen(false);
        window.location.reload();
      } else {
        setError(true);
        setSuccess(false);
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
    <div>
      <SnackbarError
        errorState={error}
        closeError={handleCloseError}
        errorMessage="Somethings went wrong! Please try again!"
      />
      <SnackbarSuccess successState={success} closeSuccess={handleCloseSuccess} message="Item Added Successffullt!" />
      <Button size="large" color="inherit" startIcon={<ShoppingCartIcon />} onClick={handleOpen}>
        Add to Cart
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent className={classes.maxWidth}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {props.data.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {props.data.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Divider />
              <CardActions>
                <div className={classes.root}>
                  <Typography id="input-slider" gutterBottom>
                    Quantity
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <AddShoppingCartIcon color="primary" />
                    </Grid>
                    <Grid item xs>
                      <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                      />
                    </Grid>
                    <Grid item>
                      <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                          step: 1,
                          min: 0,
                          max: 100,
                          type: 'number',
                          'aria-labelledby': 'input-slider',
                        }}
                      />
                    </Grid>
                  </Grid>
                  <div className={classes.margin} />
                  <Button
                    size="large"
                    color="secondary"
                    variant="contained"
                    style={{marginRight: 10}}
                    onClick={handleSubmit}
                  >
                    Add to Cart
                  </Button>
                  <Button size="large" color="primary" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </CardActions>
            </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default CartModel;
