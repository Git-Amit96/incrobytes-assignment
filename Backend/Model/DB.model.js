const mongoose= require("mongoose");

// *************************** User Schema *************************
const userSchema= new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    }
},
{
    timestamps: true,
});
const User = mongoose.model("User", userSchema);


// *************************** Category Schema *************************
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
    }
});
const Category = mongoose.model("Category", categorySchema);


// *************************** SubCategory Schema *************************
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: String
});
const Subcategory = mongoose.model("Subcategory", subcategorySchema);


// *************************** Product Schema *************************
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    
});
const Product = mongoose.model("Product", productSchema);

module.exports= {User, Product, Subcategory, Category};
