import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const [checkoutItem, setCheckoutItem] = useState();
  const [checkoutTotal, setCheckoutTotal] = useState();

  // Get Data From LocalStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('checkoutItem'));
    setCheckoutItem(data.items);
    setCheckoutTotal(data.total);
  }, []);

  // Display and Sum Up
  // Checkout ? Clear Localstorage, Submit to database:
  // Clear LocalStorage and go back to cart
  // Failed? Clear LocalStorage and Go back to Cart
  const payments = [
    {name: 'Card type', detail: `Visa`},
    {name: 'Card holder', detail: `${props.data.nameOnCard}`},
    {name: 'Card number', detail: `${props.data.cardNo}`},
    {name: 'Expiry date', detail: `${props.data.expiryDate}`},
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {checkoutItem &&
          checkoutItem.map(product => (
            <ListItem className={classes.listItem} key={product._id}>
              <ListItemText primary={product.name} />
              <Typography variant="body2">RM {product.price}</Typography>
            </ListItem>
          ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            RM {checkoutTotal}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {props.data.lastName} {props.data.firstName}
          </Typography>
          <Typography gutterBottom>
            {props.data.address1} {props.data.address2}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
