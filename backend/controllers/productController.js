const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");


// create Product --Admin
exports.createProduct = catchAsyncErrors(async(req,res,next) =>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    })
});


// get all products
exports.getAllProducts = catchAsyncErrors( async(req,res) =>{

    const product = await Product.find();
    res.status(200).json({
        success: true,
        product,
    })
});

// get single product using id
exports.getProductDetails = catchAsyncErrors(async(req,res,next) =>{
    const _id = req.params.id;
    const product = await Product.findById(_id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
}
res.status(201).json({
    success: true,
    product,
})
});

//update product --Admin

exports.updateProduct = catchAsyncErrors( async(req,res,next) =>{
    const _id = req.params.id;
    // find the product to update by its id from the params
    let product = await Product.findById(_id);
    // if product is not found
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    product = await Product.findByIdAndUpdate(_id,req.body,
        {new:true,
        runValidators:true,
        useFindAndModify:false});
    res.status(200).json({
        success: true,
        product
    })    
});


// delete product --Admin

exports.deleteProduct = catchAsyncErrors(async(req,res,next) =>{
    
    let product = await Product.findById(_id);

    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    product = await Product.findByIdAndDelete(_id,req.body);
    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
});