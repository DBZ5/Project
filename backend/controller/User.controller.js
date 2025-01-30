const { User, Products } = require('../models/index');
const bcrypt = require("bcrypt");
const e = require('express');
const jwt = require("jsonwebtoken");

module.exports = {
    addUser: async (req, res) => {
        const { fullName, email, password } = req.body;
        console.log(req.body);
        // Validate input fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        // Check if user already exists
        const isUser = await User.findOne({ where: { email } });
        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            fullName,
            email,
            password: hashPassword
        });

        // Generate JWT token
        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "72h" }
        );

        return res.status(201).json({
            error: false,
            user: {
                fullName: user.fullName,
                email: user.email
            },
            accessToken,
            message: "Registration successful"
        });
    },

    Login: async (req, res) => {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '72h' }
        );

        return res.json({
            error: false,
            message: "Login successful",
            user: { fullName: user.fullName, email: user.email },
            accessToken,
        });
    },

    getUser: async (req, res) => {
        const { userId } = req.user;

        // Find user by ID
        const isUser = await User.findOne({ where: { id: userId } });
        if (!isUser) {
            return res.sendStatus(401);
        }

        return res.json({
            user: isUser,
            message: "",
        });
    },

    googleSignup: async (req, res) => {
        try {
            const { email, fullName, role = 'user' } = req.body;

            // Check if user already exists
            let user = await User.findOne({ where: { email } });

            if (user) {
                // If user exists, treat it as a login
                const accessToken = jwt.sign(
                    { userId: user.id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "72h" }
                );

                return res.status(200).json({
                    error: false,
                    message: "Login successful",
                    user: {
                        id: user.id,
                        email: user.email,
                        fullName: user.fullName,
                        role: user.role
                    },
                    accessToken
                });
            }

            // If user doesn't exist, create new user
            user = await User.create({
                email,
                fullName,
                isGoogleUser: true,
                password: '',
                role
            });

            const accessToken = jwt.sign(
                { userId: user.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "72h" }
            );

            res.status(201).json({
                error: false,
                message: "Google signup successful",
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role
                },
                accessToken
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: true, message: 'Server error' });
        }
    },
    LoginwithGoogle: async (req, res) => {
        const { email} = req.body;

        if (!email) {
            return res.status(400).json({ error: true, message: 'Email is required' });
        }

        try {
            const user = await User.findOne({ where: { email } });
  console.log(user , "user");
  
            if (!user) {
                return res.status(400).json({ error: true, message: 'User not found' });
            }
 const accessToken = jwt.sign(
                { userId: user.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '72h' }
            );

            return res.json({
                error: false,
                message: "Login successful",
                user: { fullName: user.fullName, email: user.email, role: user.role },
                accessToken,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: true, message: 'Server error' });
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.destroy({ where: { id } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(204).send(); 
        } catch (error) {
            return res.status(500).json({ message: "Error deleting user" });
        }
    },
    getUsersAndSellers: async (req, res) => {
        try {
            const users = await User.findAll();
            const sellers = await User.findAll({
                where: { role: 'seller' },
                include: [{ model: Products, as: 'Products' }]
            });

            return res.json({ users, sellers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching users and sellers" });
        }
    }
};