import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {isAdmin} from '../../../services/auth';
import ItemAddModal from '../Add/ItemAddModal';

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  themeButton: {
    backgroundColor: 'black',
    color: 'white',
  },
  spacing: {
    margin: theme.spacing(2),
  },
}));

export default function ItemHeader(props) {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {isAdmin() ? 'Coffee Management' : 'Select your coffee'}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {isAdmin()
            ? 'STARBUGS | THINK - PLAN - ACTION'
            : 'We believe a cup of coffee is one of the most important, simple pleasures in life'}
        </Typography>
        {isAdmin() && (
          <Box align="center" className={classes.spacing}>
            <ItemAddModal cat={props.cat} />
          </Box>
        )}
        {props.children}
      </Container>
    </div>
  );
}
