import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import CategoryAddModal from './CategoryAddModal';
// import {isAdmin} from '../../services/auth';

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

export default function CategoryHeader({children}) {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Coffee Category Management
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          STARBUGS | THINK - PLAN - ACTION
        </Typography>
        <Box align="center" className={classes.spacing}>
          <CategoryAddModal />
        </Box>
        {children}
      </Container>
    </div>
  );
}
