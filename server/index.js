const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const connectDB = require('./config/db')
const userRoute = require('./src/route/userRoute')
dotenv.config()
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/api',userRoute);
const PORT=process.env.PORT||8080;
connectDB();
app.listen(PORT,()=>{console.log('server started on port 8080')})