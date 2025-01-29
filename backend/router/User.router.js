const express = require("express");
const router = express.Router();
const { getUser,addUser,Login, getAllUsers, deleteUser, getUsersAndSellers } = require('../controller/User.controller');
const  {authenticateToken}= require("../utilities");

router.get("/",authenticateToken,getUser);
router.post("/createAccount", addUser);
router.post("/login",Login)
router.get("/all", authenticateToken, getAllUsers);
router.delete("/:id", authenticateToken, deleteUser);
router.get("/usersAndSellers", authenticateToken, getUsersAndSellers);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);
// router.post("/login", login);
// router.post("/register", register);
// router.get("/getUser", verifyToken, currentUser);
module.exports = router;