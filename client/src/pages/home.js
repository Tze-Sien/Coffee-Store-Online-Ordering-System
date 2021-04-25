// React
import React from 'react';
// MUI
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Utilities
import {Link} from 'react-router-dom';
import {isAdmin} from '../services/auth';

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    backgroundImage: `url(${Image})`,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Link to="/components/SignIn.js" />

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="textPrimary"
              style={{fontWeight: '900', textTransform: 'uppercase'}}
              gutterBottom
            >
              {isAdmin()
                ? 'Buggers, Together we provide World-class coffee delivery and brewing service'
                : 'Doorstep delivery in 59 minutes'}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {isAdmin()
                ? 'Starbugs | Modern way of enjoying premium coffee'
                : 'We brew and delivery premium class coffee to your doorstep in 59 minutes with AI-Powered Technology'}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={1} justify="center">
                <Grid item>
                  <List>
                    <ListItem button style={{backgroundColor: '#000', color: '#FFF'}} component={Link} to="/coffee">
                      {isAdmin() ? 'Improve the menu' : 'Order Now'}
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
