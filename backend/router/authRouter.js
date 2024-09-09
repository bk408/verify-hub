const { signup } = require("../controllers/authController");
const { signUpValidation } = require("../middlewares/authValidation");

const router = require("express").Router()


router.post("/login", (req, res) => {
    res.send("login success...")
})

router.post("/signup", signUpValidation, signup) // when validation is successful then only user will route to sign up page


module.exports = router;