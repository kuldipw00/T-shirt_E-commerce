const express=require('express')
const { route } = require('./auth')

const router=express.Router()
const { getUserById,getUser,updateUser,PurchaseList }=require('../controllers/userController')
const { isSignin, isAuthenticated }=require('../controllers/authController')

router.param("userID",getUserById)

router.get('/user/:userID',isSignin,isAuthenticated,getUser)
router.put('/user/:userID',isSignin,isAuthenticated,updateUser)
router.put('orders/user/:userID',isSignin,isAuthenticated,PurchaseList)


module.exports=router