const express = require('express');
const router = express.Router();
// const ObjectId = require('mongodb').ObjectId;
const Department = require('../models/department.model');

// ------- MongoDB way: -------
// router.get('/departments', (req, res) => {
//   req.db
//     .collection('departments')
//     .find()
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data);
//     });
// });

// ------- Mongoose way: -------
router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// ------- MongoDB way: -------
// router.get('/departments/random', (req, res) => {
//   req.db
//     .collection('departments')
//     .aggregate([{ $sample: { size: 1 } }])
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data[0]);
//     });
// });

// ------- Mongoose way: -------
router.get('/departments/random', async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// ------- MongoDB way: -------
// router.get('/departments/:id', (req, res) => {
//   req.db
//     .collection('departments')
//     .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else if (!data) res.status(404).json({ message: 'Not found' });
//       else res.json(data);
//     });
// });

// ------- Mongoose way: -------
router.get('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// ------- MongoDB way: -------
// router.post('/departments', (req, res) => {
//   const { name } = req.body;
//   req.db.collection('departments').insertOne({ name: name }, (err) => {
//     if (err) res.status(500).json({ message: err });
//     else res.json({ message: 'OK' });
//   });
// });

// ------- Mongoose way: -------
router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// ------- MongoDB way: -------
// router.put('/departments/:id', (req, res) => {
//   const { name } = req.body;
//   req.db
//     .collection('departments')
//     .updateOne(
//       { _id: ObjectId(req.params.id) },
//       { $set: { name: name } },
//       (err) => {
//         if (err) res.status(500).json({ message: err });
//         else res.json({ message: 'OK' });
//       }
//     );
// });

// ------- Mongoose way: -------
router.put('/departments/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const dep = await Department.findById(req.params.id);
    if (dep) {
      dep.name = name;
      await dep.save();
      res.json({ message: dep });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// ------- MongoDB way: -------
// router.delete('/departments/:id', (req, res) => {
//   req.db
//     .collection('departments')
//     .deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json({ message: 'OK' });
//     });
// });

// ------- Mongoose way: -------
router.delete('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json({ message: dep });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
