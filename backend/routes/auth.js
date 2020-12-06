var express=require('express')
var router=express.Router()
const { body, validationResult } = require('express-validator');
const {signin,signup,signout}=require("../controllers/authController")

router.get("/signout",signout)
router.post("/signup", [
    // username must be an email
    body('email','Email should be correct').isEmail(),
    // password must be at least 5 chars long
    body('name','Name shold at least 3 char').isLength({ min: 3 })
  ],signup)

  router.post("/signin", [
    // username must be an email
    body('email','Email should be correct').isEmail(),
    // password must be at least 5 chars long
  ],signin)

module.exports = router