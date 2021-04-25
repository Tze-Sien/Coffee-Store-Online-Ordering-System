import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Box from '@material-ui/core/Box';

import {getCart, deleteCart, editCart} from '../../services/cart';
import {useHistory} from 'react-router-dom';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {id: 'name', numeric: false, disablePadding: true, label: 'Items'},
  {id: 'unitPrice', numeric: true, disablePadding: false, label: 'Unit Price'},
  {id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity'},
  {id: 'subTotal', numeric: true, disablePadding: false, label: 'Subtotal'},
];

function EnhancedTableHead(props) {
  const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{'aria-label': 'select all desserts'}}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: 'black',
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
    fontWeight: '900',
  },
}));

const EnhancedTableToolbar = props => {
  const history = useHistory();
  const classes = useToolbarStyles();
  const {numSelected} = props;

  const handleDelete = () => {
    deleteCart(props.choosedItem).then(result => {
      if (result.success) {
        history.go(0);
      }
    });
  };

  const checkoutRedirect = async () => {
    let sum = 0;
    for (let x of props.choosedItem) {
      sum += x.subtotal;
    }
    const checkout = {
      items: props.choosedItem,
      total: sum,
    };
    localStorage.setItem('checkoutItem', JSON.stringify(checkout));
    history.push('/checkout');
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          My Coffee Cart
        </Typography>
      )}

      {numSelected > 0 && (
        <>
          <Tooltip title="Ready to enjoy coffee?" style={{marginRight: 20}} onClick={checkoutRedirect}>
            <Button variant="contained" color="secondary">
              Checkout
            </Button>
          </Tooltip>
          <Tooltip title="Ok we respect your decision :(">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.object.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  editContainer: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    paddingRight: '0',
  },
  editContent: {
    width: '20px',
    display: 'inline-block',
    textalign: 'center',
  },
}));

export default function EnhancedTable() {
  const history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    getCart().then(result => {
      if (result.data) {
        setRows(result.data.items);
      }
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const itemId = row.itemId;
    const selectedIndex = selected
      .map(e => {
        return e.itemId;
      })
      .indexOf(itemId);
    let newSelected = [];

    // If not checked, add into the array
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const addEditHandler = (itemId, quantity) => {
    if (quantity <= 100) {
      let newQuantity = quantity + 1;
      editCart(itemId, newQuantity).then(result => {
        if (result.success) {
          history.go(0);
        } else {
          console.log('Something went Wrong');
        }
      });
    } else {
      console.log('Limit Exceed!');
    }
  };

  const minusEditHandler = (itemId, quantity) => {
    if (quantity > 0) {
      let newQuantity = quantity - 1;
      editCart(itemId, newQuantity).then(result => {
        if (result.success) {
          history.go(0);
        } else {
          console.log('Something went Wrong');
        }
      });
    } else {
      console.log('Quantity cannot lower than 0');
    }
  };

  const isSelected = itemId => selected.filter(select => itemId === select.itemId);
  let emptyRows;
  if (rows) {
    emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  }

  return (
    <div className={classes.root}>
      <Container>
        {rows && rows.length > 0 ? (
          <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} choosedItem={selected} />
            <TableContainer>
              <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.itemId).length > 0;
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{'aria-labelledby': labelId}}
                              onClick={event => handleClick(event, row)}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">RM {row.price}</TableCell>
                          <TableCell align="right" className={classes.editContainer}>
                            <IconButton onClick={() => addEditHandler(row.itemId, row.quantity)}>
                              <AddIcon />
                            </IconButton>
                            <Typography className={classes.editContent}>{row.quantity}</Typography>
                            <IconButton onClick={() => minusEditHandler(row.itemId, row.quantity)}>
                              <RemoveIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="right">RM {row.subtotal}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{height: 53 * emptyRows}}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[8, 16, 24]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        ) : (
          <Box justifyContent="center" width="100%">
            <Typography>Your Cart is Empty!</Typography>
          </Box>
        )}
      </Container>
    </div>
  );
}
