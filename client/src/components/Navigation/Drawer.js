import {makeStyles, useTheme} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import CategoryIcon from '@material-ui/icons/Category';

import {Link as RouterLink, useLocation} from 'react-router-dom';
import {isAdmin} from '../../services/auth';

const drawerWidth = 240;
const themeColor = '#000';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

export default function SideDrawer({handleDrawerClose, open}) {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const route = location.pathname;
  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={RouterLink} to="/">
            <ListItemIcon>
              <HomeIcon style={{color: route === '/' ? themeColor : ''}} />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem button component={RouterLink} to="/coffee">
            <ListItemIcon>
              <LocalCafeIcon style={{color: route === '/coffee' ? themeColor : ''}} />
            </ListItemIcon>
            <ListItemText primary={isAdmin() ? 'Manage Coffee' : 'Coffee'} />
          </ListItem>

          {isAdmin() && (
            <ListItem button component={RouterLink} to="/category">
              <ListItemIcon>
                <CategoryIcon style={{color: route === '/category' ? themeColor : ''}} />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
          )}
        </List>
      </Drawer>
      <div className={classes.drawerHeader} />
    </>
  );
}
