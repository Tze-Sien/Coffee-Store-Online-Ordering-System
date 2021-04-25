const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

// Creating an order
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({userId});

    if (cart) {
      let order = await Order.create({
        userId,
        items: req.body.items,
        total: req.body.total,
      });

      let toDelete = req.body.items.map(item => {
        return item.itemId;
      });

      let newCart = cart.items.filter(item => toDelete.indexOf(item.itemId) == -1);
      let total = 0;
      for (item of newCart) {
        total += parseInt(item.quantity) * parseInt(item.price);
      }
      cart.total = total;
      cart.items = newCart;
      cart.save();

      return res.status(200).json({msg: 'Checkout created successfully', data: order});
    } else {
      return res.status(400).send('Your cart is empty');
    }
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
});

module.exports = router;
