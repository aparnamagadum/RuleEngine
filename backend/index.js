import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import router from "./routes/ruleRoute.js";
const port=process.env.PORT
const app=express();
const uri=process.env.uri
app.use(express.json());
app.use(express.urlencoded({extended:true}))
mongoose.connect(uri)
        .then(()=>app.listen(port,()=>console.log(`server running on port ${port}`)))
        .catch((err)=>console.log(err))
app.use("/api",router)