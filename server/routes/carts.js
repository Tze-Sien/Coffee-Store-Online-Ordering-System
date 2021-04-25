const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const Item = require('../models/Item');

//VIEW CART
router.get('/', auth, async (req, res) => {
  try {
    const user = req.user;
    let cart = await Cart.findOne({userId: user.id});
    if (!cart) {
      res.status(200).json({empty: true, msg: 'Your cart is empty!'});
    } else {
      res.status(200).json(cart);
    }
  } catch (e) {
    return res.status(400).json(e);
  }
});

//ADD TO CART
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const {itemId, quantity} = req.body;
    const item = await Item.findOne({_id: itemId});
    const cart = await Cart.findOne({userId});

    //IF CART IS EMPTY
    if (cart === null) {
      const newCart = await Cart.create({
        userId,
        items: [{itemId, name: item.name, quantity, price: item.price, subtotal: item.price * quantity}],
        total: item.price * quantity,
      });
      return res.json({msg: 'Item added to cart successfully', newCart});
    }

    if (cart) {
      const foundItem = cart.items.find(item => item.itemId === itemId);
      if (foundItem) {
        //if youre adding an item already existing in your cart.
        foundItem.quantity += quantity;
        foundItem.subtotal += quantity * foundItem.price;

        cart.items.map(item => (item.itemId === itemId ? foundItem : item));

        let total = 0;

        for (singleItem of cart.items) {
          total += parseInt(singleItem.quantity) * parseInt(singleItem.price);
        }
        cart.total = total;
      } else {
        cart.items.push({
          itemId,
          name: item.name,
          quantity,
          price: item.price,
          subtotal: item.price * quantity,
        });
        cart.total += item.price * quantity;
      }
      await cart.save();
      return res.json({success: true, msg: 'Added to cart successfully', cart: cart.items, total: cart.total});
    }
  } catch (e) {
    return res.status(400).json(e);
  }
});

// Delete Cart
router.delete('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({userId});
    let toDelete = req.body.data.map(item => {
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

    return res.status(200).json({
      msg: 'Cart Deleted Successfully',
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
});

// Update Cart
router.put('/', auth, async (req, res) => {
  try {
    const {itemId, quantity} = req.body;

    const userId = req.user.id;
    const cart = await Cart.findOne({userId});

    // Find the itemId which matched
    const foundItem = cart.items.find(item => item.itemId === itemId);

    // Update the quantity
    foundItem.quantity = quantity;

    // Update the subtotal
    foundItem.subtotal = parseInt(quantity) * parseInt(foundItem.price);

    // Map back to the item
    cart.items.map(item => (item.itemId === itemId ? foundItem : item));

    let total = 0;
    for (item of cart.items) {
      total += item.subtotal;
    }
    cart.total = total;

    cart.save();
    return res.status(200).json({
      msg: `${foundItem.name} has been updated successfully!`,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
