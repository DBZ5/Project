const express = require("express");
const router = express.Router();
const { getUser,addUser,Login,googleSignup,LoginwithGoogle,deleteUser,getUsersAndSellers, getUsersStatus, updateUser, verifyResetToken, updatePassword, forgotPassword } = require('../controller/User.controller');
const  {authenticateToken}= require("../utilities");
const User = require('../models/User.model');

router.get("/", authenticateToken, getUser);
router.post("/createAccount", addUser);
router.post("/login",Login)
router.post("/googleSignup",googleSignup)
router.post("/loginWithGoogle",LoginwithGoogle)
router.delete("/:id", deleteUser);
router.get("/usersAndSellers", getUsersAndSellers);
router.get("/statuses", getUsersStatus);
router.put("/:id", authenticateToken, updateUser);
router.post("/forgot-password", forgotPassword);
router.get("/verify-reset-token",verifyResetToken);
router.put('/update-password', updatePassword);

module.exports = router;