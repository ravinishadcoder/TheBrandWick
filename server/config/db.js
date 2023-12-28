const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config();

const connectDB=async()=>{
try{
     const conn=await mongoose.connect(process.env.MONGO,{
     useNewUrlParser: true, 
     useUnifiedTopology: true
})
console.log(`mongodb connected :{conn.connection.host}`)
}
catch(error){
console.log(error)
}
}


module.exports=connectDB;