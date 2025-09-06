import Product from "../models/product.js";

const getProductsBycategoryId = async(req,res) => {
    const {categoryId} = req.params;

    try {

        const products = await Product.find({category:categoryId})
         
        if( !products || products.length === 0 ){
            return res.status(404).json({
                success: false,
                message: "No products found for this category",
            });
        }

        res.status(200).json({
            sucess: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to retrieve products.",
            error: error.message,
            
        })
    }
}

export {getProductsBycategoryId};

