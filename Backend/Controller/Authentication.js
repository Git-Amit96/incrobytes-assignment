const bcrypt = require("bcrypt");
const { User } = require("../Model/DB.model.js");
const isValid = require("../Utils/Validate.js");
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SIGN;

// ------------------ SIGN UP ------------------
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are mandatory." });
        }

        const isPerfect = isValid({ email, password });
        if (!isPerfect) {
            return res.status(400).json({ success: false, message: "Password or Email is not strong or valid." });
        }

        const isPresent = await User.findOne({ email: email });
        if (isPresent) {
            return res.status(400).json({ success: false, message: "User already registered. Please Sign In.", data: isPresent });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully. Please Sign In.",
        });

    } catch (err) {
        console.error("Signup Error:", err.message);
        return res.status(500).json({ success: false, message: "Signup Failed. Please Try Again." });
    }
};

// ------------------ SIGN IN ------------------
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are mandatory." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found. Please Sign Up." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid password." });
        }

        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "7d" });

        res.cookie("Token", token, {
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (err) {
        console.error("Signin Error:", err.message);
        return res.status(500).json({ success: false, message: "Login Failed. Please Try Again." });
    }
};

// ------------------ LOGOUT ------------------
const logout = (_, res) => {
    res.cookie("Token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    return res.status(200).json({ success: true, message: "Logout successful." });
};


module.exports = { signUp, signIn, logout };
