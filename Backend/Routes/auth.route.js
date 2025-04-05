const express = require("express");
const { signUp, signIn, logout } = require("../Controller/Authentication.js");
const { verify } = require("../Utils/isSignIn.js");

const auth = express.Router();

auth.post("/signUp", signUp);
auth.get("/verify", verify);
auth.post("/signIn", signIn);
auth.post("/logout", logout);

module.exports = auth;