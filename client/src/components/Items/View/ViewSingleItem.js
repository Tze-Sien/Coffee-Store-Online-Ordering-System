import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CartModal from '../../Cart/CartModel';
import {isAdmin} from '../../../services/auth';
import ItemEditDelete from '../Utils/ItemEditDeleteButtons';

const useStyle = makeStyles(theme => ({
  media: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  mediaContainer: {
    minHeight: theme.spacing(50),
  },
  title: {
    marginTop: theme.spacing(2),
    display: 'block',
  },
  desc: {
    marginTop: theme.spacing(3),
    height: 'max-content',
  },
  button: {
    marginTop: theme.spacing(5),
  },
}));

export default function ViewSingleItem(props) {
  const classes = useStyle();

  return (
    <Container maxWidth="md">
      <Grid container spacing={5} justify="space-between">
        <Grid item md={4} xs={12} className={classes.mediaContainer}>
          <CardMedia
            className={classes.media}
            image={`${process.env.REACT_APP_API_ROUTE}${props.itemData.image}`}
            title={props.itemData.name}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Typography variant="h3" className={classes.title} gutterBottom>
            {props.itemData.name}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {props.itemData.category}
          </Typography>
          <Typography variant="body1" display="block" gutterBottom className={classes.desc}>
            {props.itemData.description}
          </Typography>
          <Box className={classes.button}>
            {isAdmin() ? <ItemEditDelete kopi={props.itemData} /> : <CartModal data={props.itemData} />}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
