// React
import React, {useEffect, useState} from 'react';
// MUI
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
// Utils
import Copyright from '../components/Utilities/Copyright';
import ViewItems from '../components/Items/View/ViewItems';
import {viewItems} from '../services/items';
import SnackbarError from '../components/Utilities/SnackbarError';
import ItemHeader from '../components/Items/Utils/ItemHeader';
import ItemBreadcumb from '../components/Items/Utils/ItemBreadcumb';
import ViewSingleItem from '../components/Items/View/ViewSingleItem';

import {viewCategories} from '../services/category';
import {isAdmin} from '../services/auth';

const useStyles = makeStyles(theme => ({
  center: {
    justifyContent: 'center',
  },
}));

export default function Coffee() {
  const classes = useStyles();
  const [coffees, setCoffees] = useState([]);
  const [viewing, setViewing] = useState({});
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleCloseError = () => {
    setError(false);
  };

  const ViewSingleitemHandler = singleKopi => {
    setViewing(singleKopi);
  };

  const setViewAll = () => {
    setViewing({});
  };

  useEffect(() => {
    viewItems().then(result => {
      if (!result.success) {
        setError(true);
      } else {
        setError(false);
        setCoffees([result.data][0]);
      }
    });
    isAdmin &&
      viewCategories().then(result => {
        if (result.success) {
          setCategories(result.data.category);
        } else {
          console.log('Category failed to load');
        }
      });
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      {/* Errorbar */}
      <SnackbarError
        errorState={error}
        closeError={handleCloseError}
        errorMessage="Fixing the virtual brewing machine... Please Try again!"
      />

      {/* Header */}

      <ItemHeader cat={categories}>
        {JSON.stringify(viewing) !== '{}' && (
          <ItemBreadcumb className={classes.center} item={viewing} viewCoffee={setViewAll} />
        )}
      </ItemHeader>

      {/* View Items */}
      {JSON.stringify(viewing) === '{}' ? (
        <ViewItems kopi={coffees} handleViewSingleItem={ViewSingleitemHandler} cat={categories} />
      ) : (
        <ViewSingleItem itemData={viewing} cat={categories} />
      )}

      {/* Footer */}
      <Copyright />
    </React.Fragment>
  );
}
