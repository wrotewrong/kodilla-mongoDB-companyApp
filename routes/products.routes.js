// post.routes.js

const express = require('express');
const router = express.Router();

const ObjectId = require('mongodb').ObjectId;

// router.get('/products', (req, res) => {
//   res.json(db.products);
// });

router.get('/products', (req, res) => {
  req.db
    .collection('products')
    .find()
    .toArray((err, data) => {
      if (err) res.status(500).json({ message: err });
      else res.json(data);
    });
});

// router.get('/products/random', (req, res) => {
//   res.json(db.products[Math.floor(Math.random() * db.length)]);
// });

router.get('/products/random', (req, res) => {
  req.db
    .collection('products')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray((err, data) => {
      if (err) res.status(500).json({ message: err });
      else res.json(data[0]);
    });
});

// router.get('/products/:id', (req, res) => {
//   res.json(db.products.find((item) => item.id == req.params.id));
// });

router.get('/products/:id', (req, res) => {
  req.db
    .collection('products')
    .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
      if (err) res.status(500).json({ message: err });
      else if (!data) res.status(404).json({ message: 'Not found' });
      else res.json(data);
    });
});

// router.post('/products', (req, res) => {
//   const { name, client } = req.body;
//   db.products.push({ id: 3, name, client });
//   res.json({ message: 'OK' });
// });

router.post('/products', (req, res) => {
  const { name, client } = req.body;
  req.db
    .collection('products')
    .insertOne({ name: name, client: client }, (err) => {
      if (err) res.status(500).json({ message: err });
      else res.json({ message: 'OK' });
    });
});

// router.put('/products/:id', (req, res) => {
//   const { name, client } = req.body;
//   db = db.products.map((item) =>
//     item.id == req.params.id ? { ...item, name, client } : item
//   );
//   res.json({ message: 'OK' });
// });

router.put('/products/:id', (req, res) => {
  req.db
    .collection('products')
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { ...req.body } },
      (err) => {
        if (err) res.status(500).json({ message: err });
        else res.json({ message: 'OK' });
      }
    );
});

// router.delete('/products/:id', (req, res) => {
//   db = db.products.filter((item) => item.id != req.params.id);
//   res.json({ message: 'OK' });
// });

router.delete('/products/:id', (req, res) => {
  req.db
    .collection('products')
    .deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
      if (err) res.status(500).json({ message: err });
      else res.json({ message: 'OK' });
    });
});

module.exports = router;
