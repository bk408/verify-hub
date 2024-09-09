const bcrypt = require("bcrypt");
const UserModal = require("../models/user");

const jwt = require("jsonwebtoken");

// signup functionality
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModal.findOne({ email }); // here we check the email user enter is already exist or not if yes then user can directly login
    // here the logic, if user exist then user can login
    if (user) {
      return res.status(409).json({
        message: "user is already exist, you can login",
        success: false,
      });
    }

    const userModal = new UserModal({ name, email, password }); // logic => if new user comes then we create a user
    userModal.password = await bcrypt.hash(password, 10); // use bcrypt to make password in the hash form
    await userModal.save(); // save the user details in the database
    res.status(201).json({ message: "Signup Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// login functionality

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModal.findOne({ email });
    const errMsg = "Auth failed email or password is wrong";

    // if user does not exist then it throws an error message
    if (!user) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }

    // now we are decrypting the password and check

    const isPasswordEqual = await bcrypt.compare(password, user.password); // here 1st password is coming from user side or server side and second password is coming from database

    // now we will check if both password is equal or not, if both are not equal then
    if (!isPasswordEqual) {
      return res.status(403).json({
        message: errMsg,
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login Successfully", success: true, jwtToken, email, name:user.name });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { signup, login };
