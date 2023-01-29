// post.routes.js

const express = require('express');
const router = express.Router();
// const ObjectId = require('mongodb').ObjectId;
const Product = require('../models/product.model');

// ------- Express way: -------
// router.get('/products', (req, res) => {
//   res.json(db.products);
// });

// ------- MongoDB way: -------
// router.get('/products', (req, res) => {
//   req.db
//     .collection('products')
//     .find()
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data);
//     });
// });

// ------- Mongoose way: -------
router.get('/products', async (req, res) => {
  try {
    const prod = res.json(await Product.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// ------- Express way: -------
// router.get('/products/random', (req, res) => {
//   res.json(db.products[Math.floor(Math.random() * db.length)]);
// });

// ------- MongoDB way: -------
// router.get('/products/random', (req, res) => {
//   req.db
//     .collection('products')
//     .aggregate([{ $sample: { size: 1 } }])
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data[0]);
//     });
// });

// ------- Mongoose way: -------
router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const prod = await Product.findOne().skip(rand);
    if (!prod) res.status(404).json({ message: 'Not found' });
    else res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// ------- Express way: -------
// router.get('/products/:id', (req, res) => {
//   res.json(db.products.find((item) => item.id == req.params.id));
// });

// ------- MongoDB way: -------
// router.get('/products/:id', (req, res) => {
//   req.db
//     .collection('products')
//     .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else if (!data) res.status(404).json({ message: 'Not found' });
//       else res.json(data);
//     });
// });

// ------- Mongoose way: -------
router.get('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) res.status(404).json({ message: 'Not found' });
    else res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// ------- Express way: -------
// router.post('/products', (req, res) => {
//   const { name, client } = req.body;
//   db.products.push({ id: 3, name, client });
//   res.json({ message: 'OK' });
// });

// ------- MongoDB way: -------
// router.post('/products', (req, res) => {
//   const { name, client } = req.body;
//   req.db
//     .collection('products')
//     .insertOne({ name: name, client: client }, (err) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json({ message: 'OK' });
//     });
// });

// ------- Mongoose way: -------
router.post('/products', async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({
      name: name,
      client: client,
    });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// ------- Express way: -------
// router.put('/products/:id', (req, res) => {
//   const { name, client } = req.body;
//   db = db.products.map((item) =>
//     item.id == req.params.id ? { ...item, name, client } : item
//   );
//   res.json({ message: 'OK' });
// });

// ------- MongoDB way: -------
// router.put('/products/:id', (req, res) => {
//   req.db
//     .collection('products')
//     .updateOne(
//       { _id: ObjectId(req.params.id) },
//       { $set: { ...req.body } },
//       (err) => {
//         if (err) res.status(500).json({ message: err });
//         else res.json({ message: 'OK' });
//       }
//     );
// });

// ------- Mongoose way: -------
router.put('/products/:id', async (req, res) => {
  try {
    const { name, client } = req.body;
    const prod = await Product.findById(req.params.id);
    if (prod) {
      prod.name = name;
      prod.client = client;
      await prod.save();
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// ------- Express way: -------
// router.delete('/products/:id', (req, res) => {
//   db = db.products.filter((item) => item.id != req.params.id);
//   res.json({ message: 'OK' });
// });

// ------- MongoDB way: -------
// router.delete('/products/:id', (req, res) => {
//   req.db
//     .collection('products')
//     .deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json({ message: 'OK' });
//     });
// });

// ------- Mongoose way: -------
router.delete('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (prod) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
