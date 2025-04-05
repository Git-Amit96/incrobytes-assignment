const express = require("express");
const { isSignIn } = require("../Utils/isSignIn.js");
const { getCategory, getSubCategory, getProducts } = require("../Controller/Product.js");


const items = express.Router();

items.get("/category", isSignIn, getCategory);
items.get("/sub-category/:category", isSignIn, getSubCategory);
items.get("/products/:subCategory", isSignIn, getProducts);

module.exports = items;