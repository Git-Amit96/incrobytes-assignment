const jwt = require("jsonwebtoken");
const { User } = require("../Model/DB.model.js");
const jwtSecret = process.env.JWT_SIGN;


const isSignIn = async (req, res, next) => {
  try {

    const token = req.cookies.Token;

    if (!token) {
      throw new Error("Access Denied");
    }
    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found. Please Sign Up." });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

const verify = async (req, res) => {
  try {
    const token = req.cookies.Token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied. Token not found." });
    }


    const decoded = jwt.verify(token, jwtSecret);


    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found. Please Sign Up." });
    }


    res.status(200).json({ success: true, message: "Token Verified" });

  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { isSignIn, verify };