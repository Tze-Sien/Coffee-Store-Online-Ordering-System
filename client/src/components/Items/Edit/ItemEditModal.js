import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {Typography} from '@material-ui/core';
import ImageUpload from '../../Utilities/ImageUpload';
import {editItem} from '../../../services/items';
import {useHistory} from 'react-router-dom';
import SnackbarError from '../../Utilities/SnackbarError';
import SnackbarSuccess from '../../Utilities/SnackbarSuccess';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2, 4, 3),
  },
  themeButton: {
    backgroundColor: 'black',
    color: 'white',
  },
  title: {
    fontSize: '25px',
    textAlign: 'center',
    fontWeight: 500,
    color: theme.palette.grey[600],
    margin: theme.spacing(3),
  },
  form: {
    maxWidth: theme.spacing(50),
    marginTop: theme.spacing(1),
  },
  mt: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
}));

export default function ItemAddModal(props) {
  const history = useHistory();
  const classes = useStyles();
  const [catOpen, setCatOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(props.kopi.category);
  const [item, setItem] = useState({
    name: props.kopi.name,
    description: props.kopi.description,
    category: props.kopi.category,
    price: props.kopi.price,
  });

  const [image, setImage] = useState({
    files: [],
  });

  const refreshAndClose = () => {
    props.handleEditClose();
    setItem({
      name: props.kopi.name,
      description: props.kopi.description,
      category: props.kopi.category,
      price: props.kopi.price,
    });
  };

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

  const handleInput = e => {
    setItem({...item, ...{[e.target.name]: e.target.value}});
  };

  const handleChange = files => {
    if (files.length !== 0 && files[0].type.indexOf('image') >= 0) {
      setImage({...image, files});
    }
  };

  const handleImageDelete = () => {
    setImage({files: []});
  };

  const handleSubmit = e => {
    e.preventDefault();

    for (const x in item) {
      if (item[x] === '') {
        return console.log(`Invalid input ${x}`);
      }
    }

    const data = new FormData();
    data.append('name', item.name);
    data.append('description', item.description);
    data.append('category', item.category);
    data.append('price', item.price);
    if (image.files.length !== 0) {
      data.append('image', image.files[0], image.files[0].name);
    }

    editItem(props.kopi._id, data).then(result => {
      if (result.success) {
        setSuccess(true);
        props.handleEditClose();
        history.go(0);
      } else {
        if (!result.err) {
          setErrorMessage('Fixing the brewign machine! Please Try again later ;)');
        } else {
          setErrorMessage(result.err.data.err);
        }
        setError(true);
      }
    });
  };

  const handleCatClose = () => {
    setCatOpen(false);
  };

  const handleCatOpen = () => {
    setCatOpen(true);
  };

  const handleCatChange = event => {
    setSelectedCategory(event.target.value);
    handleInput(event);
  };

  return (
    <>
      <Container maxWidth="xs" className={classes.containr}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={props.editOpen}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.editOpen}>
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Typography className={classes.title} variant="h2">
                  Edit Item
                </Typography>
                <TextField
                  autoFocus
                  value={item.name}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Item Name"
                  name="name"
                  onChange={handleInput}
                  multiline
                />
                <TextField
                  value={item.description}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Item Description"
                  id="description"
                  onChange={handleInput}
                  multiline
                />
                <TextField
                  value={item.price}
                  variant="outlined"
                  margin="normal"
                  required
                  type="number"
                  fullWidth
                  name="price"
                  label="Item Price"
                  id="price"
                  onChange={handleInput}
                />

                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    inputProps={{
                      name: 'category',
                      id: 'outlined-age-native-simple',
                    }}
                    label="Category"
                    open={catOpen}
                    onClose={handleCatClose}
                    onOpen={handleCatOpen}
                    value={selectedCategory}
                    onChange={handleCatChange}
                  >
                    <MenuItem value="">
                      <em>Category</em>
                    </MenuItem>
                    {props.cat && props.cat.map(cat => <MenuItem value={cat.name}>{cat.name}</MenuItem>)}
                  </Select>
                </FormControl>

                <ImageUpload upload={handleChange} delete={handleImageDelete} />

                <Grid container spacing={1} className={classes.mt}>
                  <Grid item xs={12} md={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                      onClick={handleSubmit}
                    >
                      Edit Item
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button type="button" fullWidth color="default" onClick={refreshAndClose}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Fade>
        </Modal>
        <SnackbarError errorState={error} closeError={handleCloseError} errorMessage={errorMessage} />
        <SnackbarSuccess successState={success} closeSuccess={handleCloseSuccess} message="Item Edited Successfully!" />
      </Container>
    </>
  );
}
