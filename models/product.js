import mongoose from "mongoose";
//define a schema -design/blueprint(object)
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'nameshould not be empty'],
        minlength:5
    },
    price:{
        type:Number,
        required:true,
        min:[1,'price should be minimum 1']
    }
},{timestamps:true});
//create model-(fancy constructor Function)
const Product=mongoose.model('Product',productSchema);

export default Product;