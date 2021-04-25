// React
import React, {useState} from 'react';
// MUI
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Utils
import Copyright from '../../components/Utilities/Copyright';
import AddressForm from '../../components/Checkout/AddressForm';
import PaymentForm from '../../components/Checkout/PaymentForm';
import Review from '../../components/Checkout/Review';
import {Link as RouterLink} from 'react-router-dom';
import {makePayment} from '../../services/cart';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const GetStepContent = props => {
  switch (props.step) {
    case 0:
      return <AddressForm change={props.change} />;
    case 1:
      return <PaymentForm change={props.change} />;
    case 2:
      return <Review data={props.data} />;
    default:
      throw new Error('Unknown step');
  }
};

export default function Checkout(props) {
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    state: '',
    zip: '',
    address1: '',
    address2: '',
    nameOnCard: '',
    cardNo: '',
    expiryDate: '',
    cvv: '',
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInputs = e => {
    setOrderDetails({...orderDetails, [e.target.name]: e.target.value});
  };

  const makePaymentHandler = () => {
    const data = JSON.parse(localStorage.getItem('checkoutItem'));
    makePayment(data).then(result => {
      if (result.success) {
        console.log('Order is Completed!');
        history.push('/coffee');
      } else {
        console.log('Sorry! Something went wrong, Please try again later!');
        history.push('/cart');
      }
      localStorage.removeItem('checkoutItem');
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will send you an update
                  when your order has shipped.
                </Typography>
                <Button variant="contained" color="secondary" onClick={makePaymentHandler} className={classes.button}>
                  Back
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <GetStepContent step={activeStep} change={handleInputs} data={orderDetails} />
                <div className={classes.buttons}>
                  {activeStep === 0 ? (
                    <Button onClick={handleBack} component={RouterLink} to="/cart" className={classes.button}>
                      Back to Cart
                    </Button>
                  ) : (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep !== steps.length && (
                    <Button variant="contained" color="secondary" onClick={handleNext} className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
