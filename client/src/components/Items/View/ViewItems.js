// React
import React from 'react';
// MUI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
// Utils
import CartModal from '../../Cart/CartModel';
import {isAdmin} from '../../../services/auth';
import ItemEditDelete from '../Utils/ItemEditDeleteButtons';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    height: 'max-content',
  },
  center: {
    justifyContent: 'center',
  },
  spacingTop: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  category: {
    textTransform: 'uppercase',
    color: theme.palette.secondary.dark,
    fontWeight: 500,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },
  desciption: {
    height: theme.spacing(8),
    display: 'block',
  },
  title: {
    minHeight: theme.spacing(5),
  },
}));

export default function ViewItems(props) {
  const classes = useStyles();

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };
  return (
    <main>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4} style={{justifyContent: 'space-evenly'}}>
          {props.kopi.map(coffee => (
            <Grid item key={coffee._id} xs={12} sm={6} md={4}>
              <Card className={classes.card} style={{justifyContent: 'space-between'}}>
                <CardActionArea onClick={() => props.handleViewSingleItem(coffee)}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`${process.env.REACT_APP_API_ROUTE}${coffee.image}`}
                    title={coffee.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                      {coffee.name}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="h2" className={classes.category}>
                      {coffee.category}
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="caption" gutterBottom className={classes.desciption}>
                      {truncateString(coffee.description, 100)}
                    </Typography>
                    <Typography variant="h5" display="block" className={classes.spacingTop}>
                      RM{coffee.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {isAdmin() ? <ItemEditDelete kopi={coffee} cat={props.cat} /> : <CartModal data={coffee} />}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
