const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const errors = validationResult(req);
  const { firstName, lastName, email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const existingEmail = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });

    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exits" });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      res.json({message: "You have been registered successfully"})
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      } else  {
        return res.json({ message: "You have been login successfully" });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  register,
  login,
};
