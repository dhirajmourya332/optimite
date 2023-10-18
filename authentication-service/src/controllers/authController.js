const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  validateEmail,
  validateUsername,
  validatePassword,
} = require("../utils/FormValidator");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validate form data
    if (
      !username ||
      !validateUsername(username) ||
      !email ||
      !validateEmail(email) ||
      !password ||
      !validatePassword(password)
    ) {
      return res.status(400).json({ error: "Invalid form data" });
    }

    // check if username or email already exists
    const duplicateUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (duplicateUser) {
      // respond with 409 conflicting status code
      return res.status(409).json({ error: "User already exists" });
    }

    // create hash of the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new User and save to the database
    const user = new User({ username, password: hashedPassword, email: email });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        er: new Error(error).toString(),
      });
  }
};

// user login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      // respond with 401 unauthorized if user not found
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // check if the password is valid
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      // respond with 401 unauthorized if password is invalid
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // store the JWT in the authorization header
    res.set("authorization", `Bearer ${token}`);
    res.json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login };
