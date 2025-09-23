const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const generateToken = ({ userId })=> {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: '1h'});
}

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const existingUser = await User.getUserByName(username);
        if(existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.createUser(username, hashedPassword);
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};


const login = async(req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.getUserByName(username);
        if(!user) return res.status(400).json({ message: "Invalid credential!!!" });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Wrong password" });
        const token = generateToken({userId: user.id});
        res.status(200).json({ message: "Login successful",
            token: token,
            user: {
                id: user.id,
                username: user.username
            }
 });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something wrong try again later" });
    }
}

module.exports = {
    register,
    login
}