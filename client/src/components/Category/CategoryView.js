import React, {useEffect, useState} from 'react';
import {viewCategories} from '../../services/category';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import CategoryDeleteModal from './CategoryDeleteModal';
import SnackbarSuccess from '../Utilities/SnackbarSuccess';
import SnackbarError from '../Utilities/SnackbarError';

import Grid from '@material-ui/core/Grid';

const useStyle = makeStyles(theme => ({
  space: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

export default function CategoryView() {
  const [category, setCategory] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [catToDelete, setCatToDelete] = useState({});

  //   Error
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleCloseError = () => {
    setError(false);
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };
  // Error End

  const classes = useStyle();
  useEffect(() => {
    viewCategories().then(result => {
      if (result.success) {
        setCategory(result.data.category);
      } else {
        if (!result.error) {
          setErrorMessage('Fixing the brewign machine! Please Try again later ;)');
        } else {
          setErrorMessage(result.err.data.err);
        }
        setError(true);
      }
    });
  }, []);

  const handleCloseModal = () => {
    setDeleteModal(false);
  };

  const handleOpenModal = cat => {
    setCatToDelete(cat);
    setDeleteModal(true);
  };

  return (
    <>
      <Grid container spacing={3} className={classes.space}>
        <CategoryDeleteModal close={handleCloseModal} open={deleteModal} cat={catToDelete} />
        {category &&
          category.map(cat => (
            <Grid item key={cat._id} md={6} xs={12}>
              <Button
                onDoubleClick={() => handleOpenModal(cat)}
                variant="outlined"
                color="secondary"
                fullWidth
                style={{height: '100%'}}
              >
                {cat.name}
              </Button>
            </Grid>
          ))}
      </Grid>
      <SnackbarError errorState={error} closeError={handleCloseError} errorMessage={errorMessage} />
      <SnackbarSuccess
        successState={success}
        closeSuccess={handleCloseSuccess}
        message="Category Deleted Successfully!"
      />
    </>
  );
}
