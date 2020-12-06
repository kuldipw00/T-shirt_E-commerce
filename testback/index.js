const express=require('express')

const app=express()

const port=8000;
app.get('/',(req,res)=>res.send('Hello Test back'));

app.listen(port,()=>console.log('server listening on port 8000'))