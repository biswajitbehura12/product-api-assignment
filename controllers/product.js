
const productDetails =require("../models/productDetails");
const mongoose = require('mongoose');
const colors = require('colors');
const getProductsFilters = async (req, res) => {

    try {
      let  findQuery=  req.query;
let query;
if(!findQuery.search){
    query={
        $match:{}
    }
}else{
query={
    $match:{
        $or: [
            {
                name: { $regex: findQuery.search, $options: "i" },
            },
            {
                sku: {
                $regex: findQuery.search,
                $options: "i",
              },
            },
            {
                category: {
                $regex: findQuery.search,
                $options: "i",
              },
            },
            {
                barcode: {
                $regex: findQuery.search,
                $options: "i",
              },
            },
        ]
    }
                }
}
      
        const data=productDetails.aggregate([
            query
           , {
            $facet: {
              metadata: [
                { $count: "total" },
                {
                  $addFields: {
                    current_page: findQuery.page,
                    total_page: { $ceil: { $divide: ["$total", 10] } },
                  },
                },
              ],
              data: [{ $skip: (findQuery.page - 1) * 10 }, { $limit: 10 }],
            },
          },
        ]);
        res.json(data);

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}
const getProductsById = async (req, res) => {
    try {
        const data= await productDetails.findOne({
            _id:req.params.id
        })
        res.json(data);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}
const createProduct = async (req, res) => {
    try {
       const CreteObj= new  productDetails(req.body);
       await CreteObj.save();
       res.json(CreteObj);

    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const UpdateProductDetails = async (req, res) => {
    let Up=req.body;
    try {
       
    const data= await productDetails.findOneAndUpdate(Up.findQuery,Up.updateQuery,{new:true});
    res.json(data);

}
     catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    getProductsFilters,UpdateProductDetails,

    createProduct,getProductsById
} 