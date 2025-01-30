const express = require("express");
const router = express.Router();
const { getUser,addUser,Login,googleSignup,LoginwithGoogle,deleteUser,getUsersAndSellers } = require('../controller/User.controller');
const  {authenticateToken}= require("../utilities");
const User = require('../models/User.model');

router.get("/", authenticateToken, getUser);
router.post("/createAccount", addUser);
router.post("/login",Login)
router.post("/googleSignup",googleSignup)
router.post("/loginWithGoogle",LoginwithGoogle)
router.delete("/:id", deleteUser);
router.get("/usersAndSellers", authenticateToken, getUsersAndSellers);
router.put("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.role = role; // Update the role
        await user.save();

        return res.status(200).json({ message: "User role updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error updating user role" });
    }
});

// router.put("/:id", updateUser);
// router.post("/login", login);
// router.post("/register", register);
// router.get("/getUser", verifyToken, currentUser);

module.exports = router;