const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productsRouter = require('./product.service');
const authenticate = require('./auth.middleware');

const app = express();
app.use(bodyParser.json());

app.use(authenticate)

// Connect to MongoDB
mongoose.connect('mongodb+srv://joy:ioOtLlBn0qoMgop5@cluster0.l5ljows.mongodb.net/products?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
    
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

  
app.use('/products',authenticate, productsRouter);

app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });