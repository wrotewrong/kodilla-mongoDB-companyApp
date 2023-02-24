const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if any of the arguments is missing', () => {
    const cases = [
      { firstName: 'Andrzej', lastName: 'Popiołek' },
      { firstName: 'Andrzej', department: 'IT' },
      { lastName: 'Popiołek', department: 'IT' },
    ];

    for (let item of cases) {
      const emp = new Employee(item);

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if any of the arguments is not a string', () => {
    const cases = [
      { firstName: [], lastName: 'Popiołek', department: 'IT' },
      { firstName: 'Andrzej', lastName: [], department: 'IT' },
      { firstName: 'Andrzej', lastName: 'Popiołek', department: [] },
      { firstName: {}, lastName: 'Popiołek', department: 'IT' },
      { firstName: 'Andrzej', lastName: {}, department: 'IT' },
      { firstName: 'Andrzej', lastName: 'Popiołek', department: {} },
    ];

    for (let item of cases) {
      const emp = new Employee(item);

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should not throw an error if all the arguments are written properly', () => {
    const cases = [
      { firstName: 'Andrzej', lastName: 'Popiołek', department: 'IT' },
      { firstName: 'John', lastName: 'Doe', department: 'Marketing' },
    ];

    for (let item of cases) {
      const emp = new Employee(item);

      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});

// after(() => {
//   mongoose.models = {};
// });
