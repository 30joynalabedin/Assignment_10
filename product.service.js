const express = require('express');
const router = express.Router();
const Product = require('./product.model');

// GET /Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}, 'name price');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /products
router.post('/', async (req, res) => {
  const product = new Product({
    name:req.body.name,
    price:req.body.price,
    description:req.body.description,
    createdAt:new Date(),
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = router;
