const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { AddEmployee, GetEmployees } = require("../controller/AdminController");

// Add Employee
router.post(
  "/add-employee",
  [
    check("name", "Name is required").not().isEmpty(),
    check("phone", "Phone is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
  ],
  (req, res) => AddEmployee(req, res)
);

// Get Employees
router.post("/get-all-employee", (req, res) => GetEmployees(req, res));

module.exports = router;
