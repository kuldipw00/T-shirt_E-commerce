const express=require('express')
const { isSignin, isAuthenticated,isAdmin } = require('../controllers/authController')
const { getCategoryById, getCategory, getAllCategory, creatCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { getUserById } = require('../controllers/userController')
const { route } = require('./auth')
const router=express.Router()

router.param('userID',getUserById)
router.param('catId',getCategoryById)


router.post('/category/create/:userId',
isSignin,
isAuthenticated,
isAdmin,
creatCategory
)

//Update
router.put("/category/:categoryId",
isSignin,
isAuthenticated,
isAdmin,
updateCategory
)

router.delete("/category/:categoryId:userId",
    isSignin,
    isAuthenticated,
    isAdmin,
    deleteCategory


)

//Read Routes
router.get('/category/:categoryId',getCategory)
router.get('category/all',getAllCategory)

module.exports=router