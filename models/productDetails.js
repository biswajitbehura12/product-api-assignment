const mongoose = require('mongoose');

const productDetails = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images:[{
        type:String,default:""
    }],
    price:{type:Number,default:0},
    sellingPrice:{type:Number,default:0},
    sku:{type:String,required:true},
    category:{type:String,default:""},
    barcode:{type:String,default:""},
},{
    timestamps: true,
})

module.exports = mongoose.model('productDetailsAssingMent', productDetails);