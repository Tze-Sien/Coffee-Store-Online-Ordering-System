const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Category = require('../models/Category');

// View all Category
router.get('/', auth, async (req, res) => {
  try {
    let category = await Category.find({});

    return res.status(200).json({
      msg: 'Category Fetch Successfully',
      category,
    });
  } catch (err) {
    return res.status(400).json({
      err: 'Failed to Load Category',
    });
  }
});

// Creating a category
router.post('/', auth, async (req, res) => {
  try {
    const category = new Category();

    const name = req.body.name;
    if (!name) {
      return res.status(400).json({
        err: 'Name is required',
      });
    }

    // Prettify the letter
    let concatName = name[0].toUpperCase() + name.slice(1);

    // Check if the Category Existed
    const existed = await Category.findOne({name: concatName});
    if (existed) {
      return res.status(400).json({success: false, err: 'Category Exist'});
    }

    // Create the New Category and Save
    if (req.body.name) category.name = concatName;
    category.save();

    return res.status(200).json({
      msg: 'Category has been created',
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
});

// Deleting a Category
router.delete('/:id', auth, (req, res) => {
  if (!req.user.isAdmin)
    return res.status(401).json({
      err: 'You are unauthrized',
    });

  Category.findOneAndDelete({_id: req.params.id}, (err, item) => {
    if (err) return res.status(400).json({err});
    return res.json({
      msg: 'Category deleted successfully',
    });
  });
});

module.exports = router;
