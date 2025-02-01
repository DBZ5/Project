const { User, Products } = require('../models/index');
const bcrypt = require("bcrypt");
const e = require('express');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const generateResetToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
};

const sendPasswordResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `Please click on the following link to reset your password: <a href="${resetUrl}">Reset Password</a>`
  };

  await transporter.sendMail(mailOptions);
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = generateResetToken(user);
    
    // Create reset password URL
    const resetUrl = `${process.env.FRONTEND_URL}/update-password?token=${resetToken}`;
    
    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Password reset link sent to email" });
    
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findByPk(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
};

module.exports = {
    addUser: async (req, res) => {
        try {
            const { fullName, email, password, role, image } = req.body;
            
            // If image is not provided, set it to null
            const userImage = image || null;

            if (!fullName || !email || !password) {
                return res.status(400).json({ 
                    error: true, 
                    message: "All fields are required" 
                });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ 
                    error: true, 
                    message: "Email already registered" 
                });
            }

            // Hash password
            const hashPassword = await bcrypt.hash(password, 10);

            // Create new user with role
            const user = await User.create({
                fullName,
                email: email.toLowerCase(),
                password: hashPassword,
                role: role || 'user',
                image: userImage
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
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt
                },
                accessToken
            });

        } catch (error) {
            console.error('Registration error:', error);
            
            // Handle Sequelize validation errors
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    error: true,
                    message: error.errors[0].message
                });
            }

            // Handle other errors
            return res.status(500).json({
                error: true,
                message: "Server error during registration"
            });
        }
    },

    Login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).json({ error: true, message: "User not found" });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: true, message: "Invalid password" });
            }

            // Debug logging
            console.log('Raw user data:', user.toJSON());
            console.log('CreatedAt value:', user.createdAt);

            const accessToken = jwt.sign(
                { userId: user.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "72h" }
            );

            const userData = {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            };

            // Debug logging
            console.log('Sending user data:', userData);

            return res.json({
                error: false,
                message: "Login successful",
                user: userData,
                accessToken,
            });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ error: true, message: "Server error" });
        }
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
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt
                },
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
            const users = await User.findAll({
                attributes: ['id', 'fullName', 'email', 'role',  'createdAt'],
                where: { role: 'admin' }
            });
            const sellers = await User.findAll({
                where: { role: 'seller' },
                include: [{ model: Products, as: 'Products' }],
                attributes: ['id', 'fullName', 'email', 'role',  'createdAt']
            });
            

            return res.json({ users, sellers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error fetching users and sellers" });
        }
    },
    getUsersStatus: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'fullName', 'isOnline']
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Error fetching user statuses", error });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { fullName, email, image } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: true, message: 'User not found' });
            }

            const updatedUser = await user.update({ fullName, email, image });
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Error updating user' });
        }
    },
    verifyResetToken: async (req, res) => {
        const { token } = req.query;
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            res.json({ valid: true, userId: decoded.userId });
        } catch (error) {
            res.status(400).json({ valid: false, message: "Invalid or expired token" });
        }
    },
    forgotPassword,
    updatePassword
};