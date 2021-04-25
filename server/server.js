const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const PORT = 4000;

//Connect to the Database "ecommerce" in Robo3T
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Check if we are connected zto the Database
mongoose.connection.once('open', () => console.log('We are connected to the database'));

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

//Define the routes
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));
app.use('/carts', require('./routes/carts'));
app.use('/orders', require('./routes/orders'));
app.use('/category', require('./routes/category'));

app.listen(PORT, () => console.log(`App is listening in port ${PORT}`));
