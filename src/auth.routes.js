const { Router } = require("express");
const UserAuthController = require('./user.controller')

const router = Router();

const {registerUser, loginUser} = new UserAuthController()

// User Auth
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

module.exports = router;
