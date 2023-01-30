const express = require('express');
const router = express.Router();
// const ObjectId = require('mongodb').ObjectId;
// const Employee = require('../models/employee.model');
const EmployeeController = require('../controllers/employees.controller');

// ------- Express way: -------
// router.get('/employees', (req, res) => {
//   res.json(db.employees);
// });

// ------- MongoDB way: -------
// router.get('/employees', (req, res) => {
//   req.db
//     .collection('employees')
//     .find()
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data);
//     });
// });

// ------- Mongoose way: -------
// router.get('/employees', async (req, res) => {
//   try {
//     res.json(await Employee.find().populate('department'));
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// ------- Mongoose + controller/routes files way: -------
router.get('/employees', EmployeeController.getAll);

// ------- Express way: -------
// router.get('/employees/random', (req, res) => {
//   res.json(db.employees[Math.floor(Math.random() * db.length)]);
// });

// ------- MongoDB way: -------
// router.get('/employees/random', (req, res) => {
//   req.db
//     .collection('employees')
//     .aggregate([{ $sample: { size: 1 } }])
//     .toArray((err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json(data[0]);
//     });
// });

// ------- Mongoose way: -------
// router.get('/employees/random', async (req, res) => {
//   try {
//     const count = await Employee.countDocuments();
//     const rand = Math.floor(Math.random() * count);
//     const emp = await Employee.findOne().populate('department').skip(rand);
//     if (!emp) res.status(404).json({ message: 'Not found' });
//     else res.json(emp);
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// ------- Mongoose + controller/routes files way: -------
router.get('/employees/random', EmployeeController.getRandom);

// ------- Express way: -------
// router.get('/employees/:id', (req, res) => {
//   res.json(db.employees.find((item) => item.id == req.params.id));
// });

// ------- MongoDB way: -------
// router.get('/employees/:id', (req, res) => {
//   req.db
//     .collection('employees')
//     .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
//       if (err) res.status(500).json({ message: err });
//       else if (!data) res.status(404).json({ message: 'Not found' });
//       else res.json(data);
//     });
// });

// ------- Mongoose way: -------
// router.get('/employees/:id', async (req, res) => {
//   try {
//     const emp = await Employee.findById(req.params.id).populate('department');
//     if (!emp) res.status(404).json({ message: 'Not found' });
//     else res.json(emp);
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// ------- Mongoose + controller/routes files way: -------
router.get('/employees/:id', EmployeeController.getById);

// ------- Express way: -------
// router.post('/employees', (req, res) => {
//   const { firstName, lastName } = req.body;
//   db.employees.push({ id: 3, firstName, lastName });
//   res.json({ message: 'OK' });
// });

// ------- MongoDB way: -------
// router.post('/employees', (req, res) => {
//   const { firstName, lastName, department } = req.body;
//   req.db
//     .collection('employees')
//     .insertOne(
//       { firstName: firstName, lastName: lastName, department: department },
//       (err) => {
//         if (err) res.status(500).json({ message: err });
//         else res.json({ message: 'OK' });
//       }
//     );
// });

// ------- Mongoose way: -------
// router.post('/employees', async (req, res) => {
//   try {
//     const { firstName, lastName, department } = req.body;
//     const newEmployee = new Employee({
//       firstName: firstName,
//       lastName: lastName,
//       department: department,
//     });
//     await newEmployee.save();
//     res.json({ message: 'OK' });
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// ------- Mongoose + controller/routes files way: -------
router.post('/employees', EmployeeController.add);

// ------- Express way: -------
// router.put('/employees/:id', (req, res) => {
//   const { firstName, lastName } = req.body;
//   db = db.employees.map((item) =>
//     item.id == req.params.id ? { ...item, firstName, lastName } : item
//   );
//   res.json({ message: 'OK' });
// });

// ------- MongoDB way: -------
// router.put('/employees/:id', (req, res) => {
//   req.db
//     .collection('employees')
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
// router.put('/employees/:id', async (req, res) => {
//   try {
//     const { firstName, lastName, department } = req.body;
//     const emp = await Employee.findById(req.params.id);
//     if (emp) {
//       emp.firstName = firstName;
//       emp.lastName = lastName;
//       emp.department = department;
//       await emp.save();
//       res.json({ message: 'OK' });
//     } else res.status(404).json({ message: 'Not found...' });
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// ------- Mongoose + controller/routes files way: -------
router.put('/employees/:id', EmployeeController.edit);

// ------- Express way: -------
// router.delete('/employees/:id', (req, res) => {
//   db = db.employees.filter((item) => item.id != req.params.id);
//   res.json({ message: 'OK' });
// });

// ------- MongoDB way: -------
// router.delete('/employees/:id', (req, res) => {
//   req.db
//     .collection('employees')
//     .deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
//       if (err) res.status(500).json({ message: err });
//       else res.json({ message: 'OK' });
//     });
// });

// ------- Mongoose way: -------
// router.delete('/employees/:id', async (req, res) => {
//   try {
//     const emp = await Employee.findById(req.params.id);
//     if (emp) {
//       await Employee.deleteOne({ _id: req.params.id });
//       res.json({ message: 'OK' });
//     } else res.status(404).json({ message: 'Not found...' });
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// ------- Mongoose + controller/routes files way: -------
router.delete('/employees/:id', EmployeeController.remove);

module.exports = router;
