

const bcrypt = require("bcrypt")
const UserModal = require("../models/user");

// signup functionality
const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await UserModal.findOne({ email }); // here we check the email user enter is already exist or not if yes then user can directly login
      // here the logic, if user exist then user can login
      if (user) {
        return res
          .status(409)
          .json({
            message: "user is already exist, you can login",
            success: false,
          });
      }

        const userModal = new UserModal({ name, email, password }); // logic => if new user comes then we create a user
        userModal.password = await bcrypt.hash(password, 10) // use bcrypt to make password in the hash form
        await userModal.save() // save the user details in the database
        res.status(201).json({message: "Signup Successfully", success: true})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", success: false})
    }
}

module.exports = {signup}