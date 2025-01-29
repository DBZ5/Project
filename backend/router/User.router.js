const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { getUser, addUser, Login, getAllUsers, deleteUser, getUsersAndSellers } = require('../controller/User.controller');
const { authenticateToken } = require("../utilities");
=======
const { getUser,addUser,Login,googleSignup,LoginwithGoogle } = require('../controller/User.controller');
const  {authenticateToken}= require("../utilities");
>>>>>>> 201badb22eb9018d9567e3537f3bf1c45c1224d3

router.get("/", authenticateToken, getUser);
router.post("/createAccount", addUser);
<<<<<<< HEAD
router.post("/login", Login)
router.get("/all", authenticateToken, getAllUsers);
router.delete("/:id", authenticateToken, deleteUser);
router.get("/usersAndSellers", authenticateToken, getUsersAndSellers);
=======
router.post("/login",Login)
router.post("/googleSignup",googleSignup)
router.post("/loginWithGoogle",LoginwithGoogle)

>>>>>>> 201badb22eb9018d9567e3537f3bf1c45c1224d3
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);
// router.post("/login", login);
// router.post("/register", register);
// router.get("/getUser", verifyToken, currentUser);

module.exports = router;