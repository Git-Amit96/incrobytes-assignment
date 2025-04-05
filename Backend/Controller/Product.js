const { Product, Subcategory, Category } = require("../Model/DB.model.js");


const getCategory = async (_, res) => {
    try {
        const categories = await Category.find({});

        return res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve categories"
        });
    }
};


const getSubCategory = async (req, res) => {
    try {
        const { category } = req.params;

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required in the URL"
            });
        }

        const subcategories = await Subcategory.find({ category });
        return res.status(200).json({
            success: true,
            count: subcategories.length,
            data: subcategories
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve subcategories"
        });
    }
};


const getProducts = async (req, res) => {
    try {
        const { subCategory } = req.params;

        if (!subCategory) {
            return res.status(400).json({
                success: false,
                message: "Subcategory ID is required in the URL"
            });
        }

        const products = await Product.find({ subcategory: subCategory }).populate("subcategory", "name");

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve products"
        });
    }
};


module.exports = { getCategory, getProducts, getSubCategory };