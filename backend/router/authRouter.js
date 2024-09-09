const { signup, login } = require("../controllers/authController");
const { signUpValidation, logInValidation } = require("../middlewares/authValidation");

const router = require("express").Router()


router.post("/login", logInValidation, login)

router.post("/signup", signUpValidation, signup) // when validation is successful then only user will route to sign up page


module.exports = router;