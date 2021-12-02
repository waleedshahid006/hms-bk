const mongoose = require("mongoose");

const opts = { toJSON: { virtuals: true } };

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, opts);

module.exports = Employee = mongoose.model("employee", EmployeeSchema);
