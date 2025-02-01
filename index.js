const express= require("express")
const { connection } = require("./db")
const productRoute= require("./route/product.route")
const cors= require("cors")

require("dotenv").config()
const app= express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})
app.use("/products",productRoute)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err)
    }
    console.log(`server is running at port no: ${process.env.port}`);
})