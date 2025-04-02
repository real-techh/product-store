import Product from "../models/product.model.js";

export const createProducts = async (req, res) => {
    const product = req.body; //user ll send this data
    
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields"
        })
    } else {
        const newProduct = new Product(product);
        try {
            await newProduct.save();
            res.status(201).json({
                success: true,
                data: newProduct,
            })
        } catch (error) {
            console.error("Error in create products:", error.message);
            error.status(500).json({
                success: false,
                message: "Server Error"
            });
        }
    }

};
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            success: true,
            data: products
        })
        
    } catch (error) {
        console.error("error in fetching products", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
            
        })
    }

};
export const updateProducts = async (req, res) => {
    const { id } = req.params;
    const product = req.body; // user input what need to be updated

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Invalid Product Id"
    //     });
    // }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({
            success: true,
            data: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Failed to update:Server Error"
        })
    }

};
export const deleteProducts = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "product is successfully deleted"
        })
    } catch (error) {
        console.log("error in deleting product:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }

};
// export const getProduct = async (req, res) => {
    

// };
