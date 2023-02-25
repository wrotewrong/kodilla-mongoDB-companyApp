const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Marketing',
      });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with findOne method', async () => {
      const employee = await Employee.findOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      const expectedParams = {
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      };

      for (let key in expectedParams) {
        expect(employee[key]).to.be.equal(expectedParams[key]);
      }
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Marketing',
      });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        {
          firstName: 'John',
          lastName: 'Doe',
          department: 'IT',
        },
        { $set: { firstName: 'Updated' } }
      );
      const updatedEmployee = await Employee.findOne({
        firstName: 'Updated',
        lastName: 'Doe',
        department: 'IT',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Marketing',
      });
      employee.firstName = 'Updated';
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: 'Updated',
        lastName: 'Smith',
        department: 'Marketing',
      });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { lastName: 'Updated' } });
      const employees = await Employee.find();
      expect(employees[0].lastName).to.be.equal('Updated');
      expect(employees[1].lastName).to.be.equal('Updated');
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
        firstName: 'Jane',
        lastName: 'Smith',
        department: 'Marketing',
      });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      const deletedEmployee = await Employee.findOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      expect(deletedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      await employee.remove();
      const removedEmployee = await Employee.findOne({
        firstName: 'John',
        lastName: 'Doe',
        department: 'IT',
      });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employee = await Employee.find();

      expect(employee.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Reffering', async () => {
    before(async () => {
      const testDepOne = new Department({
        name: 'Department #1',
      });
      await testDepOne.save();

      const testEmpOne = new Employee({
        firstName: 'John',
        lastName: 'Doe',
        department: testDepOne._id,
      });
      await testEmpOne.save();
    });

    it('should refere to the department collection', async () => {
      const populatedEmployee = await Employee.find().populate('department');
      expect(populatedEmployee[0].department.name).to.equal('Department #1');
    });

    after(async () => {
      await Employee.deleteMany();
      await Department.deleteMany();
    });
  });
});
