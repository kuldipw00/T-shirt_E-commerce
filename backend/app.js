const express=require('express')
const mongoose=require('mongoose')
const app=express()
require('dotenv').config()
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')


const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const CatRoutes=require('./routes/category')

//DB COnnectinon
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(res=>{
    console.log("ERROR IN CONNECTING DB")
});

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api",authRoutes)
app.use("/api",userRoutes)

const port=process.env.PORT|8000

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
