const category=require('../models/category')


exports.getCategoryById=(req,res,next,id)=>{

    category.findById(id).exec((err,caty)=>{
        if(err){
            return res.json({
                error:"Category not found"
            })

        }
        req.category=caty
        next()

    })
   
}

exports.creatCategory=(req,res)=>{
    const caty=new category(req.body)
    caty.save((err,catgry)=>{
        if(err){
            return res.json({
                error:"Unable to save caty"
            })
        }
        return res.json({catgry})
    })
}

exports.getCategory=(req,res) => {
    return req.json(req.category)
}

exports.getAllCategory=(req,res)=>{
    category.find().exec((err,item)=>{
        if(err){
            return res.json({
                error:"Unable to fetch category"
            })
        }
        return res.json(item)

    })
}

exports.updateCategory=(req,res)=>{
    const category=req.category;
    category.name=req.body.name
    category.save((err,Updatedcategory)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to update category"
            })
        }
        return res.json(this.updateCategory)
    })
}

exports.deleteCategory=(req,res)=>{
    const category=req.category;
    category.remove((err,caty)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete category"
            })
        }
        return res.json({
            message:`${caty} deleted succesfully`
        })
    })
}