const User=require('../models/user')
const Order=require('../models/order')

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                "ERROR":"No Record found"
            })
        }

        req.profile=user
        console.log('request is coming in router.param')
        next()
    })
}

exports.getUser=(req,res)=>{
    req.profile.salt=undefined
    req.profile.encrypt_password=undefined
    req.profile.createdAt=undefined
    req.profile.updatedAt=undefined
    return res.json(req.profile)
}

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate({_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"U are not authorized"
                })
            }

            return res.json(user)

    })
}

exports.PurchaseList=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return req.status(400).json({
                error:"no order for this user"
            })
        }
        return res.json(order)
    })

}

exports.pushOrdersInPurchaseList=(req,res,next)=>{
    let purchase=[]
    req.body.order.products.forEach(product => {
        purchase.push({
            _id:product._id,
            name:product.name,
            category:product.category,
            qty:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id

        })
    });

    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:purchase}},
        {new:true},
        (err,purchases)=>{
            if(err){
                return res.json({
                    error:"Unable to save purchases"
                })
            }
            next()

        }
        )
    

}

