const { validationResult } = require("express-validator");
const Employee = require("../models/Employee");

const AddEmployee = async (req, res) => {
  const errors = validationResult(req);
  const { name, phone, email, type } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const newEmployee = new Employee({
      name,
      phone,
      email,
      type,
    });
    await newEmployee.save();
    res.json({ message: "Employee has been registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const GetEmployees = async (_req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
    res.json({ message: "Employee has been registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  AddEmployee,
  GetEmployees,
};
