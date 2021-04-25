import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import {Typography} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import ImageUpload from '../../Utilities/ImageUpload';
import {addItem} from '../../../services/items';
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
  button: {
    display: 'block',
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
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [item, setItem] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
  });
  const [image, setImage] = useState({
    files: [],
  });
  const [selectedCategory, setSelectedCategory] = useState('');

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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage({files: []});
  };

  const handleInput = e => {
    setItem({...item, ...{[e.target.name]: e.target.value}});
  };

  const handleSubmit = e => {
    e.preventDefault();

    for (const x in item) {
      if (item[x] === '') {
        setErrorMessage(`Invalid input ${x}`);
        setError(true);
        return;
      }
    }
    if (image.files.length === 0) {
      setErrorMessage(`Please upload an Image for better customer experience!`);
      setError(true);
      return;
    }

    const data = new FormData();
    data.append('name', item.name);
    data.append('description', item.description);
    data.append('category', item.category);
    data.append('price', item.price);
    data.append('image', image.files[0], image.files[0].name);
    addItem(data).then(result => {
      if (result.success) {
        setSuccess(true);
        handleClose();
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

  const handleChange = files => {
    if (files.length !== 0 && files[0].type.indexOf('image') >= 0) {
      setImage({...image, files});
    }
  };

  const handleImageDelete = () => {
    setImage({files: []});
  };

  const handleCatChange = event => {
    setSelectedCategory(event.target.value);
    handleInput(event);
  };

  const handleCatClose = () => {
    setCatOpen(false);
  };

  const handleCatOpen = () => {
    setCatOpen(true);
  };

  return (
    <>
      <Button type="button" variant="contained" className={classes.themeButton} onClick={handleOpen}>
        Add New Item
      </Button>
      <Container maxWidth="xs" className={classes.containr}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Typography className={classes.title} variant="h2">
                  Add New Item
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="New Item Name"
                  name="name"
                  autoFocus
                  onChange={handleInput}
                  multiline
                />
                <TextField
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
                    {props.cat &&
                      props.cat.map((cat, index) => (
                        <MenuItem key={index} value={cat.name}>
                          {cat.name}
                        </MenuItem>
                      ))}
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
                      Create Item
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button type="button" fullWidth color="default" onClick={handleClose}>
                      Discard
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Fade>
        </Modal>
        <SnackbarError errorState={error} closeError={handleCloseError} errorMessage={errorMessage} />
        <SnackbarSuccess successState={success} closeSuccess={handleCloseSuccess} message="Item Added Successfully!" />
      </Container>
    </>
  );
}
