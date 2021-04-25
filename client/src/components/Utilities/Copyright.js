// React
import React from 'react';
// MUI
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
// Utils
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Copyright = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link component={RouterLink} to="/" color="inherit">
          Starbugs
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
};

export default Copyright;
