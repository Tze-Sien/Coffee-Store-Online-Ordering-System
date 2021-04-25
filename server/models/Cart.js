const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: {
    type: String,
  },
  items: [
    {
      itemId: {type: String},
      name: String,
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity item should be 1 or more'],
        default: 1,
      },
      price: Number,
      subtotal: Number,
    },
  ],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('Cart', CartSchema, 'cartitems');
