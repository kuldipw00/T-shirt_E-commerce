const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    category:{
       type:ObjectId,
       ref:"Category",
       required:true 
    },
    stock:{
        type:Number
    },
    sole:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})

module.exports=mongoose.model("Product",productSchema)