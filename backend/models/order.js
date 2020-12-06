const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema

const ProductCartSchema=new mongoose.Schema({
    products:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number
})

const ProdCart=mongoose.model("ProductCart",ProductCartSchema)
const orderSchema=new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:{type:String,required:true},
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

const order=mongoose.model("Order",orderSchema)

module.exports={
    order,ProdCart
}