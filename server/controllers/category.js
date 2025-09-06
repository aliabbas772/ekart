import Category from "../models/category.js";


const getAllCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        console.log(categories)
        res.status(200).json({
            success: true,
            categories,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve categories",
            error: error.message,
        });
    }
}

export { getAllCategories };  // Export the function to be used in other files