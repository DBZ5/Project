const express = require("express");
const router = express.Router();
const { getUser,addUser,Login,googleSignup,LoginwithGoogle } = require('../controller/User.controller');
const  {authenticateToken}= require("../utilities");

router.get("/",authenticateToken,getUser);
router.post("/createAccount", addUser);
router.post("/login",Login)
router.post("/googleSignup",googleSignup)
router.post("/loginWithGoogle",LoginwithGoogle)

// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);
// router.post("/login", login);
// router.post("/register", register);
// router.get("/getUser", verifyToken, currentUser);

module.exports = router;